import { getPublicNotes } from "@/lib/data"; // Mengambil fungsi yang khusus mengambil catatan publik
import { formatDate } from "@/lib/utils";

const PublicNoteCards = async () => {
  const publicNotes = await getPublicNotes(); // Memanggil fungsi untuk catatan publik
  console.log("Public Notes in component:", publicNotes); // Cek data di komponen

  if (!publicNotes?.length) {
    return <h1 className="text-2xl text-center my-8">No Public Notes Found</h1>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {publicNotes.map((note) => (
        <div
          key={note.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">{note.title}</h3>
            <p className="text-gray-600 mb-4 line-clamp-2">{note.description}</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
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
