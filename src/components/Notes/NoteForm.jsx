import useNotesForm from "../../hooks/useNotesForm";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function NotesForm() {
  const { values, errors, handleChange, handleSubmit } = useNotesForm();
  const [notes, setNotes] = useLocalStorage("Notes", []);

  /**
   * The function `handleFormSubmit` validates form input, generates a new note object with a unique ID
   * and creation timestamp, and adds it to a list of notes if there are no validation errors.
   */
  const handleFormSubmit = (e) => {
    const validationErrors = handleSubmit(e);
    if (Object.keys(validationErrors).length === 0) {
      const newNote = {
        ...values,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };
      setNotes([...notes, newNote]);
      console.log(newNote)
    }
  };

  return (
    <div className="relative px-2 md:px-0 w-full flex justify-center items-center h-full">
      {/* Efecto de luz azul difuminado en el centro */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-800/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-700/15 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <header className="header-form text-center mb-8">
          <h2 className="text-3xl font-bold text-text-dark dark:text-text-light mb-4 tracking-wide">
            CREATE NOTES
          </h2>
          <p className="text-text-dark dark:text-text-light text-sm leading-relaxed">
            Complete the form to create a new note. Then you can see it in the
            notes section.
          </p>
        </header>

        <form className="notes-form space-y-6" onSubmit={handleFormSubmit}>
          {/* Campo Título */}
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-text-dark dark:text-text-light transition-colors duration-200"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={values.title}
              onChange={handleChange}
              error={errors.title}
              placeholder="Enter note title"
              className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
              required
            />
          </div>

          {/* Campo Descripción */}
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-text-dark dark:text-text-light transition-colors duration-200"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={values.description}
              onChange={handleChange}
              error={errors.description}
              placeholder="Enter note description"
              rows={4}
              className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm resize-none"
              required
            />
          </div>

          {/* Sección de Prioridad */}
          <fieldset className="space-y-3">
            <legend className="block text-sm font-medium text-text-dark dark:text-text-light mb-3">
              Priority
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <label className="relative flex items-center rounded-lg cursor-pointer transition-all duration-300 hover:bg-gray-800/30 overflow-hidden bg-black/40">
                <input
                  type="radio"
                  name="priority"
                  value="low"
                  checked={values.priority === "low"}
                  onChange={handleChange}
                  error={errors.prority}
                  className="sr-only"
                />
                <div
                  className="w-6 h-full absolute left-0 top-0"
                  style={{ backgroundColor: "#22c55e" }}
                ></div>
                <div className="flex items-center justify-center w-full py-2 pl-8 pr-2">
                  <span className="text-gray-300 font-medium text-xs">Low</span>
                </div>
              </label>

              <label className="relative flex items-center rounded-lg cursor-pointer transition-all duration-300 hover:bg-gray-800/30 overflow-hidden bg-black/40">
                <input
                  type="radio"
                  name="priority"
                  value="medium"
                  checked={values.priority === "medium"}
                  onChange={handleChange}
                  error={errors.prority}
                  className="sr-only"
                />
                <div
                  className="w-6 h-full absolute left-0 top-0"
                  style={{ backgroundColor: "#facc15" }}
                ></div>
                <div className="flex items-center justify-center w-full py-2 pl-8 pr-2">
                  <span className="text-gray-300 font-medium text-xs">
                    Medium
                  </span>
                </div>
              </label>

              <label className="relative flex items-center rounded-lg cursor-pointer transition-all duration-300 hover:bg-gray-800/30 overflow-hidden bg-black/40">
                <input
                  type="radio"
                  name="priority"
                  value="high"
                  checked={values.priority === "high"}
                  onChange={handleChange}
                  error={errors.prority}
                  className="sr-only"
                />
                <div
                  className="w-6 h-full absolute left-0 top-0"
                  style={{ backgroundColor: "#ef4444" }}
                ></div>
                <div className="flex items-center justify-center w-full py-2 pl-8 pr-2">
                  <span className="text-gray-300 font-medium text-xs">
                    High
                  </span>
                </div>
              </label>
            </div>
          </fieldset>

          {/* Botón Submit */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg transition-all duration-300 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg hover:shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Create Note
          </button>

          
          <p className="text-xs text-gray-500 dark:text-text-light text-center mt-4">
            You can see your note at Notes section
          </p>
        </form>
      </div>
    </div>
  );
}