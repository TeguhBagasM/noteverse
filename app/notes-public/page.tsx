import PublicNoteCards from "@/components/note-public";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Public Notes",
};

const NotePage = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">Public Notes</h1>
        <PublicNoteCards />
      </div>
    </div>
  );
};

export default NotePage;
