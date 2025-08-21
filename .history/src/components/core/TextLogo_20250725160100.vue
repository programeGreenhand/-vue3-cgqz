<!--
 * @Author: li.yunhao
 * @Date: 2023-04-14 13:30:46
 * @LastEditors: li.yunhao li.yunhao@foxmail.com
 * @LastEditTime: 2023-04-22 10:20:12
 * @FilePath: /evaluation-frontend/src/components/core/TextLogo.vue
 * @Description: 
-->
<script setup lang="ts">
import { NGradientText } from 'naive-ui'
</script>
<template>
  <router-link to="/">
    通用文本图像篡改取证工具
  </router-link>
</template>

<style scoped>
@media  screen and (max-width: 767px) {
  .n-gradient-text{
    display: none;
  }
}
</style>
