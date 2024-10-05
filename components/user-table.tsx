import { getUsers } from "@/lib/data";

const UserTable = async () => {
  const users = await getUsers();
  if (!users?.length) return <div className="text-center text-gray-500">No Users Found</div>;

  return (
    <div className="overflow-x-auto px-4 md:px-8">
      <table className="table table-zebra w-full text-lg">
        <thead>
          <tr className="text-gray-900">
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-100 transition-colors duration-300">
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
