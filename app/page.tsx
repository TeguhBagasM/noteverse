"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleNotesPublic = () => {
    router.push("/notes-public");
  };

  return (
    <>
      <section className="flex items-center justify-center h-screen bg-slate-50">
        <div className="container flex flex-col gap-4 text-center">
          <h1 className="text-2xl sm:text-4xl md:text-5xl text-gray-800 font-black">
            Welcome to Noteverse
          </h1>
          <p className="max-w-[36rem] mx-auto text-muted-foreground sm:text-lg text-gray-600">
            Organize your thoughts, tasks, and ideas efficiently.
          </p>

          <div className="relative w-56 h-56 mx-auto mt-4">
            <Image
              src="/images/hero-notes.png"
              alt="Noteverse hero image"
              layout="fill"
              objectFit="contain"
              className="rounded-lg shadow-md"
            />
          </div>

          <div className="flex flex-col gap-3 justify-center sm:flex-row mt-4">
            <button
              onClick={handleNotesPublic}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              View Notes
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
