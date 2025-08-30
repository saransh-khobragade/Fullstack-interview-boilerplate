import React from 'react';
import { Button } from '../ui/button';
import { useNotepad } from '../../contexts/NotepadContext';

// Interface for note data
interface Note {
  id?: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

// Props interface for NoteItem component
interface NoteItemProps {
  note: Note;
}

// Component for displaying individual note items
function NoteItem({ note }: NoteItemProps) {
  const { deleteNote, loading } = useNotepad();

  return (
    <div className="p-4 border border-gray-200 rounded-md">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-2">
            {note.createdAt && new Date(note.createdAt).toLocaleString()}
          </p>
          <p className="whitespace-pre-wrap">{note.content}</p>
        </div>
        <Button
          onClick={() => deleteNote(note.id!)}
          variant="destructive"
          size="sm"
          disabled={loading}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export default NoteItem;
