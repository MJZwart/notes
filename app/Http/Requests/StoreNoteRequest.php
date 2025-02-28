<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreNoteRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'note' => ['required', 'string'],
            'description' => ['string', 'sometimes', 'nullable'],
            'noteListId' => ['required', 'integer', 'exists:note_lists,id'],
        ];
    }
}
