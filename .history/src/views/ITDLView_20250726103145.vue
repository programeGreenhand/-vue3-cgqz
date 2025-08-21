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

  /* 新增骨架屏样式 */
.skeleton-sidebar {
  flex: 2;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
}
.skeleton-header {
  height: 40px;
  background: #e9ecef;
  border-radius: 4px;
  margin-bottom: 16px;
}
.skeleton-content {
  height: 300px;
  background: #e9ecef;
  border-radius: 4px;
  margin-bottom: 16px;
}
.skeleton-footer {
  height: 60px;
  background: #e9ecef;
  border-radius: 4px;
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