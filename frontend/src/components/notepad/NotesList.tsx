import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useNotepad } from '../../contexts/NotepadContext';
import NoteItem from './NoteItem';

// Component for displaying the list of saved notes
function NotesList() {
  const { notes } = useNotepad();

  if (notes.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Notes ({notes.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {notes.map((note) => (
            <NoteItem key={note.id} note={note} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default NotesList;
