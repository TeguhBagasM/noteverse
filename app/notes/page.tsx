import CreateNoteModal from "@/components/create-note-moda";
import NoteCards from "@/components/note-cards";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Notes | Personal Dashboard",
  description: "View and manage your personal notes",
};

const NotePage = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="max-w-screen-xl mx-auto py-12 px-4">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-indigo-800 mb-2">My Personal Notes</h1>
          <p className="text-indigo-600">Organize your thoughts, ideas, and memories</p>
        </header>

        <main>
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <CreateNoteModal />
          </div>

          <section>
            <h3 className="text-2xl font-semibold text-indigo-800 mb-6">Your Notes</h3>
            <NoteCards />
          </section>
        </main>
      </div>
    </div>
  );
};

export default NotePage;
