function NoteCard({ id, onDelete, icon, title, description, priority }) {
  const getPriorityColor = (level) => {
    switch (level) {
      case "low":
        return "bg-[#53a548]";
      case "medium":
        return "bg-[#f0c808]";
      case "high":
        return "bg-[#e2294f]";
      default:
        return "bg-[#9ca3af]";
    }
  };
  return (
    <div
      key={id}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-300 cursor-pointer group w-full sm:w-auto"
    >
      <div
        className={`note-icon w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300 ${getPriorityColor(
          priority
        )}`}
      >
        {icon}
      </div>
      <div className="note-body">
        <h4 className="text-lg font-semibold text-gray-900 mb-2 break-words">
          {title}
        </h4>
        <p className="text-gray-600 leading-relaxed break-words">
          {description}
        </p>
      </div>
      <div className="button-delete">
        <button
          className="top-2 right-2 text-red-400 hover:text-red-600 text-sm"
          onClick={() => onDelete(id)}
        >
          Delete Note
        </button>
      </div>
    </div>
  );
}

export default NoteCard;
