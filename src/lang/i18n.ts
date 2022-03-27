import { createI18n } from 'vue-i18n'

import zhCn from './zhCn'
import zhEn from './zhEn'

const i18n = createI18n({
  legacy: false,
  locale: 'zh',
  messages: {
    zh: zhCn,
    en: zhEn
  }
})

export default i18n
