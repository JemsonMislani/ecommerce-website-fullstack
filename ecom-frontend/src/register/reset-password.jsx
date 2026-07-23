import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./login-form.css";
import Header from "../home-components/Header";
import FooterPage from "../home-components/FooterPage";
import './reset-password.css'

export default function ResetPassword() {
    const { token } = useParams();
    const nav = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmitBtn = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        setLoading(true);
        setError("");
        setMessage("");
        try {
            const result = await axios.post(
                "http://localhost:5000/reset-password",
                { token, password }
            );
            setMessage(result.data.message);
            setTimeout(() => {
                nav("/login");
            }, 2000);
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
            <Header />
                <div className="login-container-reset-page">
                    <form
                        className="login-form-reset-page"
                        onSubmit={handleSubmitBtn}
                    >
                        <h2>Reset Password</h2>
                        {
                            message &&
                            <div className="success-message-reset-page"> {message}
                            </div>
                        }
                        {
                            error &&
                            <div className="error-message-reset-page">{error}
                            </div>
                        }
                        <div className="input-group-reset-page">
                            <input
                                type="password"
                                placeholder="New Password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                            />
                        </div>
                        <div className="input-group-reset-page">
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                        </div>
                        <button 
                            className="reset-page-btn"
                            disabled={loading}>
                            {
                                loading ?
                                'Updating...'
                                :
                                'Reset Password'
                            }
                        </button>
                    </form>
                </div>
            <FooterPage />
        </>
    );
}