// src/pages/GenerateCampaign.jsx

import { useEffect, useState } from "react";

import { getProjects } from "../services/projectService";

import { generateContent } from "../services/contentService";

function GenerateCampaign() {

  const [projects, setProjects] = useState([]);

  const [formData, setFormData] = useState({
    projectId: "",
    platform: "",
    tone: "",
    contentType: "",
    description: "",
  });

  const [generated, setGenerated] = useState("");

  useEffect(() => {

    fetchProjects();

  }, []);

  const fetchProjects = async () => {

    try {

      const data = await getProjects();

      setProjects(data);

    } catch (error) {

      console.log(error);

    }

  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const data = await generateContent(formData);

      setGenerated(
        data.generatedContent ||
        data.content?.generatedContent
      );

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <div className="text-white">

      <h1 className="text-3xl font-bold mb-8">
        Generate AI Campaign
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 space-y-5"
      >

        <select
          name="projectId"
          value={formData.projectId}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-zinc-900"
        >

          <option value="">
            Select Project
          </option>

          {projects.map((project) => (

            <option
              key={project._id}
              value={project._id}
            >
              {project.name}
            </option>

          ))}

        </select>

        <input
          type="text"
          name="platform"
          placeholder="Platform"
          value={formData.platform}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-zinc-900"
        />

        <input
          type="text"
          name="tone"
          placeholder="Tone"
          value={formData.tone}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-zinc-900"
        />

        <input
          type="text"
          name="contentType"
          placeholder="Content Type"
          value={formData.contentType}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-zinc-900"
        />

        <textarea
          name="description"
          placeholder="Describe your content..."
          rows={5}
          value={formData.description}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-zinc-900"
        />

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-2xl"
        >
          Generate Content
        </button>

      </form>

      {/* GENERATED */}

      {generated && (

        <div className="mt-10 bg-zinc-950 border border-zinc-800 rounded-3xl p-6">

          <h2 className="text-2xl font-bold mb-5">
            Generated Content
          </h2>

          <p className="whitespace-pre-wrap text-zinc-300 leading-relaxed">
            {generated}
          </p>

        </div>

      )}

    </div>
  );
}

export default GenerateCampaign;