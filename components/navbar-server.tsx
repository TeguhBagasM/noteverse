import { auth } from "@/auth";
import Navbar from "./navbar";

const NavbarServer = async () => {
  const session = await auth();

  return <Navbar session={session} />;
};

export default NavbarServer;
