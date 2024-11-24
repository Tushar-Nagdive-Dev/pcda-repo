import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/auth/login-form" element={<Login />} />
                <Route path="/auth/register-form" element={<Register />} />
                {/* Catch-all route */}
                <Route path="*" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;
