<template>
    <div>
        <div v-for="(list, idx) in noteLists" :key="idx" mb-2 border-rd-1rem p-1.75 shadow="[0_0.15rem_0.15rem_rgb(0_0_0]" bg="[rgba(255,255,255,0.02)]">
            <NoteList :list="list" />
        </div>
        <div>
            <span class="flex flex-row mt-2">
                <input 
                    v-model="newNoteList" 
                    max-w-26rem min-h-2.5rem
                    type="text" 
                    placeholder="New list"
                    @keyup.enter="saveNoteList" />
                <Add v-if="newNoteList !== ''" :style="{fontSize: '36px'}" @click="saveNoteList" />
            </span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue';
import {createNoteList, fetchNotes, noteLists} from './notes';
import NoteList from './NoteList.vue';
import Add from '../assets/Add.vue';

onMounted(() => {
    fetchNotes();
});

const newNoteList = ref('');

const saveNoteList = async() => {
    await createNoteList(newNoteList.value);
    newNoteList.value = '';
}
</script>