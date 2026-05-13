import { useNavigate } from "react-router-dom";

function WorkspaceCard({
  project,
  onDelete,
}) {

  const navigate = useNavigate();

  return (

    <div
      onClick={() =>
        navigate(`/workspace/${project._id}`)
      }
      className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 hover:border-blue-500 transition-all cursor-pointer relative"
    >

      {/* DELETE BUTTON */}

      <button
        onClick={(e) => {

          e.stopPropagation();

          onDelete(project._id);

        }}
        className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 px-3 py-1 rounded-xl text-sm text-white"
      >
        Delete
      </button>

      {/* TITLE */}

      <h2 className="text-2xl font-bold mb-2 text-white pr-20">

        {project.name}

      </h2>

      {/* DESCRIPTION */}

      <p className="text-zinc-400 mb-4">

        {project.description}

      </p>

      {/* TAGS */}

      <div className="flex gap-3 flex-wrap">

        <span className="bg-zinc-800 px-4 py-2 rounded-xl text-sm text-white">

          {project.brandName}

        </span>

        <span className="bg-zinc-800 px-4 py-2 rounded-xl text-sm text-white">

          {project.platform}

        </span>

      </div>

    </div>

  );
}

export default WorkspaceCard;