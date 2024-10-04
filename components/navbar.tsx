import Link from "next/link";
import Image from "next/image";
import { auth, signOut } from "@/auth";

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="logo" width={36} height={36} priority />
          <span className="ml-2 text-lg font-semibold">NOTEVERSE.</span>
        </Link>
        <div className="flex items-center gap-3">
          <ul className="hidden md:flex items-center gap-4 mr-5 font-semibold text-gray-600 hover:text-gray-800">
            <li>
              <Link href="/">Home</Link>
            </li>
            {session && (
              <>
                <li>
                  <Link href="/notes">Notes</Link>
                </li>
                <li>
                  <Link href="/dashboard">Dashboard</Link>
                </li>
                {session.user.role === "admin" && (
                  <li>
                    <Link href="/user">Users</Link>
                  </li>
                )}
              </>
            )}
          </ul>

          {session && (
            <div className="flex gap-3 items-center">
              <div className="flex flex-col justify-center text-right">
                <span className="font-semibold text-gray-600 capitalize">{session.user.name}</span>
                <span className="text-xs text-gray-400 capitalize">{session.user.role}</span>
              </div>
              <button
                type="button"
                className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-gray-200"
              >
                <Image
                  src={session.user.image || "/avatar.svg"}
                  alt="avatar"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </button>
            </div>
          )}

          {session ? (
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/login" });
              }}
            >
              <button
                type="submit"
                className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-500 transition"
              >
                Sign Out
              </button>
            </form>
          ) : (
            <Link
              href="/login"
              className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-500 transition"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
