import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await API.post("/auth/signup", {
        name,
        email,
        password,
      });

      alert("Signup successful ");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-blue-100 px-4">

      {/* CARD */}
      <div className="w-full max-w-md bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-100 animate-fadeIn">

        {/* HEADER */}
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Create Account 
        </h2>

        <p className="text-center text-gray-500 text-sm mt-2">
          Join and manage your tasks easily
        </p>

        {/* NAME */}
        <input
          className="w-full mt-6 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        {/* EMAIL */}
        <input
          className="w-full mt-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          className="w-full mt-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* BUTTON */}
        <button
          onClick={handleSignup}
          className="w-full mt-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white p-3 rounded-lg font-semibold shadow-md
                     hover:scale-[1.02] hover:shadow-lg active:scale-95 transition-all duration-200"
        >
          Sign Up
        </button>

        {/* LOGIN LINK */}
        <p className="text-sm text-center mt-5 text-gray-500">
          Already have an account?{" "}
          <span
            className="text-purple-600 font-medium cursor-pointer hover:underline"
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </div>

      {/* ANIMATION */}
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

export default Signup;