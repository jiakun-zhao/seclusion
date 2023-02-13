<script lang="ts" setup>
import raw from '~/assets/guo.images.json'
const imgs = raw.map(i => i.images[0].src)
</script>

<template>
    <div class="guo">
        <h2>作品集.</h2>
        <RouterLink to="/">首页</RouterLink>
        <div class="grid">
            <RouterLink v-for="(i, id) of imgs" :key="id" :to="`/guo/${id}`">
                <img :src="i" alt="Image" />
            </RouterLink>
        </div>
    </div>
</template>
