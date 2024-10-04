import { getUsers } from "@/lib/data";

const UserTable = async () => {
  const users = await getUsers();
  if (!users?.length) return <h1 className="text-2xl text-center mt-5">No Users Found</h1>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white mt-3 border-collapse shadow-sm">
        <thead className="bg-blue-500 text-gray-100 border-b border-gray-200">
          <tr>
            <th className="py-3 px-6 text-left text-sm font-semibold">Name</th>
            <th className="py-3 px-6 text-left text-sm font-semibold">Email</th>
            <th className="py-3 px-6 text-left text-sm font-semibold">Role</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="py-3 px-6 text-sm text-gray-900 whitespace-nowrap">{user.name}</td>
              <td className="py-3 px-6 text-sm text-gray-900 whitespace-nowrap">{user.email}</td>
              <td className="py-3 px-6 text-sm text-gray-900 whitespace-nowrap">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
