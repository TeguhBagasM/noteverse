"use client";

import { useState } from "react";
import { updateNote } from "@/lib/note-actions";
import toast from "react-hot-toast";
import { Note } from "@/lib/types";

interface EditNoteModalProps {
  note: Note;
  onClose: () => void;
  onUpdate: (updatedNote: Note) => void;
}

const EditNoteModal: React.FC<EditNoteModalProps> = ({ note, onClose, onUpdate }) => {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append("id", note.id);
    const result = await updateNote(formData);

    if ("error" in result) {
      setError(typeof result.error === "string" ? result.error : "Failed to update note");
    } else {
      onUpdate(result.data as Note);
      toast.success("Note Updated Successfully");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h3 className="font-bold text-blue-800 text-lg mb-4">Edit Note</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label" htmlFor="title">
              <span className="label-text text-gray-600">Title</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={note.title}
              className="input input-bordered bg-gray-100"
              required
            />
          </div>
          <div className="form-control mt-4">
            <label className="label" htmlFor="description">
              <span className="label-text text-gray-600">Description</span>
            </label>
            <textarea
              id="description"
              name="description"
              defaultValue={note.description}
              className="textarea textarea-bordered bg-gray-100 h-24"
              required
            ></textarea>
          </div>
          <div className="form-control mt-4">
            <label className="label cursor-pointer">
              <span className="label-text text-gray-600">Make this note public</span>
              <input
                type="checkbox"
                name="isPublic"
                defaultChecked={note.isPublic === "public"}
                className="toggle"
              />
            </label>
          </div>
          {error && <p className="text-error mt-4">{error}</p>}
          <div className="modal-action mt-6">
            <button
              type="button"
              className="text-gray-900 bg-gray-200 font-medium rounded-lg px-5 py-2.5 text-center hover:bg-gray-300 transition-colors duration-300 ease-in-out"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-white bg-blue-700 font-medium rounded-lg px-5 py-2.5 text-center hover:bg-blue-800 transition-colors duration-300 ease-in-out"
            >
              Update Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNoteModal;
