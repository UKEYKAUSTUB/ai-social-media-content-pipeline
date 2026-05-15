import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

import InputField from "../components/InputField";
import Button from "../components/Button";

import { loginUser } from "../services/authService";

import { useAuth } from "../context/AuthContext";

function Login() {

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

      const data = await loginUser(formData);

      localStorage.setItem(
        "token",
        data.token
      );

login(data.user);

      toast.success("Login Successful");

      navigate("/dashboard");

    } catch (error) {

      toast.error(
        error?.response?.data?.message ||
        "Login Failed"
      );

    }

  };

  return (

    <div className="min-h-screen bg-black flex">

      {/* LEFT SECTION */}

      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-700 via-purple-700 to-black p-16 flex-col justify-between">

        {/* TOP */}

        <div>

          <h1 className="text-5xl font-bold text-white leading-tight mb-8">

            Grow Your Brand
            <br />
            With AI Powered
            <br />
            Content

          </h1>

          <p className="text-zinc-200 text-lg leading-relaxed max-w-lg">

            Generate social media campaigns,
            AI content, marketing visuals,
            and scheduled posts in seconds.

          </p>

        </div>

        {/* FEATURES */}

        <div className="space-y-5">

          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-5">

            <h2 className="text-white text-xl font-semibold mb-2">
              AI Content Generation
            </h2>

            <p className="text-zinc-200">
              Create engaging captions and
              marketing campaigns instantly.
            </p>

          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-5">

            <h2 className="text-white text-xl font-semibold mb-2">
              Workspace Management
            </h2>

            <p className="text-zinc-200">
              Organize projects and content
              for multiple brands.
            </p>

          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-5">

            <h2 className="text-white text-xl font-semibold mb-2">
              AI Image Creation
            </h2>

            <p className="text-zinc-200">
              Generate professional social
              media visuals using AI.
            </p>

          </div>

        </div>

      </div>

      {/* RIGHT SECTION */}

      <div className="w-full lg:w-1/2 flex items-center justify-center px-6">

        <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl p-10">

          <h1 className="text-4xl font-bold text-white text-center mb-3">

            Welcome Back

          </h1>

          <p className="text-zinc-400 text-center mb-8">

            Login to your AI workspace

          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

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

          <p className="text-zinc-400 text-center mt-8">

            Don’t have an account?{" "}

            <Link
              to="/signup"
              className="text-blue-500 hover:underline"
            >
              Signup
            </Link>

          </p>

        </div>

      </div>

    </div>

  );
}

export default Login;