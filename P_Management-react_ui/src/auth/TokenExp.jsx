import jwtDecode from "jwt-decode";

// Token stored in memory
let token = null;

// Set the token
export const setToken = (newToken) => {
  token = newToken;
};

// Get the token
export const getToken = () => token;

// Clear the token
export const clearToken = () => {
  token = null;
};

// Check if the token is expired
export const isTokenExpired = () => {
  try {
    if (!token) return true; // No token, consider it expired
    const decodedToken = jwtDecode(token);

    if (!decodedToken.exp) {
      console.warn("Token does not have an 'exp' claim.");
      return true;
    }

    // Check if the token has expired
    return Date.now() >= decodedToken.exp * 1000;
  } catch (error) {
    console.error("Error decoding token:", error.message);
    return true; // Malformed or invalid token
  }
};
