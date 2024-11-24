import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8888";

export const loginUser = (username, password, recaptchaToken) => {
    return axios.post(`${API_BASE_URL}/auth/login`, {
        username,
        password,
        "g-recaptcha-response": recaptchaToken,
    });
};

export const registerUser = (userData) => {
    return axios.post(`${API_BASE_URL}/auth/register`, userData);
};
