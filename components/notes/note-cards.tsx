"use client";

import { useState } from "react";
import { formatDate } from "@/lib/utils";
import EditNoteModal from "./edit-note-modal";
import DeleteNoteModal from "./delete-note-modal";
import { Note } from "@/lib/types";

type NoteCardsProps = {
  initialNotes: Note[] | undefined;
};

const NoteCards: React.FC<NoteCardsProps> = ({ initialNotes }) => {
  const [notes, setNotes] = useState<Note[]>(initialNotes || []);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [deletingNoteId, setDeletingNoteId] = useState<string | null>(null);

  if (!notes?.length) {
    return (
      <div className="text-center my-12 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">No Notes Found</h2>
        <p className="text-gray-600 mb-6">It looks like you haven&apos;t created any notes yet.</p>
      </div>
    );
  }

  const handleUpdate = (updatedNote: Note) => {
    setNotes(notes.map((note) => (note.id === updatedNote.id ? updatedNote : note)));
    setEditingNote(null);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {notes.map((note) => (
        <div
          key={note.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative flex flex-col"
        >
          <div className="bg-blue-200 px-6 py-4 text-sm text-gray-900 flex justify-end items-center">
            <button
              onClick={() => setEditingNote(note)}
              className="mr-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => setDeletingNoteId(note.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
          <div className="p-6 flex-grow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-semibold text-gray-800 truncate flex-grow mr-2">
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
            <span className="truncate ml-2">by {note.user?.name || "Unknown"}</span>
          </div>
        </div>
      ))}
      {editingNote && (
        <EditNoteModal
          note={editingNote}
          onClose={() => setEditingNote(null)}
          onUpdate={handleUpdate}
        />
      )}
      {deletingNoteId && (
        <DeleteNoteModal
          noteId={deletingNoteId}
          onClose={() => setDeletingNoteId(null)}
          onDelete={() => {
            setNotes(notes.filter((n) => n.id !== deletingNoteId));
            setDeletingNoteId(null);
          }}
        />
      )}
    </div>
  );
};

export default NoteCards;
