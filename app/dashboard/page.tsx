import { auth } from "@/auth";
import PublicNoteCards from "@/components/note-public";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Public Notes",
  description: "View all public notes shared by our users",
};

const Dashboard = async () => {
  const session = await auth();

  return (
    <div className="bg-gradient-to-b from-slate-50 to-slate-100 min-h-screen">
      <div className="max-w-screen-lg mx-auto py-12 px-4">
        <header className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Dashboard</h1>
          <p className="text-slate-600">Discover and explore notes</p>
        </header>

        {session?.user?.name && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl text-slate-700">
              Welcome back, <span className="font-semibold">{session.user.name}</span>!
            </h2>
          </div>
        )}

        <main>
          <h3 className="text-2xl font-semibold text-slate-700 mb-6">All Public Notes</h3>
          <PublicNoteCards />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
