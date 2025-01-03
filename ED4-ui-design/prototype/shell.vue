<template>
    <div class="shell">
        <div class="shell-nav">
            <button v-for="(app, idx) in data.shell.apps" @click="newTab(idx)">{{app.name}}</button>
            <br/>
            <button v-for="(instance, idx) in data.shell.tabs" @click="data.shell.visibleTabIndex = idx">
                <b v-if="data.shell.visibleTabIndex === idx">{{instance.app.name}} {{idx}}</b>
                <span v-else>{{instance.app.name}} {{idx}}</span>
            </button>
        </div>
        <div class="shell-content" v-if="data.shell.visibleTabIndex !== null">
            <keep-alive>
                <component v-bind:is="data.shell.tabs[data.shell.visibleTabIndex].instance"></component>
            </keep-alive>
        </div>
    </div>
</template>

<script setup>
import {inject, reactive, ref} from 'vue'

const config = inject('config')
config.shell = {
    navHeight: '40pt'
}

const data = inject('data')
data.shell = {
    tabs: [],
    visibleTabIndex: null,
    apps: [{
        name: "Image Editor",
        src: "./image-editor.app.vue",
    }, {
        name: "Settings",
        src: "./settings.app.vue",
        isSingleton: true,
    }],
}

function newTab(appIdx) {
    let app = data.shell.apps[appIdx]
    if (app?.isSingleton === true) {
        for (let idx = 0; idx < data.shell.tabs.length; idx++) {
            let e = data.shell.tabs[idx]
            if (e.app.src === app.src) {
                data.shell.visibleTabIndex = idx
                return
            }
        }
    }

    let instance = getComponentDefinition(app.src)
    data.shell.tabs.push({app: app, instance: instance})
    data.shell.visibleTabIndex = data.shell.tabs.length - 1
}
</script>

<style scoped>
.shell {
    width: 100vw;
    height: 100vh;

    display: flex;
    flex-direction: column;
}
.shell-nav {
    flex: 0 0 v-bind('config.shell.navHeight');
}
.shell-content {
    flex: 1;
}
</style>