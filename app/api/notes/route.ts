import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { z } from "zod";

const CreateNoteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  isPublic: z.enum(["on", "off"]).optional(),
});

const UpdateNoteSchema = CreateNoteSchema.partial();

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

export async function PUT(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id, ...updateData } = body;
    const validatedFields = UpdateNoteSchema.parse(updateData);

    const existingNote = await prisma.note.findUnique({
      where: { id, userId: session.user.id },
    });

    if (!existingNote) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    const updatedNote = await prisma.note.update({
      where: { id },
      data: {
        ...validatedFields,
        isPublic: validatedFields.isPublic === "on" ? "public" : "private",
      },
    });

    return NextResponse.json({ success: true, note: updatedNote });
  } catch (error) {
    console.error("Failed to update note:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Note ID is required" }, { status: 400 });
    }

    const existingNote = await prisma.note.findUnique({
      where: { id, userId: session.user.id },
    });

    if (!existingNote) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    await prisma.note.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete note:", error);
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
