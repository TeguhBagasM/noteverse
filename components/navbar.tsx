"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineMenu, AiOutlineClose, AiFillHome } from "react-icons/ai";
import { FaInfoCircle } from "react-icons/fa";
import { RiUserFill } from "react-icons/ri";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { handleSignOut } from "./navbar-actions";
import { Session } from "next-auth";

interface NavbarProps {
  session: Session | null;
}

interface User {
  name?: string | null;
  role?: string;
}

const Navbar: React.FC<NavbarProps> = ({ session }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const user = session?.user as User | undefined;

  return (
    <header className="bg-white border-b border-gray-200 dark:bg-gray-950 dark:text-white">
      <div className="max-w-screen-xl flex justify-between items-center mx-auto p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="logo" width={36} height={36} priority />
          <span className="ml-2 text-lg font-semibold">NOTEVERSE.</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 items-center font-semibold text-gray-600 dark:text-gray-200">
          <Link href="/" className="flex items-center hover:text-violet-600 transition-colors">
            <AiFillHome className="mr-2" /> Home
          </Link>
          {session && (
            <>
              <Link href="/notes" className="hover:text-violet-600 transition-colors">
                Notes
              </Link>
              <Link href="/dashboard" className="hover:text-violet-600 transition-colors">
                Dashboard
              </Link>
              {user?.role === "admin" && (
                <Link href="/user" className="hover:text-violet-600 transition-colors">
                  Users
                </Link>
              )}
            </>
          )}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {session && (
            <div className="hidden md:flex items-center gap-2">
              <span className="flex items-center bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded-lg text-violet-600">
                <RiUserFill className="mr-1" /> {user?.name}
              </span>
            </div>
          )}
          {session ? (
            <form action={handleSignOut}>
              <button
                type="submit"
                className="hidden md:flex items-center bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-500 transition"
              >
                Sign Out
              </button>
            </form>
          ) : (
            <Link
              href="/login"
              className="hidden md:flex bg-violet-600 text-white px-4 py-2 rounded-md hover:bg-violet-700"
            >
              Sign In
            </Link>
          )}

          <div className="md:hidden">
            {isMenuOpen ? (
              <AiOutlineClose onClick={toggleMenu} className="text-2xl cursor-pointer" />
            ) : (
              <AiOutlineMenu onClick={toggleMenu} className="text-2xl cursor-pointer" />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden mt-4">
          <ul className="flex flex-col gap-4 px-4">
            <li>
              <Link
                href="/"
                className="flex items-center text-gray-800 dark:text-gray-200"
                onClick={toggleMenu}
              >
                <AiFillHome className="mr-2" /> Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="flex items-center text-gray-800 dark:text-gray-200"
                onClick={toggleMenu}
              >
                <FaInfoCircle className="mr-2" /> About
              </Link>
            </li>
            {session && (
              <>
                <li>
                  <Link
                    href="/notes"
                    onClick={toggleMenu}
                    className="text-gray-800 dark:text-gray-200"
                  >
                    Notes
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard"
                    onClick={toggleMenu}
                    className="text-gray-800 dark:text-gray-200"
                  >
                    Dashboard
                  </Link>
                </li>
                {user?.role === "admin" && (
                  <li>
                    <Link
                      href="/user"
                      onClick={toggleMenu}
                      className="text-gray-800 dark:text-gray-200"
                    >
                      Users
                    </Link>
                  </li>
                )}
              </>
            )}
            {session ? (
              <li>
                <form action={handleSignOut}>
                  <button
                    type="submit"
                    className="flex items-center text-red-600"
                    onClick={toggleMenu}
                  >
                    <BiLogOut className="mr-2" /> Logout
                  </button>
                </form>
              </li>
            ) : (
              <li>
                <Link
                  href="/login"
                  className="flex items-center text-gray-800 dark:text-gray-200"
                  onClick={toggleMenu}
                >
                  <BiLogIn className="mr-2" /> Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
