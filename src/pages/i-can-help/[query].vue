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
    <div class="bg-white" :style="{ height: `${height}px`, width: `${width}px` }">
        <div v-show="[3, 7, 8, 12, 13].includes(frame)" class="flex flex-col h-inherit items-center w-inherit">
            <img class="mt-16vh w-56" :src="baiduLogo" alt="baidu-logo" />
            <div class="bg-#556dea border-#556dea border-2 border-solid flex flex-shrink-0 h-10 items-center line-height-2.5rem max-w-98vw mt-8 overflow-hidden rounded-10px w-500px">
                <span class="bg-white block flex-1 h-full px-0.85rem text-black text-ellipsis text-nowrap">{{ frame > 7 ? query : '' }}</span>
                <span class="[&.red]-bg-red [&.red]-border-l-2 border-#556dea border-solid mr-[-4px] px-4 text-white" :class="{ red: frame === 13 }">百度一下</span>
            </div>
            <p class="mt-auto p-8 text-0.75rem text-c2">本站与百度公司没有任何联系，Baidu以及本站出现的百度公司Logo是百度公司的商标。复刻自IWO.IM。</p>
        </div>
        <div class="[&>p]-py-4 flex flex-col font-bold h-[90%] items-center justify-center text-black w-inherit" :style="font">
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
