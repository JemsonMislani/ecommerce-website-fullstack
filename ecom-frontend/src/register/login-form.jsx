import { useState } from "react";
import axios from 'axios'
import "./login-form.css";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
    const [user, setUser] = useState(null)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const nav = useNavigate()

    const handleSignInBtn = (e) => {
        e.preventDefault();
        if(!email || !password){
            alert('Please fillout fields')
            return
        }
        axios.post('http://localhost:5000/login', {
            email: email,
            password: password
        })
        .then(result => {
            localStorage.setItem('token', result.data.token)
            setUser(result.data.user);
            nav('/user-account-page')
        })
        .catch(err => {
            alert('Invalid credentials')
            console.log(err)
        })
    }

    return (
        <div className="login-container">
            <form 
                onSubmit={handleSignInBtn}
                className="login-form">
                <div className="login-header">
                    <h2>Login</h2>
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
                        name="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="login-btn">
                    Sign In
                </button>
                <p className="login-link">
                    Create an account
                    <a href="/register-form"> Sign up</a>
                </p>
            </form>
        </div>
    );
}