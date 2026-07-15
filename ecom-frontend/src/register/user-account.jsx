import { useEffect, useState } from "react";
import axios from 'axios'
import "./user-account.css";

export default function AccountPage() {
    const [orderDataHistory, setOrderDataHistory] = useState([])

    useEffect(() => {
        const token = localStorage.getItem('token')
        axios.get('http://localhost:5000/account/orders', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(result => {
            setOrderDataHistory(result.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    return (
    <>
       <div className="account-container">
            <div className="account-header">
                <h1>My Orders</h1>
                <p>
                    Track your purchases and view your order history.
                </p>
            </div>
            {
                orderDataHistory.length === 0 ? (
                    <div className="empty-orders">
                        <h2>No orders yet</h2>
                        <p>
                            You haven't purchased anything yet.
                        </p>
                    </div>
                ) : (
                    <div className="orders-list">
                    {
                        orderDataHistory.map((order)=>(
                            <div 
                                className="order-card"
                                key={order.id}
                            >
                                <div className="order-top">
                                    <div>
                                        <h3>
                                            Order #{order.shopify_order_id}
                                        </h3>
                                        <p>
                                            {order.customer_name}
                                        </p>
                                    </div>
                                    <span 
                                        className={
                                            `status ${order.order_status}`
                                        }
                                    >
                                        {order.order_status}
                                    </span>
                                </div>

                                <div className="order-details">
                                    <div>
                                        <label>Email</label>
                                        <p>
                                            {order.customer_email}
                                        </p>
                                    </div>
                                    <div>
                                        <label>Phone</label>
                                        <p>
                                            {order.customer_phone || "N/A"}
                                        </p>
                                    </div>
                                    <div>
                                        <label>Total</label>
                                        <p>
                                            ₱{Number(order.total_amount).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="shipping-box">
                                    <h4>
                                        Shipping Address
                                    </h4>
                                    <p>
                                        {
                                            typeof order.shipping_address === "string"
                                            ? JSON.parse(order.shipping_address).address1
                                            : order.shipping_address?.address1
                                        }
                                    </p>
                                </div>
                            </div>
                        ))
                    }
                    </div>
                )
            }
        </div>
    </>
    );
}