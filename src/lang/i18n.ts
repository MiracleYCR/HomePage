import { createI18n } from 'vue-i18n'

import zhCn from './zhCn'
import zhEn from './zhEn'

export function createSSRI18n () {
  return createI18n({
    legacy: false,
    locale: 'zh',
    messages: {
      zh: zhCn,
      en: zhEn
    }
  })
}
