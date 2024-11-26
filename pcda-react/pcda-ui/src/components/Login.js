import React, { useState, useEffect } from "react";
import axios from "axios";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [captchaImage, setCaptchaImage] = useState("");
    const [captchaToken, setCaptchaToken] = useState("");
    const [captchaInput, setCaptchaInput] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Fetch captcha when the component mounts
    useEffect(() => {
        generateCaptcha();
    }, []);

    const generateCaptcha = async () => {
        try {
            const response = await axios.get("http://localhost:8888/auth/generate");
            const { captchaImage, token } = response.data;

            if (captchaImage && token) {
                setCaptchaImage(captchaImage);
                setCaptchaToken(token);
            } else {
                setError("Failed to load captcha. Please try again.");
            }
        } catch (err) {
            setError("Error fetching captcha. Please try again.");
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!captchaInput) {
            setError("Please enter the captcha.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8888/auth/login", {
                username,
                password,
                captchaToken,
                captchaInput,
            });
            setSuccess(response.data.message);
            setError("");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed. Please try again.");
            setSuccess("");
            generateCaptcha(); // Refresh captcha on failure
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
                    <div className="mb-3 text-center">
                        {captchaImage ? (
                            <img
                                src={captchaImage}
                                alt="captcha"
                                className="mb-3"
                                style={{ maxWidth: "100%", height: "auto" }}
                            />
                        ) : (
                            <p>Loading captcha...</p>
                        )}
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter captcha"
                            value={captchaInput}
                            onChange={(e) => setCaptchaInput(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mt-3">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
