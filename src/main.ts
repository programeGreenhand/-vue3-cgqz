import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Particles from 'vue3-particles';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import App from './App.vue';
import router from './router';
import './assets/main.css';
import 'element-plus/dist/index.css'; // 引入 Element Plus 的样式
import './assets/tailwind.css';

import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import VueLazyload from 'vue-lazyload';

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(Particles);
app.use(pinia);
app.use(router);

app.use(VueLazyload, {
  // 配置项
  loading: import('@/assets/avatar01.jpg'), // 加载中时显示的图片
  error: import('@/assets/avatar01.jpg'), // 加载失败时显示的图片
  preLoad: 1.3, // 预加载高度的比例
  attempt: 3 // 尝试加载次数
});

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// 修复 ElementPlus 插件注册
app.use(ElementPlus );

app.mount('#app');