import { useState } from "react";
import "./signup-form.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const nav = useNavigate()
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleRegisterBtn = (e) => {
        e.preventDefault();
        if(!firstname || !lastname || !email || !password){
            setError('Please fillout fields')
            return
        }
        setError('');
        setLoading(true)
        axios.post('http://localhost:5000/register', {
            first_name: firstname,
            last_name: lastname,
            email: email,
            password: password
        })
        .then(result => {
            localStorage.setItem('token', result.data.token)
            localStorage.setItem('user', JSON.stringify(result.data.user))
            setSuccess("Account created successfully!");
            setFirstName('')
            setLastName('')
            setEmail('')
            setPassword('')
            setTimeout(() => {
                nav('/login');
            }, 1500);
        })
        .catch(err => {
            setError(err.response?.data?.message || 'Email already used')
        })
        .finally(() => {
            setLoading(false);
        })
    }

    return (
    <>
        {
            loading && (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                </div>
            )
        }
        <div className="register-container">
            <form 
                onSubmit={handleRegisterBtn}
                className="register-form">
                <div className="register-header">
                    <h2>Create Account</h2>
                </div>
                {
                    success && (
                        <div className="success-message">
                            {success}
                        </div>
                    )
                }
                {
                    error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )
                }
                <div className="input-row">
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Enter first name"
                            value={firstname}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Enter last name"
                            value={lastname}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                </div>
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
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="register-btn"
                        disabled={loading}
                    >
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>
                <p className="login-link">
                    Already have an account? <a href="/login">Sign In</a>
                </p>
            </form>
        </div>
    </>
    );
}