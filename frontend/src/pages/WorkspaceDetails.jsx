import { useEffect, useState } from "react";
import { generateImage } from "../services/imageService";
import jsPDF from "jspdf";

import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";


import {
  generateContent,
  getContentHistory,
} from "../services/contentService";

function WorkspaceDetails() {
  const [imagePrompt, setImagePrompt] =
  useState("");

const [generatedImage, setGeneratedImage] =
  useState("");

const [imageLoading, setImageLoading] =
  useState(false);

  const { id } = useParams();

  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(false);
  const [selectedContent, setSelectedContent] =
  useState(null);

  const [formData, setFormData] = useState({
    platform: "",
    tone: "",
    contentType: "",
    description: "",
  });

  useEffect(() => {

    fetchHistory();

  }, []);

  const fetchHistory = async () => {

    try {

      const data = await getContentHistory();

      // FILTER ONLY THIS PROJECT

      const filtered = data.filter(
        (item) => item.project === id
      );

      setHistory(filtered);

    } catch (error) {

      console.log(error);
      toast.error("Something went wrong")

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

      setLoading(true);

      await generateContent({
        projectId: id,
        ...formData,
      });
      toast.success("AI content generated");

      fetchHistory();

      setFormData({
        platform: "",
        tone: "",
        contentType: "",
        description: "",
      });

    } catch (error) {

      console.log(error);
      toast.error("Something went wrong")

    } finally {

      setLoading(false);

    }

  };

  const handleGenerateImage = async () => {

  try {

    setImageLoading(true);

    const data = await generateImage(
      imagePrompt
    );

    setGeneratedImage(data.imageUrl);

    toast.success("Image generated");

  } catch (error) {

    console.log(error);

    toast.error("Image generation failed");

  } finally {

    setImageLoading(false);

  }

};


const exportPDF = (content) => {

  const doc = new jsPDF();

  doc.setFontSize(14);

  const splitText = doc.splitTextToSize(
    content.generatedContent,
    180
  );

  doc.text(
    `${content.contentType}`,
    10,
    15
  );

  doc.text(
    splitText,
    10,
    30
  );

  doc.save("ai-content.pdf");

};

  return (

  <div className="min-h-screen bg-black flex">

    {/* SIDEBAR */}

    <Sidebar />

    {/* MAIN */}

    <div className="flex-1">

      {/* NAVBAR */}

      <Navbar />

      {/* PAGE CONTENT */}

      <div className="p-8 text-white">

        {/* HEADER */}

        <div className="mb-10">

          <h1 className="text-4xl font-bold mb-2">
            Workspace
          </h1>

          <p className="text-zinc-400">
            Generate and manage AI campaigns
          </p>

        </div>

        {/* FORM CARD */}

        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 mb-10">

          <h2 className="text-2xl font-bold mb-6">
            Generate AI Content
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <input
              type="text"
              name="platform"
              placeholder="Platform"
              value={formData.platform}
              onChange={handleChange}
              className="w-full p-4 rounded-2xl bg-zinc-900 border border-zinc-800 outline-none"
            />

            <input
              type="text"
              name="tone"
              placeholder="Tone"
              value={formData.tone}
              onChange={handleChange}
              className="w-full p-4 rounded-2xl bg-zinc-900 border border-zinc-800 outline-none"
            />

            <input
              type="text"
              name="contentType"
              placeholder="Content Type"
              value={formData.contentType}
              onChange={handleChange}
              className="w-full p-4 rounded-2xl bg-zinc-900 border border-zinc-800 outline-none"
            />

            <textarea
              name="description"
              placeholder="Describe your campaign..."
              value={formData.description}
              onChange={handleChange}
              rows="5"
              className="w-full p-4 rounded-2xl bg-zinc-900 border border-zinc-800 outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 transition-all px-8 py-4 rounded-2xl font-semibold"
            >

              {loading
                ? "Generating..."
                : "Generate AI Content"}

            </button>

          </form>

        </div>

        {/* AI IMAGE GENERATION */}

<div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 mt-10">

  <h2 className="text-2xl font-bold mb-6">
    AI Image Generation
  </h2>

  <input
    type="text"
    placeholder="Describe image..."
    value={imagePrompt}
    onChange={(e) =>
      setImagePrompt(e.target.value)
    }
    className="w-full p-4 rounded-2xl bg-zinc-900 border border-zinc-800 outline-none mb-5"
  />

  <button
    onClick={handleGenerateImage}
    className="bg-purple-600 hover:bg-purple-700 transition-all px-8 py-4 rounded-2xl font-semibold"
  >

    {
      imageLoading
        ? "Generating..."
        : "Generate Image"
    }

  </button>

  {/* IMAGE */}

  {generatedImage && (

    <div className="mt-8">

      <img
        src={generatedImage}
        alt="Generated"
        className="rounded-3xl border border-zinc-800 max-w-full"
      />

      <a
        href={generatedImage}
        download="ai-image.jpg"
        className="inline-block mt-5 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-2xl"
      >
        Download Image
      </a>

    </div>

  )}

</div>


        {/* CONTENT SECTION */}

        <div>

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-2xl font-bold">
              Generated Content
            </h2>

            <p className="text-zinc-400">
              {history.length} items
            </p>

          </div>

          <div className="grid md:grid-cols-2 gap-5">

            {history.map((item) => (

              <div
                key={item._id}
                onClick={() => setSelectedContent(item)}
                className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 hover:border-blue-500 transition-all cursor-pointer"
              >

                <div className="mb-4">

                  <p className="text-zinc-400 text-sm">
                    {item.platform}
                  </p>

                  <h2 className="text-xl font-bold">
                    {item.contentType}
                  </h2>

                </div>

                <p className="text-zinc-300 whitespace-pre-wrap line-clamp-6">

                  {item.generatedContent}

                </p>

              </div>

            ))}

          </div>

        </div>

        {/* MODAL */}

{selectedContent && (

  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6">

    <div className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-4xl w-full p-8 relative max-h-[90vh] overflow-y-auto">

      {/* CLOSE BUTTON */}

      <button
        onClick={() => setSelectedContent(null)}
        className="absolute top-5 right-5 bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-xl"
      >
        Close
      </button>

      {/* HEADER */}

      <p className="text-zinc-400 mb-2">
        {selectedContent.platform}
      </p>

      <h2 className="text-3xl font-bold mb-6">
        {selectedContent.contentType}
      </h2>

      <div className="flex gap-4 mb-6">

  {/* COPY */}

  <button
    onClick={() => {

      navigator.clipboard.writeText(
        selectedContent.generatedContent
      );

      toast.success("Content copied");

    }}
    className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-2xl"
  >
    Copy Content
  </button>

  {/* PDF */}

  <button
    onClick={() =>
      exportPDF(selectedContent)
    }
    className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-2xl"
  >
    Export PDF
  </button>

</div>

      {/* CONTENT */}

      <p className="whitespace-pre-wrap text-zinc-300 leading-relaxed">

        {selectedContent.generatedContent}

      </p>

    </div>

  </div>

)}

      </div>

    </div>

  </div>
);
}

export default WorkspaceDetails;