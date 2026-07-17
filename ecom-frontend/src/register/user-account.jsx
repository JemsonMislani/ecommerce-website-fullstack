import { useEffect, useState } from "react";
import axios from 'axios'
import "./user-account.css";
import { formatPhp } from '../utils/formatPeso';
import Header from "../home-components/Header";
import FooterPage from "../home-components/FooterPage";
import { useNavigate } from "react-router-dom";

export default function AccountPage() {
    const [orderDataHistory, setOrderDataHistory] = useState([])
    const nav = useNavigate()

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

    const handleLogoutBtn = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        nav("/login");
    };

    return (
    <>
    <Header />
        <div className="account-container">
                <div className="account-header">
                <div>
                    <h1>My Orders</h1>
                    <p>
                        Track your purchases and view your order history.
                    </p>
                </div>
                <button
                    className="logout-btn"
                    onClick={handleLogoutBtn}
                >
                    Leave
                </button>
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
                                <div className="order-header">
                                    <div>
                                        <p className="order-label">
                                            Order ID
                                        </p>
                                        <h2>
                                            #{order.shopify_order_id}
                                        </h2>
                                        <span className="order-date">
                                            Customer: {order.customer_name}
                                        </span>
                                    </div>
                                    <span
                                        className={`status-badge ${order.fulfillment_status || "processing"}`}
                                    >
                                        {order.fulfillment_status || "Processing"}
                                    </span>
                                </div>
                                <div className="order-summary">
                                    <div>
                                        <span>
                                            Total Amount
                                        </span>
                                        <strong>
                                            ₱{formatPhp(order.total_amount)}
                                        </strong>
                                    </div>
                                    <div>
                                        <span>
                                            Email
                                        </span>
                                        <strong>
                                            {order.customer_email}
                                        </strong>
                                    </div>
                                    <div>
                                        <span>
                                            Phone
                                        </span>
                                        <strong>
                                            {order.customer_phone || "N/A"}
                                        </strong>
                                    </div>
                                </div>
                                <div className="order-section">

                                    <h3>
                                        📍 Shipping Address
                                    </h3>
                                    <p>
                                        {
                                            typeof order.shipping_address === "string"
                                            ? JSON.parse(order.shipping_address).address1
                                            : order.shipping_address?.address1
                                        }
                                    </p>
                                </div>
                                <div className="order-section tracking-section">
                                    <h3>
                                        🚚 Delivery Tracking
                                    </h3>
                                <div className="tracking-grid">
                                    <div>
                                        <span>
                                            Status
                                        </span>
                                        <strong>
                                            {
                                                order.fulfillment_status 
                                                || "Processing"
                                            }
                                        </strong>
                                    </div>
                                    <div>
                                        <span>
                                            Courier
                                        </span>
                                        <strong>
                                            {
                                                order.courier 
                                                || "Not assigned"
                                            }
                                        </strong>
                                    </div>
                                    <div>
                                        <span>
                                            Tracking Number
                                        </span>
                                        <strong>
                                            {
                                                order.tracking_number 
                                                || "Waiting for shipment"
                                            }
                                        </strong>
                                    </div>
                                </div>
                                {
                                    order.tracking_url && (
                                        <a
                                            className="track-button"
                                            href={order.tracking_url}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Track Package →
                                        </a>
                                    )
                                }
                                </div>
                                <div className="delivery-progress">
                                    <div className="step active">
                                        <span>✓</span>
                                        <p>Order Placed</p>
                                    </div>
                                    <div 
                                        className={
                                            order.fulfillment_status === "shipped"
                                            ? "step active"
                                            : "step"
                                        }
                                    >
                                        <span>✓</span>
                                        <p>Shipped</p>
                                    </div>
                                    <div className="step">
                                        <span>📦</span>
                                        <p>Delivered</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                )
            }
        </div>
        <FooterPage />
    </>
    );
}