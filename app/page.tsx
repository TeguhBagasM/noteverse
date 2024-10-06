"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleNotesPublic = () => {
    router.push("/notes-public");
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-slate-50 py-8">
      <div className="container flex flex-col gap-6 text-center px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-gray-800 font-extrabold leading-tight">
          Welcome to Noteverse
        </h1>
        <p className="max-w-lg mx-auto text-muted-foreground sm:text-lg text-gray-600">
          Organize your thoughts, tasks, and ideas efficiently.
        </p>

        <div className="relative w-48 h-48 mx-auto mt-4 sm:w-56 sm:h-56">
          <Image
            src="/images/hero-notes.png"
            alt="Noteverse hero image"
            layout="fill"
            objectFit="contain"
            className="rounded-lg shadow-lg"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <button
            onClick={handleNotesPublic}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            View Notes
          </button>
        </div>
      </div>
    </section>
  );
}
