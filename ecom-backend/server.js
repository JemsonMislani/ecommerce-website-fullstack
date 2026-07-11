const express = require('express')
const cors = require('cors')
const { Pool } = require('pg')
const crypto = require('crypto');
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})


// -FOR PRODUCTS-

// create product data
app.post('/createProducts', async(req, res) => {

    try {
        const { prod_img, prod_name, prod_price, prod_desc } = req.body
        const result = await pool.query('INSERT INTO products (prod_img, prod_name, prod_price, prod_desc) VALUES ($1, $2, $3, $4) RETURNING *', [ prod_img, prod_name, prod_price, prod_desc ])
        res.json(result.rows[0])
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
})

// get the product data
app.get('/getProductData', async(req, res) => {

    try {
        const result = await pool.query('SELECT * FROM products')
        res.json(result.rows)
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
})

// create product data variants
app.post('/createProductDataVariants', async(req, res) => {

    try {
        const { prod_id, prod_size, prod_color, prod_img_hover, prod_desc_threelines, shop_prod_img } = req.body
        const result = await pool.query('INSERT INTO product_variants (prod_id, prod_size, prod_color, prod_img_hover, prod_desc_threelines, shop_prod_img) VALUES ($1, $2, $3, $4, $5, $6 ) RETURNING *', [ prod_id, prod_size, prod_color, prod_img_hover, prod_desc_threelines, shop_prod_img ])
        res.json(result.rows[0])
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
})

// join products and products_variant 
app.get('/joinQuery', async(req, res) => {

    try {
        const result = await pool.query(`
            SELECT 
                p.id, 
                p.prod_name,
                p.prod_price,
                p.prod_img,
                pv.id AS variant_id,
                pv.prod_size,
                pv.prod_color,
                pv.prod_img_hover,
                prod_desc_threelines,
                pv.shop_prod_img
            FROM products p JOIN product_variants pv ON p.id = pv.prod_id`);
        res.json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
})

// FOR GUESTS

// create guest 
app.post('/guests', async(req, res) => {

    try {
        const guestToken = crypto.randomUUID();
        const result = await pool.query('INSERT INTO guests (guest_token) VALUES ($1) RETURNING id, guest_token', [ guestToken ])
        res.json(result.rows[0])
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
})

// insert products into carts
app.post('/addtoCart', async(req, res) => {

    try {
        const { guest_token, prod_id, variant_id, item_quantity } = req.body;

        if (!guest_token || !prod_id || !variant_id || !item_quantity) {
            return res.status(400).send('Missing required fields');
        }
        const guest = await pool.query('SELECT id FROM guests WHERE guest_token = $1', [ guest_token ])
        if (guest.rows.length === 0) {
            return res.status(404).send('Guest not found');
        }
        const guest_id = guest.rows[0].id;

        const existingItem = await pool.query(`
            SELECT * FROM carts
            WHERE guest_id = $1
            AND prod_id = $2
            AND variant_id = $3
            `, [ guest_id, prod_id, variant_id ]);

        if(existingItem.rows.length > 0){
            const updated = await pool.query(`
                UPDATE carts
                SET item_quantity = item_quantity + $1
                WHERE guest_id = $2
                AND prod_id = $3
                AND variant_id = $4
                RETURNING *
                `, [ item_quantity, guest_id, prod_id, variant_id ]);
        return res.json(updated.rows[0]);
        } else {
        const result = await pool.query('INSERT INTO carts (  guest_id, prod_id, variant_id, item_quantity ) VALUES ($1, $2, $3, $4) RETURNING *', [  guest_id, prod_id, variant_id, item_quantity  ])
        res.json(result.rows[0])
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
})

// get cart count 
app.get('/getCartCount/:guest_token', async(req, res) => {

    try {
        const { guest_token } = req.params;
        const guest = await pool.query('SELECT id FROM guests WHERE guest_token = $1 ', [ guest_token ])
        if(guest.rows.length === 0){
            return res.status(404).send('Guest not found')
        }

        const guest_id = guest.rows[0].id;
        const result = await pool.query('SELECT COALESCE(SUM(item_quantity), 0) AS total FROM carts WHERE guest_id = $1', [ guest_id ])

        res.json({cartTotal: Number(result.rows[0].total)})
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
})

// get added items in cart
app.get('/getAddedItemsInCart/:guest_token', async(req, res) => {

    try {
        const { guest_token } = req.params;
        const guest = await pool.query('SELECT id FROM guests WHERE guest_token = $1', [ guest_token ])
        if(guest.rows.length === 0){
            return res.status(404).send('Guest not found');
        }

        const guest_id = guest.rows[0].id;
        const result = await pool.query(`
            SELECT
                c.id AS cart_id,
                c.item_quantity,
                p.prod_img,
                p.prod_name,
                p.prod_price,
                pv.prod_size,
                pv.shop_prod_img,
                (p.prod_price * c.item_quantity) AS subtotal
            FROM carts c
            JOIN products p ON c.prod_id = p.id
            JOIN product_variants pv ON c.variant_id = pv.id
            WHERE c.guest_id = $1
            ORDER BY c.id ASC
            `, [ guest_id ])
            res.json(result.rows)
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
})

// update quantity of cart
app.patch('/cart/items/:cart_id', async(req, res) => {
    try {
        const { cart_id } = req.params;
        const { quantity } = req.body;

        if (quantity === 0) {
            const deleted = await pool.query(
                'DELETE FROM carts WHERE id = $1 RETURNING id',
                [cart_id]
            );
            if(deleted.rowCount === 0){
                return res.status(404).json({
                    message: 'Cart item not found'
                });
            }
            return res.json({
                removed: true,
                cart_id
            });
        }
        if(quantity === undefined || quantity === null || quantity < 0){
            return res.status(400).json({
                message: 'Invalid quantity'
            });
        }
        const result = await pool.query('UPDATE carts SET item_quantity = $1 WHERE id = $2', [ quantity, cart_id ]);

        if(result.rowCount === 0){
            return res.status(404).json({
                message: 'Cart item not found'
            });
        }
        const updatedItem = await pool.query(`
            SELECT
                c.id AS cart_id,
                c.item_quantity,
                p.prod_name,
                p.prod_price,
                pv.prod_size,
                pv.shop_prod_img,
                (p.prod_price * c.item_quantity) AS subtotal
            FROM carts c
            JOIN products p 
            ON c.prod_id = p.id
            JOIN product_variants pv
            ON c.variant_id = pv.id
            WHERE c.id = $1
        `,[cart_id]);

        res.json(updatedItem.rows[0]);
    } catch(error){
        console.log(error);
        res.status(500).send('Server Error');
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Jem your server is running on port ${PORT}`)
})