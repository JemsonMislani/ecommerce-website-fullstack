import { useState } from "react";
import axios from "axios";
import "./reset-password-request.css";
import Header from "../home-components/Header";
import FooterPage from "../home-components/FooterPage";
import { Link } from "react-router-dom";

export default function ForgotPassword() {

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmitBtn = async (e) => {
        e.preventDefault();
        if (!email.trim()) {
            setError("Please enter your email address.");
            return;
        }
        setLoading(true);
        setError("");
        setMessage("");
        try {
            const result = await axios.post(
                "http://localhost:5000/forgot-password",
                { email }
            );
            setMessage(result.data.message);
            setEmail("");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header/>
                <div className="login-container-forgot-pass-page">
                    <form
                        onSubmit={handleSubmitBtn}
                        className="login-form-forgot-pass-page"
                    >
                        <h2>Recover Password</h2>
                        <p>
                            Enter your email address and we'll send you a password reset link.
                        </p>
                        {
                            message &&
                            <div className="success-message-forgot-pass-page">{message}
                            </div>
                        }
                        {
                            error &&
                            <div className="error-message-forgot-pass-page">{error}
                            </div>
                        }
                        <div className="input-group-forgot-pass-page">
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                            />
                        </div>
                        <button
                            disabled={loading}
                        >
                            {
                                loading ?
                                'Sending...'
                                :
                                'Submit'
                            }
                        </button>
                        <p className="login-link">
                            <Link to="/login">
                                Back to Sign In
                            </Link>
                        </p>
                    </form>
                </div>
            < FooterPage />
        </>
    );
}