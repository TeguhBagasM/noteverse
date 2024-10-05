import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { z } from "zod";

const CreateNoteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  isPublic: z.enum(["on", "off"]).optional(),
});

export async function createNote(formData: FormData) {
  const response = await fetch("/api/notes", {
    method: "POST",
    body: JSON.stringify(Object.fromEntries(formData)),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();

  if (!response.ok) {
    return { error: result.error || "Failed to create note" };
  }

  return { success: result.success };
}
