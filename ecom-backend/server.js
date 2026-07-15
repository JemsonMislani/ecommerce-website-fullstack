const express = require('express')
const cors = require('cors')
const { Pool } = require('pg')
const crypto = require('crypto');
const axios = require('axios')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const authMiddleware = require('./middleware/authMiddleware');

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

// create order
app.post('/createOrder/:guest_token', async(req, res) => {

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
                pv.id AS variant_id,
                pv.prod_size,
                pv.prod_color,
                pv.shop_prod_img,
                (p.prod_price * c.item_quantity) AS subtotal
            FROM carts c
            JOIN products p ON c.prod_id = p.id
            JOIN product_variants pv ON c.variant_id = pv.id
            WHERE c.guest_id = $1
            ORDER BY c.id ASC
            `, [ guest_id ])

            if (result.rows.length === 0) {
                return res.status(400).send('Cart is empty');
            }

            const {
                customer_name,
                customer_email,
                customer_phone,
                shipping_address,
                payment_method
            } = req.body;

            if( !customer_name || !customer_email || !shipping_address || !payment_method ){
                return res.status(400).send('Missing customer information');
            }

            const total_amount = result.rows.reduce(
                (total, item) => total + Number(item.subtotal),
                0
            );

            const order = await pool.query(`
                INSERT INTO orders
                (
                    guest_id,
                    customer_name,
                    customer_email,
                    customer_phone,
                    shipping_address,
                    total_amount
                )
                VALUES
                ($1,$2,$3,$4,$5,$6)
                RETURNING id
            `,
            [
                guest_id,
                customer_name,
                customer_email,
                customer_phone,
                shipping_address,
                total_amount
            ]);

            const order_id = order.rows[0].id;
            for (const item of result.rows) {
                await pool.query(`
                    INSERT INTO order_items
                    (
                        order_id,
                        variant_id,
                        prod_img,
                        prod_name,
                        prod_size,
                        prod_color,
                        prod_price,
                        item_quantity,
                        subtotal
                    )
                    VALUES
                    ($1,$2,$3,$4,$5,$6,$7,$8,$9)
                `,
                [
                    order_id,
                    item.variant_id,
                    item.prod_img,
                    item.prod_name,
                    item.prod_size,
                    item.prod_color,
                    item.prod_price,
                    item.item_quantity,
                    item.subtotal
                ]);
            }
            await pool.query('INSERT INTO payments (order_id, payment_method, amount) VALUES ($1,$2,$3)',[ order_id, payment_method, total_amount ]);
        res.status(200).json({
            success: true,
            message: 'Order created successfully',
            order_id
        })
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
})

// create shopify checkout
app.post('/createShopifyCheckout/:guest_token', async(req, res) => {
    try {
        const { guest_token } = req.params;
        const guest = await pool.query(
            'SELECT id FROM guests WHERE guest_token = $1',
            [guest_token]
        );
        if (guest.rows.length === 0) {
            return res.status(404).json({
                message: 'Guest not found'
            });
        }

        const guest_id = guest.rows[0].id;
        const cartItems = await pool.query(`
            SELECT
                c.item_quantity,
                pv.shopify_variant_id
            FROM carts c
            JOIN product_variants pv
            ON c.variant_id = pv.id
            WHERE c.guest_id = $1
        `, [guest_id]);

        const lines = cartItems.rows.map(item => ({
            quantity: item.item_quantity,
            merchandiseId: item.shopify_variant_id
        }));

        const response = await axios.post(
            `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2026-07/graphql.json`,
            {
                query: `
                    mutation cartCreate($input: CartInput!) {
                        cartCreate(input: $input) {
                            cart {
                                checkoutUrl
                            }
                            userErrors {
                                field
                                message
                            }
                        }
                    }
                `,
                variables: {
                    input: {
                        lines,
                        attributes: [
                            {
                                key: "guest_token",
                                value: guest_token
                            }
                        ]
                    }
                }
            },
            {
                headers:{
                    "Content-Type": "application/json",
                    "X-Shopify-Storefront-Access-Token":
                        process.env.SHOPIFY_STOREFRONT_TOKEN
                }
            }
        );
        console.log(JSON.stringify(response.data, null, 2));
        const cartData = response.data.data.cartCreate;
        if (cartData.userErrors.length > 0) {
            return res.status(400).json({
                errors: cartData.userErrors
            });
        }
        const checkoutUrl = cartData.cart.checkoutUrl
        res.json({checkoutUrl});
    } catch(error) {
        console.log(JSON.stringify(error.response?.data, null, 2));
        console.log(error.message)
        res.status(500).json({
            message: "Shopify checkout failed"
        });
    }
});

// webhook for create order
app.post('/shopify/webhook/orders-create', async(req,res)=>{

    try {
        const order = req.body;
        const customer = order.customer || {};
        const shipping = order.shipping_address || {};
        const email = customer.email?.toLowerCase();

        let user_id = null;
        let guest_id = null;

        if(email){
            const user = await pool.query(
                `
                SELECT id 
                FROM users 
                WHERE LOWER(email) = $1
                `,
                [email]
            );
            if(user.rows.length > 0){
                user_id = user.rows[0].id;
            }
        }
        if(!user_id){
            const guestToken = order.note_attributes?.find(
                attr => attr.name === "guest_token"
            )?.value;

            if(guestToken){
                const guest = await pool.query(
                    `
                    SELECT id 
                    FROM guests 
                    WHERE guest_token = $1
                    `,
                    [guestToken]
                );

                if(guest.rows.length > 0){
                    guest_id = guest.rows[0].id;
                }
            }
        }

        const result = await pool.query(`
            INSERT INTO orders
            (
                user_id,
                guest_id,
                shopify_order_id,
                customer_name,
                customer_email,
                customer_phone,
                shipping_address,
                total_amount,
                order_status
            )
            VALUES
            ($1,$2,$3,$4,$5,$6,$7,$8,$9)
            RETURNING *
        `,
        [
            user_id,
            guest_id,
            order.id,
            `${customer.first_name  || ''} ${customer.last_name || ''}`,
            email,
            customer.phone || shipping.phone,
            JSON.stringify(shipping),
            order.total_price,
            order.financial_status
        ]);

        if (guest_id) {
            await pool.query(
                "DELETE FROM carts WHERE guest_id = $1",
                [guest_id]
            );
        }

        console.log("ORDER SAVED:", result.rows[0]);
        res.status(200).send("Webhook received");
    } catch(error){
        console.log(error);
        res.status(500).send('Server Error');
    }
});

// create register for guest/user/buyer
app.post('/register', async(req,res)=>{

    try {
        const { email, first_name, last_name, address, apartment_or_suite, city, postal_code, region, password } = req.body;
        const hashedPw = await bcrypt.hash(password, 10);
        const existingUser = await pool.query(
            "SELECT id FROM users WHERE email = $1",
            [email]
        );

        if(existingUser.rows.length > 0){
            return res.status(400).json({
                message:"Email already exists"
            });
        }
        const result = await pool.query(
            `
            INSERT INTO users
            (
                email,
                first_name,
                last_name,
                address,
                apartment_or_suite,
                city,
                postal_code,
                region,
                password
            )
            VALUES
            ($1,$2,$3,$4,$5,$6,$7,$8,$9)
            RETURNING *
            `,
            [
                email,
                first_name,
                last_name,
                address,
                apartment_or_suite,
                city,
                postal_code,
                region,
                hashedPw
            ]
        );
        const user = result.rows[0];
        await pool.query(
            `
            UPDATE orders
            SET user_id = $1,
                guest_id = NULL
            WHERE customer_email = $2
            `,
            [ user.id, email ]
        );

        const token = jwt.sign(
            {id: user.id, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        );
        
        res.json({
            message:"Account created",
            token,
            user:{
                id:user.id,
                email:user.email,
                first_name:user.first_name,
                last_name:user.last_name
            }
        });
    } catch(error){
        console.log(error);
        res.status(500).send("Server Error");
    }
});

// login user/buyer
app.post('/login', async(req, res) => {

    try {
        const { email, password } = req.body;
        const cleanEmail = email.toLowerCase().trim();
        const result = await pool.query('SELECT * FROM users WHERE LOWER(email)=$1', [ cleanEmail ])
        if(result.rows.length === 0){
            return res.status(400).json({message: 'User not found'})
        }

        const user = result.rows[0]
        if(!user.password){
            return res.status(500).json({message: 'Password is missing in Database'})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({message: 'Invalid credentials'})
        }

        const token = jwt.sign(
            {id: user.id}, 
            process.env.JWT_SECRET, 
            {expiresIn: '24h'}
        );
        return res.json({
            token,
            user: {id: user.id, email: user.email}
        })
    } catch (error) {
        console.log('Login Error', error)
        res.status(500).send('Server Error')
    }
})

// get account of users/registered buyer to get order history
app.get('/account/orders', authMiddleware, async(req,res)=>{

    try{
        const user_id = req.user.id;
        const orders = await pool.query('SELECT * FROM orders WHERE user_id = $1 ORDER BY id DESC', [user_id]);
        res.json(orders.rows);
    }catch(error){
        console.log('Login Error', error)
        res.status(500).send('Server Error')
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Jem your server is running on port ${PORT}`)
})