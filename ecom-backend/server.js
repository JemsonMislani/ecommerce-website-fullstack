const express = require('express')
const cors = require('cors')
const { Pool } = require('pg')
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
        const { prod_id, prod_size, prod_color, prod_img_hover, prod_desc_threelines } = req.body
        const result = await pool.query('INSERT INTO product_variants (prod_id, prod_size, prod_color, prod_img_hover, prod_desc_threelines) VALUES ($1, $2, $3, $4, $5 ) RETURNING *', [ prod_id, prod_size, prod_color, prod_img_hover, prod_desc_threelines ])
        res.json(result.rows[0])
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
})

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Jem your server is running on port ${PORT}`)
})