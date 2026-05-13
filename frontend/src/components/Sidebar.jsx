import { Link, useLocation } from "react-router-dom";

function Sidebar() {

  const location = useLocation();

  const links = [
  {
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    name: "Create Workspace",
    path: "/create-workspace",
  },
  {
    name: "History",
    path: "/history",
  },
  {
  name: "Schedule",
  path: "/schedule",
  },
];

  return (
    <div className="w-[280px] min-h-screen bg-zinc-950 border-r border-zinc-800 p-6 flex flex-col">

      {/* LOGO */}
      <div className="mb-10">

        <h1 className="text-3xl font-bold text-white">
          AI Pipeline
        </h1>

        <p className="text-zinc-400 mt-2 text-sm">
          AI Social Media Workspace
        </p>

      </div>

      {/* NAV LINKS */}
      <div className="flex flex-col gap-3">

        {links.map((link) => (

          <Link
            key={link.path}
            to={link.path}
            className={`
              px-5 py-4 rounded-2xl transition-all duration-200
              ${
                location.pathname === link.path
                  ? "bg-blue-600 text-white"
                  : "bg-zinc-900 text-zinc-300 hover:bg-zinc-800"
              }
            `}
          >
            {link.name}
          </Link>

        ))}

      </div>

      {/* FOOTER */}
      <div className="mt-auto pt-10">

        <button
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-2xl"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Sidebar;