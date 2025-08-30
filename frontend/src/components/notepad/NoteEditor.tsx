import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useNotepad } from '../../contexts/NotepadContext';

// Component for note editing with textarea and action buttons
function NoteEditor() {
  const {
    currentNote,
    loading,
    error,
    setCurrentNote,
    saveNote,
    loadNotes,
    clearCurrentNote
  } = useNotepad();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notepad with Backend API</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <div className="flex gap-2">
          <Button 
            onClick={saveNote} 
            variant="default" 
            disabled={loading || !currentNote.trim()}
          >
            {loading ? 'Saving...' : 'Save Note'}
          </Button>
          <Button onClick={loadNotes} variant="outline" disabled={loading}>
            {loading ? 'Loading...' : 'Refresh Notes'}
          </Button>
          <Button onClick={clearCurrentNote} variant="destructive">
            Clear
          </Button>
        </div>
        
        <textarea
          value={currentNote}
          onChange={(e) => setCurrentNote(e.target.value)}
          placeholder="Start typing your note here..."
          className="w-full h-96 p-4 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />
      </CardContent>
    </Card>
  );
}

export default NoteEditor;
