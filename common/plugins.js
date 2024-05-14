import fbApi from '@/api/index.js'

console.log('-------fbApi--------------------------------')
console.dir(fbApi)

const install = (Vue) => {
    Vue.prototype.$fbApi = fbApi
}

export default {
    install
}
