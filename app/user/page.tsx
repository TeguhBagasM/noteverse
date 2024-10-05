import UserTable from "@/components/user-table";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users",
};

const UserPage = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-screen-md mx-auto py-10">
        <h2 className="text-2xl font-bold text-center mb-4 text-indigo-800">User List</h2>
        <UserTable />
      </div>
    </div>
  );
};

export default UserPage;
