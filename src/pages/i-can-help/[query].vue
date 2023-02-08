<script lang="ts" setup>
import { useWindowSize } from '@vueuse/core'
import { computed, onMounted, ref } from 'vue'
const { query } = defineProps<{ query: string }>()
const { height, width } = useWindowSize()
const font = computed(() => ({ fontSize: `${Math.min(width.value / 2, height.value / 3) / 1.5}px`, lineHeight: 1 }))

const baiduLogo = 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png'

const frame = ref(0)
onMounted(() => {
    setInterval(() => {
        frame.value++
        if (frame.value === 16)
            window.location.href = `https://www.baidu.com/s?wd=${encodeURIComponent(query)}`
    }, 1000)
})
</script>

<template>
    <div class="baidu-query" :style="{ height: `${height}px`, width: `${width}px` }">
        <div v-show="[3, 7, 8, 12, 13].includes(frame)" class="f">
            <img :src="baiduLogo" alt="baidu-logo" />
            <div>
                <span class="input">{{ frame > 7 ? query : '' }}</span>
                <span class="btn" :class="{ red: frame === 13 }">百度一下</span>
            </div>
            <p>本站与百度公司没有任何联系，Baidu以及本站出现的百度公司Logo是百度公司的商标。复刻自IWO.IM。</p>
        </div>
        <div class="text" :style="font">
            <p v-show="frame >= 0 && frame <= 2">首先</p>
            <p v-show="frame >= 1 && frame <= 2">打开</p>
            <p v-show="frame >= 2 && frame <= 2">百度</p>

            <p v-show="frame >= 4 && frame <= 6">然后</p>
            <p v-show="frame >= 5 && frame <= 6">输入</p>
            <p v-show="frame >= 6 && frame <= 6">内容</p>

            <p v-show="frame >= 9 && frame <= 11">然后</p>
            <p v-show="frame >= 10 && frame <= 11">点击</p>
            <p v-show="frame >= 11 && frame <= 11">按钮</p>

            <p v-show="frame === 14">懂？</p>
        </div>
    </div>
</template>

<style lang="scss">
.baidu-query {
    background: white;
    .text,
    .f {
        width: inherit;

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .f {
        height: inherit;

        img {
            width: 14rem;
            margin-top: 16vh;
        }

        div {
            flex-shrink: 0;
            width: 500px;
            max-width: calc(100% - 4rem);
            display: flex;
            align-items: center;
            border: 2px solid #556dea;
            background: #556dea;
            height: 2.5rem;
            line-height: 2.5rem;
            margin-top: 2rem;
            overflow: hidden;
            border-radius: 10px;

            .input {
                flex: 1;
                display: block;
                height: 100%;
                background: white;
                padding: 0.85rem;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            }

            .btn {
                padding: 0 1rem;
                color: white;

                &.red {
                    background-color: red;
                    border-left: 2px solid #556dea;
                }
            }
        }

        p {
            color: var(--c2);
            padding: 2rem;
            font-size: 0.75rem;
            margin-top: auto;
        }
    }

    .text {
        height: calc(100% - 10vh);
        justify-content: center;
        font-weight: bolder;
        p {
            padding: 1rem 0;
        }
    }
}
</style>
