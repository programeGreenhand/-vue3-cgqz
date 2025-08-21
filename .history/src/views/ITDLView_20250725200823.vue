<template>
    <div style="display: flex; flex-direction: column;">
      <!-- 顶部介绍 -->
      <Topbar></Topbar>
      <!-- 功能区 -->
      <div class="app-container" >
          <LeftSidebar/>
          <RightSidebar/>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, computed, nextTick } from 'vue'
  import RightSidebar from '@/components/itdl/RightSidebar.vue'
  import Topbar from '@/components/itdl/Topbar.vue'
  import LeftSidebar from '@/components/itdl/LeftSidebar.vue'
  </script>
  
  <style >
  .app-container{
    display: flex;
    flex-direction: row;
    width: 100%;
    height: calc(100vh - 200px);
  }

  .container{
    flex: 3;
  }

  .right-sidebar{
    flex: 2;
  }

  </style>