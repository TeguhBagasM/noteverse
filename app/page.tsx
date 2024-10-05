"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/login");
  };
  const handleNotesPublic = () => {
    router.push("/notes-public");
  };
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-10 lg:py-20">
        <div className="container flex flex-col gap-4 text-center">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black">Welcome to Noteverse</h1>
          <p className="max-w-[36rem] mx-auto text-muted-foreground sm:text-lg">
            Organize your thoughts, tasks, and ideas efficiently.
          </p>

          {/* Gambar lebih kecil */}
          <div className="relative w-56 h-56 mx-auto mt-4">
            <Image
              src="/images/hero-notes.png"
              alt="Noteverse hero image"
              layout="fill"
              objectFit="contain"
              className="rounded-lg shadow-md"
            />
          </div>

          {/* Tombol */}
          <div className="flex flex-col gap-3 justify-center sm:flex-row mt-4">
            <button
              onClick={handleGetStarted}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Get Started
            </button>
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
