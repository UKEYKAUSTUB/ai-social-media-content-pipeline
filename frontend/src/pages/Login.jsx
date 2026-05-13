import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

import InputField from "../components/InputField";
import Button from "../components/Button";

import { useAuth } from "../context/AuthContext";

function Login() {

  // ✅ ALL HOOKS INSIDE COMPONENT
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await login(formData);

      navigate("/dashboard"); // ✅ redirect works now

    } catch (error) {

      console.log(error);

      toast.error(
        error?.response?.data?.message || "Login Failed"
      );

    }

  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-zinc-950 p-8 rounded-2xl border border-zinc-800">

        <h1 className="text-3xl font-bold text-white text-center mb-2">
          Welcome Back
        </h1>

        <p className="text-zinc-400 text-center mb-8">
          Login to your AI content workspace
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <InputField
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <InputField
            type="password"
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          <Button text="Login" />

        </form>

        <p className="text-zinc-400 text-center mt-6">
          Don't have an account?{" "}

          <Link to="/signup" className="text-blue-500 hover:underline">
            Signup
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;