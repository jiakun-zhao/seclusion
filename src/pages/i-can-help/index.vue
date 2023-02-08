<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useClipboard } from '@vueuse/core'
import { useRouter } from 'vue-router'

const { isSupported, copy } = useClipboard()
const router = useRouter()
const query = ref('')
const url = computed(() => `${location.origin}/i-can-help/${encodeURIComponent(query.value)}`)

function checkQuery() {
    if (query.value.length === 0) {
        // eslint-disable-next-line no-alert
        alert('请输入要搜索的内容')
        return false
    }
    return true
}

function copyUrl() {
    if (!checkQuery())
        return
    copy(url.value)
    // eslint-disable-next-line no-alert
    alert(`已复制链接${url.value}`)
}

function preview() {
    if (!checkQuery())
        return
    router.push({ path: `/i-can-help/${query.value}` })
}
</script>

<template>
    <div class="baidu">
        <h2>帮你百度</h2>
        <input v-model="query" type="text" placeholder="输入要搜索的内容..." />
        <p>{{ url }}<span v-if="query.length === 0">{query}</span></p>
        <div class="btns">
            <button v-if="isSupported" @click="copyUrl">拷贝链接</button>
            <button @click="preview">浏览</button>
            <RouterLink class="btn" to="/">
                首页
            </RouterLink>
        </div>
    </div>
</template>

<style lang="scss">
.baidu {
    text-align: center;

    h2 {
        margin-top: 8vh;
    }

    input {
        margin-top: 12vh;
        width: 18rem;
        max-width: calc(100% - 4rem);
        padding: 0.5rem 0.8rem;
    }

    p{
        font-family: monospace;
        margin-top: 10vh;
        font-size: 0.75rem;
        color: var(--c2);
    }

    .btns {
        padding: 12vh 0;

        button,
        a {
            margin: 0 0.25rem;
        }
    }
}
</style>
