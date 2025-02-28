<template>
    <div class="form-group">
        <label :for="name">{{label}}</label>
        <input
            :id="id" 
            :class="{invalid: isInvalid, disabled: disabled}"
            :type="type" 
            :name="name" 
            :value="modelValue"
            :placeholder="placeholder" 
            :min="min"
            :max="max"
            :disabled="disabled"
            @input="updateModelValue($event)"
        />
        <div v-if="errorMsg">
            <div class="d-block invalid-feedback">{{ errorMsg }}</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import {errors} from '/js/services/errorService';

const props = defineProps({
    id: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        required: false,
        default: 'text',
    },
    name: {
        type: String,
        required: true,
    },
    modelValue: {
        required: true,
    },
    placeholder: {
        type: String,
        required: false,
    },
    label: {
        type: String,
        required: false,
    },
    min: {
        type: String,
        required: false,
    },
    max: {
        type: String,
        required: false,
    },
    disabled: {
        type: Boolean,
        required: false,
        default: false,
    },
});
const emit = defineEmits(['update:modelValue']);

const isInvalid = computed(() => !!errors.value && !!errors.value[props.name]);

const errorMsg = computed(() => {
    if (!props.name || !errors.value) {
        return '';
    }
    return (errors.value[props.name] || [])[0] || '';
});

function updateModelValue(event: Event) {
    emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<style scoped>
.disabled {
    color: grey;
    background-color: #f0f0f0;
}
</style>