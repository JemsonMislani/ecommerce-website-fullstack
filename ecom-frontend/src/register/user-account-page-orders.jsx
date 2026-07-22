import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./user-account.css";
import Header from "../home-components/Header";
import FooterPage from "../home-components/FooterPage";
import { formatPhp } from "../utils/formatPeso";
import useScrollAnimation from "../scrollAnimation/scrollAnimation";
import './user-account-page-orders.css'

export default function OrdersPage() {
    useScrollAnimation();
    const nav = useNavigate();
    const [orderDataHistory, setOrderDataHistory] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get(
            "http://localhost:5000/account/orders",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then(result => {
            setOrderDataHistory(result.data);
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    return (
    <>
        <Header />
        <div className="orders-page animation">
            <button
                className="back-btn"
                onClick={() => nav("/user-account-page")}
            >Back to Account
            </button>
            <h1>Orders</h1>
            {
                orderDataHistory.length === 0 ? (
                    <p>No recent orders.</p>
                ) : (
                    <div className="orders-list">
                        {orderDataHistory.map(order => (
                            <div
                                className="order-card"
                                key={order.id}
                            >
                                <div className="order-header">
                                    <h3>
                                        Order #{order.shopify_order_id}
                                    </h3>
                                    <span className="order-status">
                                        {order.order_status}
                                    </span>
                                </div>
                                <p>
                                    <strong>Total:</strong>{" "}
                                    ₱{formatPhp(order.total_amount)}
                                </p>
                                <p>
                                    <strong>Date:</strong>{" "}
                                    {new Date(order.created_at).toLocaleDateString()}
                                </p>
                                <p>
                                    <strong>Customer:</strong>{" "}
                                    {order.customer_name}
                                </p>
                                <p>
                                    <strong>Email:</strong>{" "}
                                    {order.customer_email}
                                </p>
                                <p>
                                    <strong>Phone:</strong>{" "}
                                    {order.customer_phone}
                                </p>
                                <p>
                                    <strong>Tracking:</strong>{" "}
                                    {order.tracking_number || "No tracking yet"}
                                </p>
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
                        ))}
                    </div>
                )
            }
        </div>
        <FooterPage />
    </>
);
}