"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteNote } from "@/lib/note-actions"; // Make sure to have a deleteNote function
import toast from "react-hot-toast";

interface DeleteNoteModalProps {
  note: string; // Add the note prop to identify which note to delete
}

const DeleteNoteModal: React.FC<DeleteNoteModalProps> = ({ note }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    const result = await deleteNote(note);

    if ("error" in result) {
      setError(typeof result.error === "string" ? result.error : "Failed to delete note");
    } else {
      setIsOpen(false);
      setError(null);
      router.refresh();
      toast.success("Note Deleted Successfully");
    }
  };

  return (
    <>
      <button
        className="text-white bg-red-700 font-medium rounded-lg px-5 py-2.5 text-center hover:bg-red-800 transition-colors duration-300 ease-in-out"
        onClick={() => setIsOpen(true)}
      >
        Delete Note
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="font-bold text-red-800 text-lg mb-4">Delete Note</h3>
            <p className="text-gray-600">Are you sure you want to delete this note?</p>
            {error && <p className="text-error mt-4">{error}</p>}
            <div className="modal-action mt-6">
              <button
                type="button"
                className="text-gray-900 bg-gray-200 font-medium rounded-lg px-5 py-2.5 text-center hover:bg-gray-300 transition-colors duration-300 ease-in-out"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="text-white bg-red-700 font-medium rounded-lg px-5 py-2.5 text-center hover:bg-red-800 transition-colors duration-300 ease-in-out"
                onClick={handleDelete}
              >
                Delete Note
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteNoteModal;
