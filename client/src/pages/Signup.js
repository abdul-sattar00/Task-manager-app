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
        password
      });

      alert("Signup successful");
      navigate("/");
    } catch (err) {
  console.log("ERROR:", err.response?.data);
  alert(err.response?.data || "Signup failed");
}
  }
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow w-96">
        
        <h2 className="text-2xl font-bold text-center">Signup</h2>

        <input
          className="w-full mt-4 p-2 border"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full mt-4 p-2 border"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full mt-4 p-2 border"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="w-full mt-4 bg-blue-500 text-white p-2"
        >
          Signup
        </button>

      </div>
    </div>
  );
}

export default Signup;