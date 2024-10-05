import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { z } from "zod";

const CreateNoteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  isPublic: z.enum(["on", "off"]).optional(),
});

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validatedFields = CreateNoteSchema.parse(body);

    const { title, description, isPublic } = validatedFields;

    const newNote = await prisma.note.create({
      data: {
        title,
        description,
        isPublic: isPublic === "on" ? "public" : "private",
        userId: session.user.id,
      },
    });

    return NextResponse.json({ success: true, note: newNote });
  } catch (error) {
    console.error("Failed to create note:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
