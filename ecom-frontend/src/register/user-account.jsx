import { useEffect, useState } from "react";
import axios from 'axios'
import "./user-account.css";
import { formatPhp } from '../utils/formatPeso';
import Header from "../home-components/Header";
import FooterPage from "../home-components/FooterPage";
import { useNavigate } from "react-router-dom";
import useScrollAnimation from "../scrollAnimation/scrollAnimation";

export default function AccountPage() {
    useScrollAnimation()
    const [orderDataHistory, setOrderDataHistory] = useState([])
    const [usersDetails, setUsersDetails] = useState([])
    const nav = useNavigate()
    const [activeSection, setActiveSection] = useState("orders");

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

    useEffect(() => {
        const token = localStorage.getItem('token')
        axios.get('http://localhost:5000/users/details', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(result => {
            setUsersDetails(result.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    return (
    <>
    <Header />
        <div className="account-layout animation">
            <aside className="account-sidebar">
            {
                usersDetails.map((details) => (
                    <div key={details.id}>
                        <div className="profile-card">
                            <div className="avatar">
                                {details?.first_name?.[0]}
                                {details?.last_name?.[0]}
                            </div>
                            <h2>
                                {details.first_name} {details.last_name}
                            </h2>
                            <p>{details.email}</p>
                        </div>
                    </div>
                ))
            }
                <nav className="nav">
                    <button
                        className={activeSection === "orders" ? "selected" : ""}
                        onClick={() => setActiveSection("orders")}
                    >Order History
                    </button>
                    <button
                        className={activeSection === "details" ? "selected" : ""}
                        onClick={() => setActiveSection("details")}
                    >Account Details
                    </button>
                    <button
                        className={activeSection === "settings" ? "selected" : ""}
                        onClick={() => setActiveSection("settings")}
                    >Settings
                    </button>
                    <button
                        className="logout-sidebar"
                        onClick={handleLogoutBtn}
                    >Leave
                    </button>
                </nav>
            </aside>
    <main className="account-content">
    {
    activeSection === "orders" && (
        <section>
            <div className="section-title">
                <div>
                    <h1>My Orders</h1>
                    <p>Track your purchases and delivery status.</p>
                </div>
                <span className="order-count">
                    {orderDataHistory.length}
                </span>
            </div>
            {
            orderDataHistory.length === 0 ?
            (
            <div className="empty-orders">
                <h2>No orders yet 🛒</h2>
                <p>Your purchased items will appear here.</p>
            </div>
            )
            :
            (
            <div className="orders-list">
                {
                orderDataHistory.map(order => (
                    <div className="order-card" key={order.id}>
                        <div className="order-top">
                            <div>
                                <small>Order ID</small>
                                <h2>#{order.shopify_order_id}</h2>
                            </div>
                            <span className="status">
                                {order.fulfillment_status || "Processing"}
                            </span>
                        </div>
                        <div className="order-info">
                            <div>
                                <small>Customer</small>
                                <p className="customer-name">{order.customer_name}</p>
                            </div>
                            <div>
                                <small>Total</small>
                                <p>
                                    ₱{formatPhp(order.total_amount)}
                                </p>
                            </div>
                            <div>
                                <small>Email</small>
                                <p className="customer-email">
                                    {order.customer_email}
                                </p>
                            </div>
                            <div>
                                <small>Phone</small>
                                <p>
                                    {order.customer_phone}
                                </p>
                            </div>
                            <div>
                                <small>Payment Status</small>
                                <p>
                                    {order.order_status}
                                </p>
                            </div>
                            <div>
                                <small>Tracking Number</small>
                                <p>
                                    {order.tracking_number || 'N/A'}
                                </p>
                            </div>
                            <div>
                                <small>Courier</small>
                                <p>
                                    {order.courier || 'N/A'}
                                </p>
                            </div>
                        </div>
                        <div className="shipping-box">
                            📍 Shipping Address
                            <p>
                            {
                            typeof order.shipping_address === "string"
                            ? JSON.parse(order.shipping_address).address1
                            : order.shipping_address?.address1
                            }
                            </p>
                        </div>
                        <div>
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
                    </div>
                ))
                }
            </div>
            )
        }
        </section>
    )
}
        {activeSection === "details" && (
            <section className="details-section">
                <div className="details-header">
                <div>
                    <h1>Account Details</h1>
                    <p className="subtitle">
                    Manage your personal information and shipping details.
                    </p>
                </div>
                <button className="edit-btn">
                    Edit Details
                </button>
                </div>
                {
                    usersDetails.map((details) => (
                <div className="details-card" key={details.id}>
                    <div className="info-items">
                    <span>Full Name</span>
                    <p>{details.first_name} {details.last_name}</p>
                    </div>

                    <div className="info-items">
                    <span>Email</span>
                    <p>{details.email}</p>
                    </div>

                    <div className="info-items full">
                    <span>Address</span>
                    <p>{details.address || "Not provided"}</p>
                    </div>

                    <div className="info-items">
                    <span>Apartment / Suite</span>
                    <p>{details.apartment_or_suite || "N/A"}</p>
                    </div>

                    <div className="info-items">
                    <span>City</span>
                    <p>{details.city || "N/A"}</p>
                    </div>

                    <div className="info-items">
                    <span>Postal Code</span>
                    <p>{details.postal_code || "N/A"}</p>
                    </div>

                    <div className="info-items">
                    <span>Region</span>
                    <p>{details.region || "N/A"}</p>
                    </div>
                </div>
                    ))
                }
            </section>
        )}
        {
            activeSection === "settings" && (
                <section>
                    <h1>Settings</h1>
                    <div className="settings-card">
                        <div>
                            <h3>Change Password</h3>
                            <p>Update your account password.</p>
                        </div>
                        <button className="update-btn">Update</button>
                    </div>
                </section>
            )
        }
        </main>
        </div>
        <FooterPage />
    </>
    );
}