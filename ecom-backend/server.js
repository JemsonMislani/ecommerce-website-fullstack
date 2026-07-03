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

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Jem your server is running on port ${PORT}`)
})