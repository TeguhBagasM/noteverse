import { IoLogoGoogle, IoLogoGithub } from "react-icons/io5";
import { signIn } from "@/auth";

export const GoogleButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/dashboard" });
      }}
    >
      <button
        type="submit"
        className="flex items-center justify-center gap-1 py-2.5 rounded-lg uppercase text-white font-medium text-sm bg-blue-600 hover:bg-blue-800 w-full transition-colors duration-300 ease-in-out"
      >
        <IoLogoGoogle />
        Sign In with Google
      </button>
    </form>
  );
};

export const GithubButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github", { redirectTo: "/dashboard" });
      }}
    >
      <button
        type="submit"
        className="flex items-center justify-center gap-1 py-2.5 rounded-lg uppercase text-white font-medium text-sm bg-gray-800 hover:bg-gray-600 w-full transition-colors duration-300 ease-in-out"
      >
        <IoLogoGithub />
        Sign In with Github
      </button>
    </form>
  );
};
