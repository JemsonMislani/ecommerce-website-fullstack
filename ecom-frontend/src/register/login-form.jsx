import { useState } from "react";
import axios from 'axios'
import "./login-form.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCart } from "../context/cartCount";
import { Link } from "react-router-dom";

export default function LoginForm() {
    const [user, setUser] = useState(null)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const nav = useNavigate()
    const { updateCartCount } = useCart();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSignInBtn = (e) => {
        e.preventDefault();
        if(!email || !password){
            setError('Please fillout fields')
            return
        }
        setError('');
        setLoading(true)
        axios.post('http://localhost:5000/login', {
            email: email,
            password: password
        })
        .then(result => {
            localStorage.setItem('token', result.data.token);
            localStorage.setItem('user', JSON.stringify(result.data.user));
            setUser(result.data.user);
            return axios.get(
                'http://localhost:5000/getUserCartCount',
                {
                    headers: {
                        Authorization: `Bearer ${result.data.token}`
                    }
                }
            );
        })
        .then(result => {
            updateCartCount(result.data.cartTotal);
            nav('/user-account-page');
        })
        .catch(err => {
            setError(err.response?.data?.message || "Login failed");
        })
        .finally(() => {
            setLoading(false);
        });
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            nav("/user-account-page");
        }
    }, [nav]);

    return (
    <>
        {
            loading && (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                </div>
            )
        }
        <div className="login-container">
            <form 
                onSubmit={handleSignInBtn}
                className="login-form">
                <div className="login-header">
                    <h2>Login</h2>
                </div>
                {
                    error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )
                }
                <div className="input-group">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="login-btn"
                    disabled={loading}
                >
                    {loading ? "Signing In..." : "Sign In"}
                </button>
                <p className="login-link">
                    Create an account
                    <a href="/register-form"> Sign up</a>
                </p>
                <p className="login-link">
                    <Link to="/forgot-password">
                        Forgot your password?
                    </Link>
                </p>
            </form>
        </div>
    </>
    );
}