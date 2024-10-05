import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const getUsers = async () => {
  const session = await auth();
  if (!session || !session.user || session.user.role !== "admin") redirect("/dashboard");

  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.log(error);
  }
};

export const getNoteByUser = async () => {
  const session = await auth();
  if (!session || !session.user) redirect("/dashboard");
  const role = session.user.role;

  if (role === "admin") {
    try {
      const notes = await prisma.note.findMany({
        include: { user: { select: { name: true } } },
      });
      return notes;
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const notes = await prisma.note.findMany({
        where: { userId: session.user.id },
        include: { user: { select: { name: true } } },
      });
      return notes;
    } catch (error) {
      console.log(error);
    }
  }
};

export const getPublicNotes = async () => {
  const session = await auth();

  if (!session || !session.user) redirect("/dashboard");

  try {
    const publicNotes = await prisma.note.findMany({
      where: { isPublic: "public" },
      include: { user: { select: { name: true } } },
    });
    return publicNotes;
  } catch (error) {
    console.log("Error fetching public notes:", error);
    return [];
  }
};
