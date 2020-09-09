/* eslint-disable global-require */
import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'zh-Hans',
  messages: {
    'zh-Hans': require('./lang/zh'), // 中文语言包
    en: require('./lang/en'), // 英文语言包
  },
});

export default i18n;
