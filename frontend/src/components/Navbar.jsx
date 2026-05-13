import { useAuth } from "../context/AuthContext";

function Navbar() {

  const { user } = useAuth();

  return (
    <div className="w-full h-[90px] border-b border-zinc-800 bg-black px-8 flex items-center justify-between">

      {/* LEFT */}
      <div>

        <h1 className="text-2xl font-bold text-white">
          Dashboard
        </h1>

        <p className="text-zinc-400 text-sm mt-1">
          Manage AI social media campaigns
        </p>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        <div className="text-right">

          <p className="text-white font-semibold">
            {user?.name || "User"}
          </p>

          <p className="text-zinc-400 text-sm">
            {user?.email}
          </p>

        </div>

        {/* AVATAR */}
        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">

          {user?.name?.charAt(0).toUpperCase() || "U"}

        </div>

      </div>

    </div>
  );
}

export default Navbar;