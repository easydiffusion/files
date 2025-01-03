<template>
    <div class="image-editor">
        <div class="image-editor-contents">
            Image Editor<br/>
            <input v-model="v"><button @click="images.push(v)">+</button><br/>
            <textarea v-for="img in images">{{img}}</textarea>
        </div>
        <div class="image-editor-status-bar">Status</div>
    </div>
</template>

<script setup>
import {inject, reactive} from 'vue'

const config = inject('config')
config.imageEditor = {
    statusBarHeight: '24pt'
}

const images = reactive([])
const v = reactive("")
</script>

<style scoped>
.image-editor {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}
.image-editor-contents {
    flex: 1;
}
.image-editor-status-bar {
    flex: 0 0 v-bind('config.imageEditor.statusBarHeight');
    background: yellow;
}
</style>