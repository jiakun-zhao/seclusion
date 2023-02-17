<script lang="ts" setup>
import { useRouter } from 'vue-router'
const year = new Date().getFullYear()
const info: Record<string, { title: string; description: string; icon: string }> = {
    'i-can-help': {
        title: '帮你百度',
        description: '应付朋友的简单问题。',
        icon: 'i-ph:magnifying-glass-duotone',
    },
    'ticket': {
        title: 'Ticket Number',
        description: '迅速生成一组彩票数字。',
        icon: 'i-ph:ticket-duotone',
    },
    'guo': {
        title: '室内设计作品集',
        description: '一个室内设计朋友的作品集。',
        icon: 'i-ph:image-duotone',
    },
}

const list = useRouter()
    .getRoutes()
    .filter(({ name }) => typeof name === 'string' && Object.keys(info).includes(name))
    .map(({ path, name }) => ({ path, ...info[name as string] }))
</script>

<template>
    <div class="cursor-default  max-w-144  mx-auto  px-8  py-20">
        <header>
            <h1>莘野 SECLUSION.</h1>
            <p class="mt-4 pb-16 text-c2">我的在线项目集</p>
        </header>
        <main>
            <RouterLink v-for="(i, idx) of list" :key="idx" class="border border-1 border-[var(--b2)] flex mb-6 p-[1.2rem] rounded-0.3rem" :to="i.path">
                <div class="text-2.2rem text-c2" :class="i.icon"></div>
                <div class="ml-6">
                    <h3 class="text-c1">{{ i.title }}</h3>
                    <p class="mt-2 text-0.9rem">{{ i.description }}</p>
                </div>
            </RouterLink>
        </main>
        <footer class="[&>a]-decoration-underline mt-20 text-0.8rem text-c2">
            ©{{ year }} Designed & Developed by <a href="https://zhaojiakun.cn">Jiakun Zhao</a>, <a href="https://beian.miit.gov.cn" target="_blank">浙ICP备2022018520号</a>.
        </footer>
    </div>
</template>
