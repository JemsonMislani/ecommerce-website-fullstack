import { useEffect, useState } from "react";
import axios from 'axios'
import "./user-account.css";
import Header from "../home-components/Header";
import FooterPage from "../home-components/FooterPage";
import { useNavigate } from "react-router-dom";
import useScrollAnimation from "../scrollAnimation/scrollAnimation";

export default function AccountPage() {
    useScrollAnimation()
    const [orderDataHistory, setOrderDataHistory] = useState([])
    const [usersDetails, setUsersDetails] = useState([])
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
        nav("/");
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
        <div className="account-page animation">
            <div className="account-left">
                <h2>Account</h2>
                <button
                    className="logout-btn"
                    onClick={handleLogoutBtn}
                >Sign out
                </button>
                <h2 className="section-heading">Orders</h2>
                {
                    orderDataHistory.length === 0 ?
                    (
                        <p className="account-link">
                            No recent orders
                        </p>
                    )
                    :
                    (
                        <p 
                            className="account-link clickable"
                            onClick={() =>
                                nav("/user-account-page/orders")
                            }
                        >Orders({orderDataHistory.length})
                        </p>
                    )
                }
            </div>
            <div className="account-right">
                <h2>Account Details</h2>
                {
                    usersDetails.map(user => (
                        <div key={user.id}>
                            <p>
                                {user.first_name} {user.last_name}
                            </p>
                        </div>
                    ))
                }
                <h2 className="section-heading">Philippines</h2>
                <p
                    className="account-link clickable"
                    onClick={() =>
                        nav("/user-account-page/address")
                    }
                >
                    Addresses (
                    {
                        usersDetails[0]?.address
                            ? 1 : 0
                    }
                    )
                </p>
            </div>
        </div>
        <FooterPage />
    </>
    );
}