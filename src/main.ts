import { createApp } from 'vue'

import App from './App.vue'
import router from './router/index'

import 'element-plus/dist/index.css'
import ElementPlus, { ElMessage } from 'element-plus'

import i18n from './lang/i18n'

const app = createApp(App)

app.config.globalProperties.$message = ElMessage

app.use(router)
app.use(ElementPlus)
app.use(i18n)
app.mount('#app')
