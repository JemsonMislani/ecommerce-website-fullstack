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

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Jem your server is running on port ${PORT}`)
})