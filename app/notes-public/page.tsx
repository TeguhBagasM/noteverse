import PublicNoteCards from "@/components/note-public";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Public Notes",
};

const NotePage = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">Public Notes</h1>
          <p className="text-blue-600">Discover and explore notes</p>
        </header>

        <PublicNoteCards />
      </div>
    </div>
  );
};

export default NotePage;
