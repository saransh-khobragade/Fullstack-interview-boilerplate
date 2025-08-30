
import React, { useEffect } from 'react';
import { useNotepad } from '../../contexts/NotepadContext';
import NoteEditor from './NoteEditor';
import NotesList from './NotesList';

// Main notepad app component that orchestrates smaller components
function Home() {
  const { loadNotes } = useNotepad();

  // Load notes when component mounts
  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <NoteEditor />
      <NotesList />
    </div>
  );
}

export default Home;