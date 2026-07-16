import "./signup-form.css";

export default function RegisterForm() {
    return (
        <div className="register-container">
            <form className="register-form">
                <div className="register-header">
                    <h2>Create Account</h2>
                </div>
                <div className="input-row">
                    <div className="input-group">
                        <input
                            type="text"
                            name="first_name"
                            placeholder="Enter first name"
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            name="last_name"
                            placeholder="Enter last name"
                        />
                    </div>
                </div>
                <div className="input-group">
                    <input
                        type="email"
                        name="email"
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
                <button className="register-btn">
                    Create Account
                </button>
                <p className="login-link">
                    Already have an account? <a href="/login">Sign In</a>
                </p>
            </form>
        </div>
    );
}