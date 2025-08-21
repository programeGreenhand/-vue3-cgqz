<template>
    <div class="container" style="display: flex; flex-direction: column;">
      <!-- 顶部介绍 -->
      <Topbar class="Topbar"></Topbar>
      <!-- 功能区 -->
      <div class="app-container" >
          <LeftSidebar/>
          
          <Suspense>
            <template #default>
              <AsyncRightSidebar />
            </template>
            <template #fallback>
              <!-- 自定义加载状态（骨架屏） -->
              <div class="skeleton-sidebar">
                <div class="skeleton-header"></div>
                <div class="skeleton-content"></div>
                <div class="skeleton-footer"></div>
              </div>
            </template>
          </Suspense>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { defineAsyncComponent } from 'vue';
  import { ref, computed } from 'vue'
  import Topbar from '@/components/itdl/Topbar.vue'
  import LeftSidebar from '@/components/itdl/LeftSidebar.vue'

  const AsyncRightSidebar = defineAsyncComponent(() =>
  import('@/components/itdl/RightSidebar.vue')
);
  </script>
  
  <style scoped>
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

  @media screen and (max-width: 768px) {
    .Topbar{
      display: none;
    }
    .app-container{
      flex-direction: column;
    }
  }

  </style>