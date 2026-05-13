import { Link } from "react-router-dom";
import { useState } from "react";

import InputField from "../components/InputField";
import Button from "../components/Button";

import { registerUser } from "../services/authService";

function Signup() {

  const [formData, setFormData] = useState({
    name: "",
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

    const data = await registerUser(formData);

    console.log(data);

    alert("Signup Successful");

  } catch (error) {

    console.log(error);

    alert("Signup Failed");

  }

};

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-zinc-950 p-8 rounded-2xl border border-zinc-800">

        <h1 className="text-3xl font-bold text-white text-center mb-2">
          Create Account
        </h1>

        <p className="text-zinc-400 text-center mb-8">
          Start generating AI social media content
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <InputField
            type="text"
            placeholder="Enter your name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <InputField
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <InputField
            type="password"
            placeholder="Create password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          <Button text="Signup" />

        </form>

        <p className="text-zinc-400 text-center mt-6">
          Already have an account?{" "}

          <Link
            to="/"
            className="text-blue-500 hover:underline"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Signup;