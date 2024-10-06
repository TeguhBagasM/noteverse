"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createNote } from "@/lib/note-actions";
import toast from "react-hot-toast";

const CreateNoteModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = await createNote(formData);

    if ("error" in result) {
      setError(typeof result.error === "string" ? result.error : "Failed to create note");
    } else {
      setIsOpen(false);
      setError(null);
      router.refresh();
      toast.success("Notes Created Successfully");
    }
  };
  return (
    <>
      <button
        className="text-white bg-blue-700 font-medium rounded-lg px-5 py-2.5 text-center hover:bg-blue-800 transition-colors duration-300 ease-in-out"
        onClick={() => setIsOpen(true)}
      >
        Create New Note
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="font-bold text-blue-800 text-lg mb-4">Create a New Note</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label" htmlFor="title">
                  <span className="label-text text-gray-600">Title</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="input input-bordered bg-gray-100 text-gray-600"
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
                  className="textarea textarea-bordered bg-gray-100 text-gray-600 h-24"
                  required
                ></textarea>
              </div>
              <div className="form-control mt-4">
                <label className="label cursor-pointer">
                  <span className="label-text text-gray-600">Make this note public</span>
                  <input type="checkbox" name="isPublic" className="toggle" />
                </label>
              </div>
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
                  type="submit"
                  className="text-white bg-blue-700 font-medium rounded-lg px-5 py-2.5 text-center hover:bg-blue-800 transition-colors duration-300 ease-in-out"
                >
                  Create Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateNoteModal;
