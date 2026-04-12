import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


const handleLogin = async () => {
  try {
    const res = await API.post("/auth/login", {
      email,
      password,
    });

    console.log("LOGIN SUCCESS:", res.data);

    localStorage.setItem("token", res.data.token);

    alert("Login successful ");
    navigate("/dashboard");
  } catch (err) {
    console.log("LOGIN ERROR:", err.response?.data || err.message);
    alert(err.response?.data || "Login failed");
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 px-4">

      {/* CARD */}
      <div className="w-full max-w-md bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-100 animate-fadeIn">

        {/* HEADER */}
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Welcome Back
        </h2>

        <p className="text-center text-gray-500 text-sm mt-2">
          Login to manage your tasks
        </p>

        {/* EMAIL */}
        <input
          className="w-full mt-6 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          className="w-full mt-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-lg font-semibold shadow-md
                     hover:scale-[1.02] hover:shadow-lg active:scale-95 transition-all duration-200"
        >
          Login
        </button>

        {/* SIGNUP LINK */}
        <p className="text-sm text-center mt-5 text-gray-500">
          Don’t have an account?{" "}
          <span
            className="text-blue-600 font-medium cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
      </div>

      {/* SIMPLE ANIMATION STYLE */}
      <style>
        {`
          .animate-fadeIn {
            animation: fadeIn 0.6s ease-out;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(15px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}

export default Login;