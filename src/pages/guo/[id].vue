<script lang="ts" setup>
import raw from '~/assets/guo.images.json'
const { id } = defineProps<{ id: string }>()
const imgs = raw[Number(id)].images.map(i => i.src)
</script>

<template>
    <div class="guo">
        <h2>作品集.</h2>
        <RouterLink to="/guo">返回</RouterLink>
        <div class="grid">
            <a v-for="(i, idx) of imgs" :key="idx" href="javascript:void(0)">
                <img :src="i" alt="Image" />
            </a>
        </div>
    </div>
</template>
