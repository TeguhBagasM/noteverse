import { z } from "zod";

const CreateNoteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  isPublic: z.enum(["on", "off"]).optional(),
});

export async function createNote(formData: FormData) {
  try {
    const validatedFields = CreateNoteSchema.parse(Object.fromEntries(formData));

    const response = await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedFields),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to create note");
    }

    const result = await response.json();
    return { success: true, data: result.note };
  } catch (error) {
    console.error("Error creating note:", error);
    if (error instanceof z.ZodError) {
      return { error: error.errors };
    }
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An unexpected error occurred" };
  }
}

export async function deleteNote(noteId: string) {
  try {
    const response = await fetch(`/api/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json(); // Parse the error response
      console.error("Delete error data:", errorData); // Log the error response
      throw new Error(errorData.error || "Failed to delete note");
    }

    const result = await response.json();
    return { success: true, message: result.message }; // Adjust this according to your API response
  } catch (error) {
    console.error("Error deleting note:", error);
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An unexpected error occurred" };
  }
}
