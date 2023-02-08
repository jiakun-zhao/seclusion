<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import raw from '~/assets/guo.images.json'
const imgs = ref<string[]>([])
const isCollection = ref(true)
try {
    const num = Number(useRoute().query.id)
    if (num >= 0 && num < raw.length) {
        imgs.value = raw[num].images.map(i => i.src)
        isCollection.value = false
    } else {
        imgs.value = raw.map(i => i.images[0].src)
    }
} catch {
    imgs.value = raw.map(i => i.images[0].src)
}
function getUrl(id: number) {
    return isCollection.value ? `${`${location.origin}/guo?id=${id}`}` : 'javascript:void(0);'
}
</script>

<template>
    <div class="guo">
        <h2>作品集.</h2>
        <RouterLink v-if="isCollection" to="/">首页</RouterLink>
        <RouterLink v-else to="/guo">返回</RouterLink>
        <div class="grid">
            <RouterLink v-for="(i, id) of imgs" :key="id" :to="getUrl(id)">
                <img :src="i" alt="Image" />
            </RouterLink>
        </div>
    </div>
</template>

<style lang="scss">
.guo {
    padding: 2rem 1rem 5rem 1rem;

    h2 {
        padding: 0 1rem;
    }

    a {
        display: block;
        padding: 1rem;
    }

    .grid {
        margin-top: 1rem;

        a {
            aspect-ratio: 1/1;
        }

        img {
            display: block;
            width: 100%;
            height: calc(100% - 2rem);
            object-fit: cover;
            border-radius: 0.3rem;
            background-color: var(--b2);
        }
    }
}
</style>
