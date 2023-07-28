import CodeBlock from 'vue3-code-block'

export default defineNuxtPlugin((plugin) => {
	plugin.vueApp.use(CodeBlock)
})
