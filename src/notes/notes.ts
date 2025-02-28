import type {Note, NoteList} from './types';
import {ref} from 'vue';
import axios from 'axios';

const NOTES_API = '/api/notes';

export const notes = ref<Note[]>([]);
export const noteLists = ref<NoteList[]>([]);

export const fetchNotes = async() => {
    const {data} = await axios.get(NOTES_API);
    notes.value = data.notes;
    noteLists.value = data.noteLists;
}

export const getNotesForList = (noteListId: number): Note[] => {
    return notes.value.filter(note => note.noteListId === noteListId);
}

// Creating and updating note lists
export const createNoteList = async(noteListTitle: string): Promise<void> => {
    const {data} = await axios.post(NOTES_API + '/note-list', {title: noteListTitle});
    noteLists.value.push(data);
}
export const updateNoteList = async(noteList: NoteList) => {
    const {data} = await axios.put(NOTES_API + '/note-list/' + noteList.id, noteList);
    const idx = noteLists.value.findIndex(item => item.id === data.id);
    noteLists.value[idx] = data;
}

// Creating and updating notes
export const createNote = async(noteTitle: string, noteListId: number): Promise<void> => {
    const {data} = await axios.post(NOTES_API, {note: noteTitle, noteListId: noteListId});
    notes.value.push(data.data);
}
export const updateNote = async(note: Note) => {
    const {data} = await axios.put(NOTES_API + '/' + note.id, note);
    const idx = notes.value.findIndex(item => item.id === data.data.id);
    notes.value[idx] = data.data;
}
export const deleteNote = async(noteId: number) => {
    const confirm = window.confirm('Are you sure you wish to delete this note?');
    if (!confirm) return;
    await axios.delete(NOTES_API + '/' + noteId);
    const idx = notes.value.findIndex(item => item.id === noteId);
    notes.value.splice(idx, 1);
}

// Toggling notes as completed
export const toggleNoteCompleted = async(noteId: number) => {
    const {data} = await axios.put(NOTES_API + '/complete/' + noteId);
    const idx = notes.value.findIndex(item => item.id === data.data.id);
    notes.value[idx] = data.data;
}
export const toggleListCompleted = async(noteListId: number) => {
    const {data} = await axios.put(NOTES_API + '/note-list/complete/' + noteListId);
    notes.value = data.data;
}
export const deleteNoteList = async(noteListId: number) => {
    const confirm = window.confirm('Are you sure you wish to delete this list?');
    if (!confirm) return;
    await axios.delete(NOTES_API + '/note-list/' + noteListId);
    const idx = noteLists.value.findIndex(item => item.id === noteListId);
    noteLists.value.splice(idx, 1);
}