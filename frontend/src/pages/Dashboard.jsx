import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import WorkspaceCard from "../components/WorkspaceCard";

import {
  getProjects,deleteProject,
} from "../services/projectService";

function Dashboard() {

  const [projects, setProjects] = useState([]);

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

  const handleDelete = async (id) => {

  try {

    await deleteProject(id);

    fetchProjects();

  } catch (error) {

    console.log(error);

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
              Workspace History
            </h1>

            <p className="text-zinc-400">
              Manage all your AI workspaces
            </p>

          </div>

          {/* WORKSPACE GRID */}

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

            {projects.map((project) => (

              <WorkspaceCard
                key={project._id}
                project={project}
                onDelete={handleDelete}
              />

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;