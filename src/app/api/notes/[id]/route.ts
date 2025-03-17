import { NextRequest, NextResponse } from "next/server";
import { UpdateNoteDto } from "@/models/Note";
import { deleteNote, findNoteById, updateNote } from "@/actions/noteActions";

// GET /api/notes/[id] - Get a single note by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  try {
    const note = await findNoteById(id);

    if (!note) {
      return NextResponse.json(
        {
          success: false,
          error: "Note not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: note,
    });
  } catch (error) {
    console.error(`Error fetching note ${id}:`, error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to retrieve note",
      },
      { status: 500 }
    );
  }
}

// PUT /api/notes/[id] - Update a note
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  try {
    const updateNoteDto: UpdateNoteDto = await request.json();

    // Make sure at least one field is being updated
    if (!updateNoteDto.title && !updateNoteDto.content) {
      return NextResponse.json(
        {
          success: false,
          error: "No valid fields to update",
        },
        { status: 400 }
      );
    }

    const updatedNote = await updateNote(id, updateNoteDto);

    if (!updatedNote) {
      return NextResponse.json(
        {
          success: false,
          error: "Note not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedNote,
    });
  } catch (error) {
    console.error(`Error updating note ${id}:`, error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update note",
      },
      { status: 500 }
    );
  }
}

// DELETE /api/notes/[id] - Delete a note
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  try {
    const deleted = await deleteNote(id);

    if (!deleted) {
      return NextResponse.json(
        {
          success: false,
          error: "Note not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: null,
    });
  } catch (error) {
    console.error(`Error deleting note ${id}:`, error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete note",
      },
      { status: 500 }
    );
  }
}
