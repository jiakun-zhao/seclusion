import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import Pages from 'vite-plugin-pages'
import { presetIcons, presetUno } from 'unocss'

import type { AcceptedPlugin } from 'postcss'
import autoprefixer from 'autoprefixer'
import postcssSorting from 'postcss-sorting'
import cssnano from 'cssnano'

function injectPostCSSPlugin(plugins: AcceptedPlugin[]): AcceptedPlugin[] {
    return process.env.NODE_ENV === 'production' ? plugins : []
}

export default defineConfig({
    plugins: [
        Vue(),
        Pages({ dirs: [{ dir: 'src/pages', baseRoute: '' }] }),
        UnoCSS({
            presets: [
                presetUno(),
                presetIcons({ scale: 1.2 }),
            ],
            rules: [
                [/^(text|bg)-(c1|s1|b1|b2)$/, ([_, name, color]) => ({ [name === 'text' ? 'color' : 'background-color']: `var(--${color})` })],
                [/^line-height-(.+)$/, match => ({ 'line-height': match[1] })],
            ],
        }),
    ],
    resolve: {
        alias: { '~': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    server: {
        host: true,
    },
    css: {
        postcss: {
            plugins: injectPostCSSPlugin([
                postcssSorting({
                    'order': ['custom-properties', 'dollar-variables', 'declarations', 'at-rules', 'rules'],
                    'properties-order': 'alphabetical',
                    'unspecified-properties-position': 'bottom',
                }),
                cssnano({ preset: 'default' }),
                autoprefixer,
            ]),
        },
    },
})
