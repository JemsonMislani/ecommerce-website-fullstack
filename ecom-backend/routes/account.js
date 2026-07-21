const express = require("express");
const router = express.Router();
const pool = require("../db");
const authMiddleware = require("../middleware/authMiddleware");
const shopifyAdmin = require("../services/shopifyAdmin");

// get current logged in users info
router.get("/me", authMiddleware, async(req,res)=>{

    try {
        const response = await shopifyAdmin.post(
            "/graphql.json",
            {
                query:`
                    query getCustomer($id: ID!){
                        customer(id:$id){
                            id
                            firstName
                            lastName
                            email

                            defaultAddress{
                                id
                                firstName
                                lastName
                                company
                                phone
                                address1
                                address2
                                city
                                province
                                zip
                                country
                            }
                        }
                    }
                `,
                variables:{
                    id:req.user.shopify_customer_id
                }
            }
        );

        const customer = response.data.data.customer;
        res.json({
            id: customer.id,
            first_name: customer.firstName,
            last_name: customer.lastName,
            email: customer.email,
            address:
                customer.defaultAddress?.address1 || "",
            apartment_or_suite:
                customer.defaultAddress?.address2 || "",
            city:
                customer.defaultAddress?.city || "",
            postal_code:
                customer.defaultAddress?.zip || "",
            region:
                customer.defaultAddress?.province || "Abra",
            country:
                customer.defaultAddress?.country || "Philippines",
            address_id:
                customer.defaultAddress?.id || null,
            customer_phone:
                customer.defaultAddress?.phone || "",
            has_address:
                !!customer.defaultAddress,
            company:
            customer.defaultAddress?.company || "",
        });
    }catch(error){
        console.log(
            error.response?.data || error
        );
        res.status(500).json({
            message:"Server error"
        });
    }
});


// update current logged in users info
router.put("/update", authMiddleware, async(req,res)=>{

    try {
        const {
            first_name,
            last_name,
            company,
            address,
            apartment_or_suite,
            city,
            postal_code,
            region,
            customer_phone
        } = req.body;

        const customerData = await shopifyAdmin.post(
            "/graphql.json",
            {
                query:`
                query getCustomer($id: ID!){
                    customer(id:$id){
                        defaultAddress{
                            id
                        }
                    }
                }
                `,
                variables:{
                    id:req.user.shopify_customer_id
                }
            }
        );

        const addressId =
        customerData.data.data.customer.defaultAddress?.id;
        if(!addressId){
            return res.status(400).json({
                message:"No default address found"
            });
        }

        const customerUpdate = await shopifyAdmin.post(
            "/graphql.json",
            {
                query:`
                mutation customerUpdate(
                    $input: CustomerInput!
                ){
                    customerUpdate(
                        input:$input
                    ){
                        customer{
                            id
                            firstName
                            lastName
                        }

                        userErrors{
                            field
                            message
                        }
                    }
                }
                `,
                variables:{
                    input:{
                        id:req.user.shopify_customer_id,
                        firstName:first_name,
                        lastName:last_name
                    }
                }
            }
        );

        const customerResult =
            customerUpdate.data.data.customerUpdate;
        if(customerResult.userErrors.length > 0){
            return res.status(400).json({
                message:
                customerResult.userErrors[0].message
            });

        }

        const addressUpdate = await shopifyAdmin.post(
            "/graphql.json",
            {
                query:`
                mutation customerAddressUpdate(
                    $customerId: ID!,
                    $addressId: ID!,
                    $address: MailingAddressInput!
                ){
                    customerAddressUpdate(
                        customerId:$customerId,
                        addressId:$addressId,
                        address:$address
                    ){

                        customerAddress{
                            id
                            address1
                            address2
                            city
                            province
                            zip
                            country
                            phone
                        }

                        userErrors{
                            field
                            message
                        }
                    }
                }
                `,
                variables:{
                    customerId:req.user.shopify_customer_id,
                    addressId: addressId,
                    address:{
                        firstName:first_name,
                        lastName:last_name,
                        company:company || "",
                        phone:customer_phone,
                        address1:address,
                        address2:apartment_or_suite,
                        city:city,
                        province:region,
                        zip:postal_code,
                        country:"Philippines"
                    }
                }
            }
        );

        const addressResult =
        addressUpdate.data.data.customerAddressUpdate;
        if(addressResult.userErrors.length > 0){
            return res.status(400).json({
                message:
                addressResult.userErrors[0].message
            });

        }

        const result = await pool.query(
            `
            UPDATE users
            SET
                first_name=$1,
                last_name=$2,
                address=$3,
                apartment_or_suite=$4,
                city=$5,
                postal_code=$6,
                region=$7,
                customer_phone=$8
            WHERE id=$9
            RETURNING *
            `,
            [
                first_name,
                last_name,
                address,
                apartment_or_suite,
                city,
                postal_code,
                region,
                customer_phone,
                req.user.id
            ]
        );

        if(result.rows.length === 0){
            return res.status(404).json({
                message:"User not found"
            });
        }
        res.json({
            message:"Account updated",
            user:result.rows[0],
            shopify:{
                customer:customerResult.customer,
                address:addressResult.customerAddress
            }
        });
    }catch(error){
        console.log(
            error.response?.data || error
        );
        res.status(500).json({
            message:"Server error"
        });
    }
});
module.exports = router;
