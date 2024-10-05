import { FaRegLightbulb, FaRegFolderOpen, FaMobileAlt } from "react-icons/fa";

export default function About() {
  return (
    <div className="bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          About <span className="text-indigo-800">Noteverse</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Welcome to <span className="font-bold text-indigo-800">Noteverse</span>, your one-stop
          platform for creating, organizing, and sharing notes. Whether you&apos;re a student,
          professional, or creative, Noteverse helps you manage your ideas with ease, anytime and
          anywhere.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Feature 1 */}
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="mb-4">
            <FaRegLightbulb className="w-12 h-12 mx-auto text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Effortless Note Creation</h3>
          <p className="text-gray-600">
            Quickly create and organize your notes in one place with an intuitive, distraction-free
            interface.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="mb-4">
            <FaRegFolderOpen className="w-12 h-12 mx-auto text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Organized for Productivity</h3>
          <p className="text-gray-600">
            Easily categorize, search, and filter your notes to keep everything neatly organized.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="mb-4">
            <FaMobileAlt className="w-12 h-12 mx-auto text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Accessible Anywhere</h3>
          <p className="text-gray-600">
            Stay connected with your notes across all your devices, ensuring you never miss a thought.
          </p>
        </div>
      </div>

      <div className="mt-16 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Mission</h2>
        <p className="text-lg text-gray-600 mb-8">
          At <span className="font-bold text-indigo-900">Noteverse</span>, we believe in empowering
          everyone to organize their thoughts and ideas effortlessly, helping you stay on top of your
          work and life.
        </p>
      </div>
    </div>
  );
}
