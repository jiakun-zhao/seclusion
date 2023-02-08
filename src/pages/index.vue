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
        title: 'Ticket Number.',
        description: '迅速生成一组彩票数字。',
        icon: 'i-ph:ticket-duotone',
    },
    'guo': {
        title: '室内设计作品集.',
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
    <div class="index">
        <header>
            <h1>莘野 SECLUSION.</h1>
            <p>我的在线项目集</p>
        </header>
        <main>
            <RouterLink v-for="(i, idx) of list" :key="idx" :to="i.path">
                <div class="icon" :class="i.icon"></div>
                <div class="info">
                    <h3>{{ i.title }}</h3>
                    <p>{{ i.description }}</p>
                </div>
            </RouterLink>
        </main>
        <footer>
            ©{{ year }} Designed & Developed by <a href="https://zhaojiakun.cn">Jiakun Zhao</a>, <a href="https://beian.miit.gov.cn" target="_blank">浙ICP备2022018520号</a>.
        </footer>
    </div>
</template>

<style lang="scss">
.index {
    max-width: 36rem;
    margin: 0 auto;
    padding: 5rem 2rem;
    cursor: default;

    header p {
        margin-top: 1rem;
        color: var(--c2);
        padding-bottom: 4rem;
    }

    main {
        a {
            display: flex;
            padding: 1.2rem 1.2rem;
            margin-bottom: 1.5rem;
            border-radius: 0.3rem;
            border: 1px solid var(--b2);
        }

        .icon {
            color: var(--c2);
            font-size: 2.2rem;
        }

        .info {
            margin-left: 1.5rem;
            letter-spacing: 0.5px;

            h3 {
                color: var(--c1);
            }

            p {
                margin-top: 0.5rem;
                font-size: 0.9rem;
            }
        }
    }

    footer {
        color: var(--c2);
        margin-top: 5rem;
        font-size: 0.8rem;

        a {
            text-decoration: underline;
        }
    }
}
</style>
