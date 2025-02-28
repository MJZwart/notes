import {defineConfig, presetWind, presetAttributify, presetTypography} from 'unocss';

export default defineConfig({
    presets: [presetWind(), presetAttributify(), presetTypography()],
    shortcuts: {
        clickable: 'text-highlight cursor-pointer',
        btn: 'bg-dark-300 shadow ml-2 mr-2 py-3 px-3.5',
        'btn-sm': 'bg-dark-300 shadow ml-2 mr-2 py-2 px-2.5',
    },
    theme: {
        colors: {
            highlight: '#646cff',
        }
    }
});