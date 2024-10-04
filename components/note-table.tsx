import { getNoteByUser } from "@/lib/data";
import { formatDate } from "@/lib/utils";

const NoteTable = async () => {
  const notes = await getNoteByUser();
  if (!notes?.length) return <h1 className="text-2xl">No Note Found</h1>;

  return (
    <table className="w-full bg-white mt-3">
      <thead className="border-b border-gray-100">
        <tr>
          <th className="py-3 px-6 text-left text-sm">Name</th>
          <th className="py-3 px-6 text-left text-sm">Email</th>
          <th className="py-3 px-6 text-left text-sm">Created At</th>
          <th className="py-3 px-6 text-left text-sm">Created By</th>
        </tr>
      </thead>
      <tbody>
        {notes.map((note) => (
          <tr key={note.id}>
            <td className="py-3 px-6">{note.title}</td>
            <td className="py-3 px-6">{note.description}</td>
            <td className="py-3 px-6">{formatDate(note.createdAt.toString())}</td>
            <td className="py-3 px-6">{note.user.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default NoteTable;
