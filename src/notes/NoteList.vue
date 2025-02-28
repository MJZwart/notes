<template>
    <span class="flex-row">
        <CheckSquare v-if="allItemsCompleted" mt-2 @click="toggleNoteListCompleted" />
        <CheckSquareBlank v-else mt-2 @click="toggleNoteListCompleted" />
        <span v-if="!isEditing" flex-row w-full>
            <h3 :class="allItemsCompleted ? 'line-through op-70' : ''" class="pointer" @click="listExpanded = !listExpanded">
                {{ list.title }} ({{amountCompleted}}/{{notes.length}})
            </h3>
            <span class="ml-auto flex-shrink-0">
                <Edit @click="isEditing = true" />
                <Trash class="red" @click="deleteNoteList(list.id)" />
            </span>
        </span>
        <span v-else flex-row>
            <input 
                v-model="editableList.title" 
                class="note-list-input" 
                type="text" 
                placeholder="New list"
                @keyup.enter="updateNoteListTitle" />
            <Add v-if="editableList.title !== ''" :style="{fontSize: '36px'}" @click="updateNoteListTitle" />
        </span>
    </span>
    <div v-if="listExpanded" ml-3>
        <div v-for="(item, idxy) in notes" :key="idxy">
            <Note :note="item"/>
        </div>
        <span flex-row>
            <input v-model="newNote" note-input type="text" placeholder="New note" @keyup.enter="saveNote" />
            <Add v-if="newNote !== ''" :style="{fontSize: '36px'}" @click="saveNote" />
        </span>
    </div>
</template>

<script lang="ts" setup>
import type {NoteList} from './types';
import {computed, ref} from 'vue';
import {createNote, deleteNoteList, getNotesForList, toggleListCompleted, updateNoteList} from './notes';
import Note from './Note.vue';
import Add from '../assets/Add.vue';
import Trash from '../assets/Trash.vue';
import Edit from '../assets/Edit.vue';
import CheckSquare from '../assets/CheckSquare.vue';
import CheckSquareBlank from '../assets/CheckSquareBlank.vue';

const props = defineProps<{list: NoteList}>();

const notes = computed(() => getNotesForList(props.list.id));
const newNote = ref('');
const listExpanded = ref(true);
const editableList = ref({...props.list});
const isEditing = ref(false);

const allItemsCompleted = computed(() => notes.value.length > 0 && notes.value.every(item => item.completed));
const amountCompleted = computed(() => notes.value.filter(item => item.completed).length);


const saveNote = async () => {
    await createNote(newNote.value, props.list.id);
    newNote.value = '';
}

const toggleNoteListCompleted = () => {
    toggleListCompleted(props.list.id);
}

const updateNoteListTitle = () => {
    updateNoteList(editableList.value);
    isEditing.value = false;
}
</script>