function NoteCard({ id, onDelete, icon, iconBg, title, description }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-300 cursor-pointer group">
      <div
        className={`note-icon w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300`}
      >
        {icon}
      </div>
      <div className="note-body">
        <h4 className="text-lg font-semibold text-gray-900 mb-2">{title}</h4>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
      <div className="button-delete">
        <button className="" onClick={onDelete(id)}>
          Delete Note
        </button>
      </div>
    </div>
  );
}

export default NoteCard;
