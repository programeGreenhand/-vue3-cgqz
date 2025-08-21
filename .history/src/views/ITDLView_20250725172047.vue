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
  }

  .container{
    width: 50%;
  }

  .right-sidebar{
    width: 50%;
  }

  </style>