const axios = require("axios");
const shopifyAdmin = axios.create({
    baseURL:
    `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2025-07`,
    headers:{
        "X-Shopify-Access-Token":
            process.env.SHOPIFY_ADMIN_TOKEN,
        "Content-Type":
            "application/json"
        }
    });
    
module.exports = shopifyAdmin;