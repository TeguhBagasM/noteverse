import NoteTable from "@/components/note-table";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notes",
};

const NotePage = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-screen-md mx-auto py-10">
        <h1 className="text-2xl font-bold">Note List</h1>
        <NoteTable />
      </div>
    </div>
  );
};

export default NotePage;
