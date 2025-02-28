import {defineConfig, presetWind, presetAttributify, presetTypography} from 'unocss';

export default defineConfig({
    presets: [presetWind(), presetAttributify(), presetTypography()],
    shortcuts: {
        clickable: 'text-highlight cursor-pointer',
        btn: 'bg-dark-300 shadow ml-2 mr-2 py-3 px-3.5',
        'btn-sm': 'bg-dark-300 shadow ml-2 mr-2 py-2 px-2.5',
        'note-input': 'bg-transparent b-t-none b-l-none b-r-none b-b-2 b-b-solid b-b-text-colour max-w-24rem hover:c-text-colour'
    },
    theme: {
        colors: {
            highlight: '#646cff',
            textColour: '#e9e9e9',
        }
    }
});