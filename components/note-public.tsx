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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {publicNotes.map((note) => (
        <div
          key={note.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full"
        >
          <div className="p-5 flex-grow flex flex-col">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-semibold text-gray-800 line-clamp-1">{note.title}</h3>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ml-2">
                Public
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{note.description}</p>
            <div className="text-xs text-gray-500 flex justify-between items-center mt-auto">
              <span>{formatDate(note.createdAt.toString())}</span>
              <span className="truncate ml-2">by {note.user.name}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PublicNoteCards;
