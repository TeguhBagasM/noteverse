import { getPublicNotes } from "@/lib/data";
import { formatDate } from "@/lib/utils";

const PublicNoteCards = async () => {
  const publicNotes = await getPublicNotes();

  if (!publicNotes?.length) {
    return (
      <div className="text-center my-12 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">No Public Notes Found</h2>
        <p className="text-gray-600">Be the first to share a public note with the community!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {publicNotes.map((note) => (
        <div
          key={note.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-transform duration-300 transform hover:-translate-y-1 flex flex-col h-full"
        >
          <div className="p-6 flex-grow flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-800 line-clamp-2">{note.title}</h3>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 text-sm font-medium rounded-full whitespace-nowrap">
                Public
              </span>
            </div>
            <p className="text-gray-600 mb-4 line-clamp-4 flex-grow">{note.description}</p>
            <div className="text-sm text-gray-500 flex justify-between items-center mt-auto pt-4 border-t border-gray-200">
              <div className="flex items-center">
                <span>{formatDate(note.createdAt.toString())}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="truncate">by {note.user.name}</span>
                {note.user.role === "admin" && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 text-xs font-medium rounded-full">
                    Admin
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PublicNoteCards;
