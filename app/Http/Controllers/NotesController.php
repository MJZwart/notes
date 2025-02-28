<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreNoteListRequest;
use App\Http\Requests\StoreNoteRequest;
use App\Http\Resources\NoteResource;
use App\Models\Note;
use App\Models\NoteList;
use Illuminate\Support\Facades\Auth;

class NotesController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        return ['notes' => NoteResource::collection($user->notes), 'noteLists' => $user->noteLists];
    }

    public function storeNote(StoreNoteRequest $request)
    {
        $validated = $request->validated();
        $validated['note_list_id'] = $validated['noteListId'];
        $validated['user_id'] = Auth::user()->id;

        return new NoteResource(Note::create($validated));
    }

    public function updateNote(StoreNoteRequest $request, Note $note)
    {
        $validated = $request->validated();

        $note->update($validated);

        return new NoteResource($note->fresh());
    }

    public function toggleComplete(Note $note)
    {
        $note->update(['completed' => !$note->completed]);

        return new NoteResource($note->fresh());
    }

    public function storeNoteList(StoreNoteListRequest $request)
    {
        $validated = $request->validated();
        $validated['user_id'] = Auth::user()->id;

        return NoteList::create($validated);
    }

    public function updateNoteList(StoreNoteListRequest $request, NoteList $noteList)
    {
        $validated = $request->validated();

        $noteList->update($validated);

        return $noteList->fresh();
    }

    public function toggleListComplete(NoteList $noteList)
    {
        $allCompleted = $noteList->notes()->where('completed', false)->doesntExist();

        $noteList->notes()->update(['completed' => !$allCompleted]);

        $user = Auth::user();

        return NoteResource::collection($user->notes);
    }

    public function deleteNote(Note $note)
    {
        $note->delete();
    }

    public function deleteNoteList(NoteList $noteList)
    {
        $noteList->notes()->delete();

        $noteList->delete();
    }
}
