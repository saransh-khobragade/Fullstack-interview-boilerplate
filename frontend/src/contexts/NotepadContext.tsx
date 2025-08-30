import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';

// API base URL - update this to your backend endpoint
const API_BASE_URL = 'http://localhost:3001/api';

// Note interface for type safety
interface Note {
  id?: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

// Context interface
interface NotepadContextType {
  notes: Note[];
  currentNote: string;
  loading: boolean;
  error: string | null;
  setCurrentNote: (note: string) => void;
  saveNote: () => Promise<void>;
  loadNotes: () => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  clearCurrentNote: () => void;
}

// Create context
const NotepadContext = createContext<NotepadContextType | undefined>(undefined);

// Provider component
export const NotepadProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Save note to backend
  const saveNote = async () => {
    if (!currentNote.trim()) {
      setError('Note cannot be empty');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/notes`, {
        content: currentNote
      });
      
      // Add the new note to the list
      setNotes(prev => [response.data, ...prev]);
      setCurrentNote('');
      alert('Note saved successfully!');
    } catch (err) {
      setError('Failed to save note');
      console.error('Error saving note:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load all notes from backend
  const loadNotes = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_BASE_URL}/notes`);
      setNotes(response.data);
    } catch (err) {
      setError('Failed to load notes');
      console.error('Error loading notes:', err);
    } finally {
      setLoading(false);
    }
  };

  // Delete note from backend
  const deleteNote = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      await axios.delete(`${API_BASE_URL}/notes/${id}`);
      setNotes(prev => prev.filter(note => note.id !== id));
      alert('Note deleted successfully!');
    } catch (err) {
      setError('Failed to delete note');
      console.error('Error deleting note:', err);
    } finally {
      setLoading(false);
    }
  };

  // Clear current note
  const clearCurrentNote = () => {
    setCurrentNote('');
    setError(null);
  };

  const value: NotepadContextType = {
    notes,
    currentNote,
    loading,
    error,
    setCurrentNote,
    saveNote,
    loadNotes,
    deleteNote,
    clearCurrentNote
  };

  return (
    <NotepadContext.Provider value={value}>
      {children}
    </NotepadContext.Provider>
  );
};

// Custom hook to use the context
export const useNotepad = (): NotepadContextType => {
  const context = useContext(NotepadContext);
  if (context === undefined) {
    throw new Error('useNotepad must be used within a NotepadProvider');
  }
  return context;
};
