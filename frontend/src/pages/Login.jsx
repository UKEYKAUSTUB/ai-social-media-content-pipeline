import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useState,
} from "react";

import InputField from "../components/InputField";

import { useAuth } from "../context/AuthContext";

function Login() {

  const navigate =
    useNavigate();

  const { login } =
    useAuth();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      const success =
        await login(formData);

      if (success) {

        navigate("/dashboard");

      }

    };

  return (

    <div className="min-h-screen bg-black flex items-center justify-center">

      <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl p-10">

        <h1 className="text-4xl font-bold text-white text-center mb-8">

          Login

        </h1>

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-5"
        >

          <InputField
            type="email"
            placeholder="Email"
            name="email"
            value={
              formData.email
            }
            onChange={
              handleChange
            }
          />

          <InputField
            type="password"
            placeholder="Password"
            name="password"
            value={
              formData.password
            }
            onChange={
              handleChange
            }
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl"
          >

            Login

          </button>

        </form>

        <p className="text-zinc-400 text-center mt-8">

          Don’t have an account?{" "}

          <Link
            to="/signup"
            className="text-blue-500"
          >

            Signup

          </Link>

        </p>

      </div>

    </div>

  );

}

export default Login;