"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/login"); // Arahkan ke halaman 'Get Started'
  };

  const handleViewNotes = () => {
    router.push("/notes"); // Arahkan ke halaman 'View Notes'
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
          <div className="relative w-48 h-48 mx-auto mt-4">
            <Image
              src="/no-notes.png" // Pastikan gambar ini ada di folder public/images
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
              onClick={handleViewNotes}
              className="bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300"
            >
              View Notes
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
