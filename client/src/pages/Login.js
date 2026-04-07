import API from "../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await API.post("/auth/login", {
                email,
                password
            });

            localStorage.setItem("token", res.data.token);

            navigate("/dashboard");
        } catch (err) {
            console.log("ERROR:", err);
            console.log("RESPONSE:", err.response);

            alert(err.response?.data || "Login failed");
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-8 rounded-2xl shadow-lg w-96">

                <h2 className="text-2xl font-bold text-center text-gray-800">
                    Welcome Back 👋
                </h2>

                <p className="text-center text-gray-500 text-sm mt-1">
                    Login to manage your tasks
                </p>

                <input
                    className="w-full mt-6 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    className="w-full mt-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleLogin}
                    className="w-full mt-6 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
                >
                    Login
                </button>

                <p className="text-sm text-center mt-4 text-gray-500">
                    Don’t have an account?{" "}
                    <span
                        className="text-blue-500 cursor-pointer"
                        onClick={() => navigate("/signup")}
                    >
                        Sign up
                    </span>
                </p>

            </div>
        </div>
    );
}

export default Login;