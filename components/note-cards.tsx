import { getNoteByUser } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

const NoteCards = async () => {
  const notes = await getNoteByUser();

  if (!notes?.length) {
    return (
      <div className="text-center my-12 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">No Notes Found</h2>
        <p className="text-gray-600 mb-6">It looks like you haven&apos;t created any notes yet.</p>
        <Link
          href="/notes/new"
          className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out"
        >
          Create Your First Note
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {notes.map((note) => (
        <div
          key={note.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative flex flex-col"
        >
          <div className="p-6 flex-grow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-800 truncate flex-grow mr-2">
                {note.title}
              </h3>
              <span
                className={`${
                  note.isPublic === "public" ? "bg-blue-100 text-blue-800" : "bg-red-100 text-red-800"
                } px-2 py-1 text-xs font-medium rounded-full`}
              >
                {note.isPublic === "public" ? "Public" : "Private"}
              </span>
            </div>
            <p className="text-gray-600 mb-4 line-clamp-3">{note.description}</p>
          </div>
          <div className="bg-gray-50 px-6 py-4 text-sm text-gray-500 flex justify-between items-center">
            <span>{formatDate(note.createdAt.toString())}</span>
            <span className="truncate ml-2">by {note.user.name}</span>
          </div>
          <Link
            href={`/notes/${note.id}`}
            className="absolute inset-0 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 rounded-lg"
            aria-label={`View note: ${note.title}`}
          />
        </div>
      ))}
    </div>
  );
};

export default NoteCards;
