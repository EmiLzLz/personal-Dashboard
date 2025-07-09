import { Search, BookOpen, StickyNote } from "lucide-react";
import NoteCard from "./NoteCard";
import useLocalStorage from "../../hooks/useLocalStorage";

function NotesList() {
  const [notes, setNotes] = useLocalStorage("Notes", []);

  const handleDelete = (id) => {
    const notesUpdate = notes.filter((note) => note.id != id);
    setNotes(notesUpdate);
  };

  return (
    <>
      <div className="note-list-container w-10/12 mx-auto flex flex-col items-center justify-center min-h-screen sm:h-screen px-6 py-14 relative bg-white">
        {/* Fondo radial púrpura */}
        <div className="absolute inset-0 radial-purple-bg pointer-events-none"></div>

        <div className="header-section text-center mb-8 relative z-10">
          <div className="main-icon w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <div className="title-description">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              Welcome Royal,
            </h1>
            <p className="text-lg text-gray-500">
              What I can help you discover?
            </p>
          </div>
        </div>

        <div className="searchbar mb-8 relative z-10 w-full">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search in your notes"
              className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-full border-none outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-all duration-300 text-gray-700 placeholder-gray-400 shadow-sm"
            />
          </div>
        </div>

        <div className="notes-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              id={note.id}
              icon={<StickyNote className="w-6 h-6 text-white" />}
              iconBg="bg-blue-500"
              title={note.title}
              description={note.description}
              onDelete = {handleDelete}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default NotesList;
