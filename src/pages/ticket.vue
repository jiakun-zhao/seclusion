<script lang="ts" setup>
import { ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'
interface History {
    is52: boolean
    nums: number[]
}

const is52 = ref(false)
const nums = ref([0, 0, 0, 0, 0, 0, 0])
const history = useLocalStorage<History[]>('ticket-history', [])

const toggle = () => {
    is52.value = !is52.value
    nums.value = [0, 0, 0, 0, 0, 0, 0]
}

const clearHistory = () => {
    history.value = []
}

const generate = async () => {
    const build = (isSave: boolean) => {
        const color = (max: number, size: number) => {
            const arr = new Set<number>()
            while (arr.size < size) arr.add(Math.floor(Math.random() * (max - 2) + 1))
            return [...arr].sort((a, b) => a - b)
        }
        nums.value = [...color(is52.value ? 35 : 33, is52.value ? 5 : 6), ...color(is52.value ? 12 : 16, is52.value ? 2 : 1)]
        if (isSave)
            history.value.push({ is52: is52.value, nums: nums.value })
    }
    const interval = setInterval(build, 40)
    await new Promise(resolve => setTimeout(resolve, 800))
    clearInterval(interval)
    build(true)
}
</script>

<template>
    <h2 class="mt-8vh text-center">Ticket Number.</h2>
    <div class="mt-16vh text-center" :is52="is52">
        <div class="box red-box">
            <span class="red">{{ nums[0] }}</span>
            <span class="red">{{ nums[1] }}</span>
            <span class="red">{{ nums[2] }}</span>
            <span class="red">{{ nums[3] }}</span>
            <span class="red">{{ nums[4] }}</span>
            <span :class="{ hide: is52 }">{{ nums[5] }}</span>
        </div>
        <div class="blue-box box">
            <span :class="{ hide: !is52 }">{{ nums[5] }}</span>
            <span class="blue">{{ nums[6] }}</span>
        </div>
    </div>
    <div class="[&>*]-mx-1 mt-12vh text-center">
        <button @click="toggle">切换</button>
        <button @click="generate">生成</button>
        <button @click="clearHistory">清除历史</button>
        <RouterLink class="btn" to="/"> 首页 </RouterLink>
    </div>
    <div class="py-12vh text-center">
        <div v-for="(i, idx) of history" :key="idx" class="history-nums mb-6">
            <span class="red">{{ i.nums[0] }}</span>
            <span class="red">{{ i.nums[1] }}</span>
            <span class="red">{{ i.nums[2] }}</span>
            <span class="red">{{ i.nums[3] }}</span>
            <span class="red">{{ i.nums[4] }}</span>
            <span :class="i.is52 ? 'blue' : 'red'">{{ i.nums[5] }}</span>
            <span class="blue">{{ i.nums[6] }}</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.box {
    display: inline-block;
    padding: 0 0.5rem;
    border-radius: 0.5rem;

    span {
        display: inline-block;
        color: white;
        transition: width 0.5s ease-in-out;
        $size: 3rem;
        width: $size;
        height: $size;
        line-height: $size;
        text-align: center;

        @media screen and (max-width: 576px) {
            $size: calc((100vw - 7rem) / 7);
            width: $size;
            height: $size;
            line-height: $size;
        }

        &.hide {
            width: 0;
            opacity: 0;
            pointer-events: none;
        }
    }
}

.red-box {
    background: rgba(255, 0, 0, 0.8);
    margin-right: 1rem;
}

.blue-box {
    background: rgba(0, 0, 255, 0.6);
}

.history-nums span {
    display: inline-block;
    margin: 0 0.25rem;
    border-radius: 50%;
    font-size: 0.85rem;
    color: white;

    $size: 2rem;
    width: $size;
    height: $size;
    line-height: $size;

    &.red {
        background: rgba(255, 0, 0, 0.8);
    }

    &.blue {
        background: rgba(0, 0, 255, 0.6);
    }
}
</style>
