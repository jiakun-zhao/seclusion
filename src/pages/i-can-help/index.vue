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
    <div class="text-center">
        <h2 class="mt-8vh">帮你百度</h2>
        <input v-model="query" class="max-w-98vw mt-12vh px-3.2 py-2 w-72" type="text" placeholder="输入要搜索的内容..." />
        <p class="font-mono mt-10vh text-3 text-c2">{{ url }}<span v-if="query.length === 0">{query}</span></p>
        <div class="[&>a]-mx-1 [&>button]-mx-1 py-12vh">
            <button v-if="isSupported" @click="copyUrl">拷贝链接</button>
            <button @click="preview">浏览</button>
            <RouterLink class="btn" to="/">
                首页
            </RouterLink>
        </div>
    </div>
</template>
