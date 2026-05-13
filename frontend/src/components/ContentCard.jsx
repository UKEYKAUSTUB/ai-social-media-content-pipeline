function ContentCard({
  item,
  onDelete,
  onClick,
}) {

  return (

    <div
      onClick={onClick}
      className="bg-zinc-950 border border-zinc-800 rounded-3xl p-5 cursor-pointer hover:border-blue-500 transition-all"
    >

      {/* TOP */}

      <div className="flex justify-between items-start mb-4">

        <div>

          <p className="text-zinc-400 text-sm">
            {item.platform}
          </p>

          <h2 className="text-lg font-bold text-white">
            {item.contentType}
          </h2>

        </div>

        <button
          onClick={(e) => {

            e.stopPropagation();

            onDelete(item._id);

          }}
          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-xl text-sm text-white"
        >
          Delete
        </button>

      </div>

      {/* CONTENT PREVIEW */}

      <p className="text-zinc-300 line-clamp-4 leading-relaxed">

        {item.generatedContent}

      </p>

    </div>

  );
}

export default ContentCard;