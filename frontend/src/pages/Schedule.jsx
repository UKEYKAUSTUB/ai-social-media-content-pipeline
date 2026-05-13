import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import { toast } from "react-toastify";

function Schedule() {

  const [formData, setFormData] = useState({
    platform: "",
    date: "",
    time: "",
    content: "",
  });

  const [scheduledPosts, setScheduledPosts] =
    useState([]);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    const newPost = {
      id: Date.now(),
      ...formData,
    };

    setScheduledPosts([
      newPost,
      ...scheduledPosts,
    ]);

    toast.success("Post scheduled");

    setFormData({
      platform: "",
      date: "",
      time: "",
      content: "",
    });

  };

  return (

    <div className="min-h-screen bg-black flex">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN */}

      <div className="flex-1">

        <Navbar />

        <div className="p-8 text-white">

          {/* HEADER */}

          <div className="mb-10">

            <h1 className="text-4xl font-bold mb-2">
              Schedule Posts
            </h1>

            <p className="text-zinc-400">
              Schedule AI content for publishing
            </p>

          </div>

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 space-y-5 max-w-3xl mb-10"
          >

            <input
              type="text"
              name="platform"
              placeholder="Platform"
              value={formData.platform}
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-zinc-900"
            />

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-zinc-900"
            />

            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-zinc-900"
            />

            <textarea
              name="content"
              placeholder="Paste AI generated content"
              rows="5"
              value={formData.content}
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-zinc-900"
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-2xl"
            >
              Schedule Post
            </button>

          </form>

          {/* SCHEDULED POSTS */}

          <div>

            <h2 className="text-2xl font-bold mb-6">
              Scheduled Posts
            </h2>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

              {scheduledPosts.map((post) => (

                <div
                  key={post.id}
                  className="bg-zinc-950 border border-zinc-800 rounded-3xl p-5"
                >

                  <div className="flex justify-between mb-4">

                    <span className="bg-blue-600 px-4 py-2 rounded-xl text-sm">
                      {post.platform}
                    </span>

                    <span className="text-zinc-400 text-sm">
                      {post.date}
                    </span>

                  </div>

                  <p className="text-zinc-300 line-clamp-5 mb-5">

                    {post.content}

                  </p>

                  <div className="text-zinc-500 text-sm">

                    Scheduled at {post.time}

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Schedule;