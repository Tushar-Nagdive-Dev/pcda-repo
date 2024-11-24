import React, { useState } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
    });
    const [recaptchaToken, setRecaptchaToken] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        if (!recaptchaToken) {
            setError("Please complete the reCAPTCHA.");
            return;
        }
        try {
            const response = await axios.post("http://localhost:8888/auth/register", {
                ...formData,
                "g-recaptcha-response": recaptchaToken,
            });
            setSuccess(response.data.message);
            setError("");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Please try again.");
            setSuccess("");
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow p-4 mx-auto" style={{ maxWidth: "500px" }}>
                <h2 className="text-center mb-4">Register</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}
                <form onSubmit={handleRegister}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <ReCAPTCHA
                        sitekey="6LfS6IcqAAAAAOOmv8mFQ8xG3sysOlTDT29dPA5A"
                        onChange={(token) => setRecaptchaToken(token)}
                    />
                    <button type="submit" className="btn btn-primary w-100 mt-3">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
