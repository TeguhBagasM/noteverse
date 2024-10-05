"use client";

import { useState } from "react";
import { createNote } from "@/lib/note-actions";

const CreateNoteModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = await createNote(formData);

    if ("error" in result) {
      setError(typeof result.error === "string" ? result.error : "Failed to create note");
    } else {
      setIsOpen(false);
      setError(null);
      // Optionally, you can add some success feedback here
      console.log("Note created successfully:", result.data);
    }
  };
  return (
    <>
      <button className="btn btn-primary" onClick={() => setIsOpen(true)}>
        Create New Note
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="font-bold text-lg mb-4">Create a New Note</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label" htmlFor="title">
                  <span className="label-text">Title</span>
                </label>
                <input type="text" id="title" name="title" className="input input-bordered" required />
              </div>
              <div className="form-control mt-4">
                <label className="label" htmlFor="description">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="textarea textarea-bordered h-24"
                  required
                ></textarea>
              </div>
              <div className="form-control mt-4">
                <label className="label cursor-pointer">
                  <span className="label-text">Make this note public</span>
                  <input type="checkbox" name="isPublic" className="toggle" />
                </label>
              </div>
              {error && <p className="text-error mt-4">{error}</p>}
              <div className="modal-action mt-6">
                <button type="button" className="btn" onClick={() => setIsOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
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