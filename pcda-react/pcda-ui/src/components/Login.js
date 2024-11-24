import React, { useState } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [recaptchaToken, setRecaptchaToken] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!recaptchaToken) {
            setError("Please complete the reCAPTCHA.");
            return;
        }
        try {
            const response = await axios.post("http://localhost:8888/auth/login", {
                username,
                password,
                "g-recaptcha-response": recaptchaToken,
            });
            setSuccess(response.data.message);
            setError("");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed. Please try again.");
            setSuccess("");
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow p-4 mx-auto" style={{ maxWidth: "400px" }}>
                <h2 className="text-center mb-4">Login</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <ReCAPTCHA
                        sitekey="6LfS6IcqAAAAAOOmv8mFQ8xG3sysOlTDT29dPA5A"
                        onChange={(token) => setRecaptchaToken(token)} 
                    />
                    <button type="submit" className="btn btn-primary w-100 mt-3">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
