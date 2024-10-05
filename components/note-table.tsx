import { getNoteByUser } from "@/lib/data";
import { formatDate } from "@/lib/utils";

const NoteCards = async () => {
  const notes = await getNoteByUser();
  console.log(notes); // Debugging

  if (!notes?.length) return <h1 className="text-2xl text-center my-8">No Notes Found</h1>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {notes.map((note) => (
        <div
          key={note.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative"
        >
          {/* Label for Public/Private */}
          <span
            className={`${
              note.isPublic === "public" ? "bg-blue-100" : "bg-red-100"
            } absolute top-2 right-2 px-2 py-1 text-sm font-medium rounded`}
          >
            {note.isPublic === "public" ? "Public" : "Private"}
          </span>

          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">{note.title}</h3>
            <p className="text-gray-600 mb-4 line-clamp-2">{note.description}</p>
            <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
              <span>{formatDate(note.createdAt.toString())}</span>
              <span className="truncate ml-2">by {note.user.name}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoteCards;
