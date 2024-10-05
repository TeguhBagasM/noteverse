"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineFileText,
  AiOutlineDashboard,
  AiOutlineUser,
} from "react-icons/ai";
import { FaInfoCircle } from "react-icons/fa";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { handleSignOut } from "./navbar-actions";
import { Session } from "next-auth";
import { IoPersonCircle } from "react-icons/io5";

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
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-screen-xl flex justify-between items-center mx-auto p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="logo" width={36} height={36} priority />
          <span className="ml-2 text-lg font-semibold">NOTEVERSE.</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 items-center font-semibold text-gray-600">
          {/* <Link href="/" className="flex items-center hover:text-blue-600 transition-colors">
            <AiFillHome className="mr-2" /> Home
          </Link> */}
          {session && (
            <>
              <Link
                href="/dashboard"
                className="flex items-center hover:text-blue-600 transition-colors"
              >
                <AiOutlineDashboard className="mr-2" /> Dashboard
              </Link>
              <Link href="/about" className="flex items-center hover:text-blue-600 transition-colors">
                <FaInfoCircle className="mr-2" /> About
              </Link>
              <Link href="/notes" className="flex items-center hover:text-blue-600 transition-colors">
                <AiOutlineFileText className="mr-2" /> Notes
              </Link>
              {user?.role === "admin" && (
                <Link href="/user" className="flex items-center hover:text-blue-600 transition-colors">
                  <AiOutlineUser className="mr-2" /> Users
                </Link>
              )}
            </>
          )}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {session && (
            <div className="hidden md:flex gap-3 items-center">
              <div className="flex flex-col justify-center text-right">
                <span className="font-semibold text-gray-600 capitalize">{session.user.name}</span>
                <span className="text-xs text-gray-500 capitalize">{session.user.role}</span>
              </div>
              <button
                type="button"
                className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-gray-200 bg-gray-300 flex items-center justify-center"
              >
                {session?.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt="avatar"
                    width={68}
                    height={68}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <IoPersonCircle className="text-gray-600 w-full h-full" />
                )}
              </button>
            </div>
          )}
          {session ? (
            <form action={handleSignOut}>
              <button
                type="submit"
                className="hidden md:flex items-center bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
              >
                Sign Out
              </button>
            </form>
          ) : (
            <Link
              href="/login"
              className="hidden md:flex bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
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
            {session && (
              <li>
                <div className="flex gap-3 items-center">
                  <div className="flex flex-col justify-center text-right">
                    <span className="font-semibold text-gray-600 capitalize">{session.user.name}</span>
                    <span className="text-xs text-gray-500 capitalize">{session.user.role}</span>
                  </div>
                  <button
                    type="button"
                    className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center"
                  >
                    {session?.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt="avatar"
                        width={68}
                        height={68}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <IoPersonCircle className="text-gray-600 w-full h-full" />
                    )}
                  </button>
                </div>
              </li>
            )}
            {/* <li>
              <Link
                href="/"
                className="flex items-center text-gray-800 hover:text-blue-600 transition"
                onClick={toggleMenu}
              >
                <AiFillHome className="mr-2" /> Home
              </Link>
            </li> */}
            <li>
              <Link
                href="/about"
                className="flex items-center text-gray-800 hover:text-blue-600 transition"
                onClick={toggleMenu}
              >
                <FaInfoCircle className="mr-2" /> About
              </Link>
            </li>
            {session && (
              <>
                <li>
                  <Link
                    href="/dashboard"
                    onClick={toggleMenu}
                    className="flex items-center text-gray-800 hover:text-blue-600 transition"
                  >
                    <AiOutlineDashboard className="mr-2" /> Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/notes"
                    onClick={toggleMenu}
                    className="flex items-center text-gray-800 hover:text-blue-600 transition"
                  >
                    <AiOutlineFileText className="mr-2" /> Notes
                  </Link>
                </li>
                {user?.role === "admin" && (
                  <li>
                    <Link
                      href="/user"
                      onClick={toggleMenu}
                      className="flex items-center text-gray-800 hover:text-blue-600 transition"
                    >
                      <AiOutlineUser className="mr-2" /> Users
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
                    className="flex items-center text-red-600 hover:text-red-500 mb-4 transition"
                  >
                    <BiLogOut className="mr-2" /> Sign Out
                  </button>
                </form>
              </li>
            ) : (
              <li>
                <Link
                  href="/login"
                  className="flex items-center text-gray-800 hover:text-blue-600 mb-4 transition"
                  onClick={toggleMenu}
                >
                  <BiLogIn className="mr-2" /> Sign In
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
