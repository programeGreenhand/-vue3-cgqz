<template>
  <div class="container">
    <div class="select">
      <el-tabs 
      v-model="activeName" 
      class="demo-tabs"
      @tab-click="handleTabClick"
    >
      <el-tab-pane 
        label="个人信息" 
        name="first"
      />
      <el-tab-pane 
        label="用户管理" 
        name="second"
      />
    </el-tabs>
    </div>

    <router-view/>
  </div>
</template>

<script setup lang="ts">


import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { TabsPaneContext } from 'element-plus' // 关键类型修正

const route = useRoute()
const router = useRouter()

const activeName = ref<'first' | 'second'>('first')

// 更健壮的路径匹配逻辑
const setActiveTab = () => {
  activeName.value = route.path.includes('usermanagement') ? 'second' : 'first'
}

// 监听路由变化
watch(() => route.path, setActiveTab, { immediate: true })

// 修正事件参数类型
const handleTabClick = (tab: TabsPaneContext) => { // 使用正确的类型
  const targetPath = tab.paneName === 'first' 
    ? '/grzx/gerenxinxi' 
    : '/grzx/usermanagement'
  
  // 添加路由跳转条件判断
  if (route.path !== targetPath) {
    router.push(targetPath)
  }
}
</script>

<style scoped>

.container{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  height: 900px;

  gap:50px
}

.select{
  width: 100%;
  height: 150px;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 50px 0 0 0;
}

</style>