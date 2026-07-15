import "./register-form.css";

export default function RegisterForm() {
    return (
        <div className="register-container">
            <form className="register-form">
                <div className="register-header">
                    <h2>Login</h2>
                </div>
                <div className="input-group">
                    <input
                        type="email"
                        placeholder="Enter your email"
                    />
                </div>
                <div className="input-group">
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                    />
                </div>
                <button type="submit" className="register-btn">
                    Sign In
                </button>
                <p className="login-link">
                    Create an account
                    <a href="/register"> Sign up</a>
                </p>
            </form>
        </div>
    );
}