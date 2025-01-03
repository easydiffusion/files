const {createApp, ref, reactive} = Vue

const options = {
    moduleCache: {
        vue: Vue
    },
    async getFile(url) {
        const res = await fetch(url);
        if ( !res.ok )
            throw Object.assign(new Error(res.statusText + ' ' + url), { res });
        return {
            getContentData: asBinary => asBinary ? res.arrayBuffer() : res.text(),
        }
    },
    addStyle(textContent) {
        const style = Object.assign(document.createElement('style'), { textContent });
        document.head.appendChild(style);
    },
}

const { loadModule } = window['vue3-sfc-loader'];

function getComponentDefinition(path) {
    return Vue.defineAsyncComponent( () => getComponent(path) )
}

function getComponent(path) {
    return loadModule(path, options)
}