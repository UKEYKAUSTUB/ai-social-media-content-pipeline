// src/pages/Workspaces.jsx

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import {
  createProject,
  
} from "../services/projectService";

import WorkspaceCard from "../components/WorkspaceCard";

function Workspaces() {


  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brandName: "",
    platform: "",
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

      await createProject(formData);
      toast.success("Workspace created");
      setFormData({
        name: "",
        description: "",
        brandName: "",
        platform: "",
      });

    } catch (error) {

      console.log(error);
      toast.error("Something went wrong")

    }

  };

  return (

  <div className="min-h-screen bg-black flex">

    {/* SIDEBAR */}

    <Sidebar />

    {/* MAIN */}

    <div className="flex-1">

      {/* NAVBAR */}

      <Navbar />

      {/* CONTENT */}

      <div className="p-8 text-white">

        <div className="mb-10">

          <h1 className="text-4xl font-bold mb-2">
            Create Workspace
          </h1>

          <p className="text-zinc-400">
            Organize your AI social media projects
          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 space-y-4 max-w-3xl"
        >

          <input
            type="text"
            name="name"
            placeholder="Project Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-zinc-900"
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-zinc-900"
          />

          <input
            type="text"
            name="brandName"
            placeholder="Brand Name"
            value={formData.brandName}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-zinc-900"
          />

          <input
            type="text"
            name="platform"
            placeholder="Platform"
            value={formData.platform}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-zinc-900"
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-2xl"
          >
            Create Workspace
          </button>

        </form>

      </div>

    </div>

  </div>

);
}

export default Workspaces;