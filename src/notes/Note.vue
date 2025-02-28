<template>
    <div flex-row p-0.5 transition="all duration-0.3s ease-in-out" bg="[rgba(255,255,255,0.04)]">
        <CheckSquare v-if="note.completed" class="complete-note" @click="completeTask" />
        <CheckSquareBlank v-else min-w-6.5 @click="completeTask" />
        <div flex-col w-full :class="note.completed ? 'line-through op-70' : ''">
            <span v-if="!isEditingNote" class="pointer" @click="note.expanded = !note.expanded">
                {{ note.note }}
            </span>
            <span v-else flex-row>
                <input v-model="note.note" note-input type="text" placeholder="New note" @keyup.enter="updateNoteTitle" />
                <Add v-if="note.note !== ''" :style="{fontSize: '36px'}" @click="updateNoteTitle" />
            </span>

            <span v-if="note.expanded" class="silent">
                <span v-if="note.description && !isEditingDescription" :style="{'min-height': '2.5rem'}">
                    {{ note.description }}
                    <Edit @click="editNoteDescription" />
                </span>
                <span v-else>
                    <span flex-row>
                        <textarea 
                            v-model="note.description" 
                            note-input
                            type="text" 
                            placeholder="Add description" 
                            rows="1"
                            @keydown="isEditingDescription = true"
                            @keyup.enter="addDescription" />
                        <Add v-if="note.description !== ''" :style="{fontSize: '36px'}" @click="addDescription" />
                    </span>
                </span>
            </span>
        </div>
        <span class="ml-auto" :style="{'min-width': '4rem'}">
            <Edit @click="isEditingNote = true" />
            <Trash class="red" @click="deleteNote(note.id)" />
        </span>
    </div>
</template>

<script lang="ts" setup>
import type {Note} from './types';
import {ref} from 'vue';
import {toggleNoteCompleted, updateNote, deleteNote} from './notes';

import {watchEffect} from 'vue';
import Add from '../assets/Add.vue';
import Edit from '../assets/Edit.vue';
import Trash from '../assets/Trash.vue';
import CheckSquare from '../assets/CheckSquare.vue';
import CheckSquareBlank from '../assets/CheckSquareBlank.vue';

const props = defineProps<{note: Note}>();

const note = ref({...props.note});
const isEditingDescription = ref(false);
const isEditingNote = ref(false);

const completeTask = () => {
    toggleNoteCompleted(props.note.id);
}

const addDescription = async () => {
    await updateNote(note.value);
    isEditingDescription.value = false;
    note.value.expanded = true;
}

const editNoteDescription = () => {
    isEditingDescription.value = true;
}

const updateNoteTitle = async() => {
    await updateNote(note.value);
    isEditingNote.value = false;
}

watchEffect(() => {
    note.value = props.note
});
</script>