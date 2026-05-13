import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import {
  getContentHistory,
  deleteContent,
} from "../services/contentService";

import ContentCard from "../components/ContentCard";

function History() {

  const [history, setHistory] = useState([]);

  const [selectedContent, setSelectedContent] =
    useState(null);

  useEffect(() => {

    fetchHistory();

  }, []);

  const fetchHistory = async () => {

    try {

      const data = await getContentHistory();

      setHistory(data);

    } catch (error) {

      console.log(error);

    }

  };

  const handleDelete = async (id) => {

    try {

      await deleteContent(id);

      fetchHistory();

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

        <h1 className="text-4xl font-bold mb-2">
          Content History
        </h1>

        <p className="text-zinc-400 mb-10">
          All your AI generated social media content
        </p>

        {/* GRID */}

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

          {history.map((item) => (

            <ContentCard
              key={item._id}
              item={item}
              onDelete={handleDelete}
              onClick={() =>
                setSelectedContent(item)
              }
            />

          ))}

        </div>

      </div>

    </div>

    {/* MODAL */}

    {selectedContent && (

      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6">

        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-3xl w-full p-8 relative max-h-[90vh] overflow-y-auto">

          <button
            onClick={() =>
              setSelectedContent(null)
            }
            className="absolute top-5 right-5 bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-xl text-white"
          >
            Close
          </button>

          <p className="text-zinc-400 mb-2">
            {selectedContent.platform}
          </p>

          <h2 className="text-3xl font-bold mb-6 text-white">
            {selectedContent.contentType}
          </h2>

          <p className="whitespace-pre-wrap text-zinc-300 leading-relaxed">

            {selectedContent.generatedContent}

          </p>

        </div>

      </div>

    )}

  </div>

);
}

export default History;