<!--
 * @Author: Xu Ning
 * @Date: 2023-05-08 15:29:52
 * @LastEditors: Xu Ning
 * @LastEditTime: 2023-09-07 13:39:11
 * @Description: 
 * @FilePath: \evaluation-frontend\src\App.vue
-->
<script setup lang="ts">
import { RouterView } from 'vue-router'
import { darkTheme, NConfigProvider, NLayout, NMessageProvider } from 'naive-ui'
import {ref} from 'vue'
import { lightTheme } from 'naive-ui'
import TheHeader from './components/core/TheHeader.vue'
import hljs from 'highlight.js/lib/core'
import python from 'highlight.js/lib/languages/python'



import * as echarts from 'echarts'
import { provide } from 'vue'
provide('echarts', echarts)
hljs.registerLanguage('python', python)
const theme = ref(lightTheme)

</script>

<template>
   
    <n-config-provider :theme="lightTheme" :hljs="hljs" class="root-layout">
      <n-message-provider>
        <n-layout position="absolute">
          <TheHeader />
          <RouterView />
        </n-layout>
      </n-message-provider>
    </n-config-provider>
    
</template>

<style>
@import "./assets/base.css";

#app {
  /* margin: 0 auto;
  padding: 2rem;
  font-weight: normal; */
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

.root-layout {
  height: 100%;
  width: 100%;
  opacity: 0.9;
}

.n-layout .n-layout-scroll-container{
  opacity: 0.95;
}

</style>
