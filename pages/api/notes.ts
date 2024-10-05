// pages/api/notes.ts
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next"; // Import getServerSession
import { authOptions } from "@/authOptions"; // Sesuaikan dengan file authOptions kamu
import { z } from "zod";

// Validasi schema dengan zod
const CreateNoteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  isPublic: z.enum(["on", "off"]).optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Gunakan getServerSession untuk mendapatkan session
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.id) {
    return res.status(401).json({ error: "You must be logged in to create a note" });
  }

  // Validasi form
  const validatedFields = CreateNoteSchema.safeParse(req.body);

  if (!validatedFields.success) {
    return res.status(400).json({ error: validatedFields.error.flatten().fieldErrors });
  }

  const { title, description, isPublic } = validatedFields.data;

  try {
    // Simpan note ke dalam database menggunakan Prisma
    await prisma.note.create({
      data: {
        title,
        description,
        isPublic: isPublic === "on" ? "public" : "private",
        userId: session.user.id,
      },
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Failed to create note:", error);
    return res.status(500).json({ error: "Failed to create note. Please try again." });
  }
}
