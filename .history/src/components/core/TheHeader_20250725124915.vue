<!--
 * @Author: li.yunhao
 * @Date: 2023-04-14 13:30:12
 * @LastEditors: Xu Ning
 * @LastEditTime: 2023-06-25 11:27:29
 * @FilePath: \evaluation-frontend\src\components\core\TheHeader.vue
 * @Description: 
-->
<script setup lang="ts">
import {
  NLayoutHeader,
  NGrid,
  NGridItem,
  NButton,
  NMenu,
  NSpace,
  type MenuOption,
  NIcon,
  NAvatar,
  NPopconfirm
} from 'naive-ui'
import { BookOutline as BookIcon } from '@vicons/ionicons5'
import TextLogo from './TextLogo.vue'
import { computed, h, ref } from 'vue'
import { userStore } from '@/stores/user'
import router from '@/router'


import { ElNotification } from 'element-plus'


const username = computed(() => userStore().username)
const avatar = computed(() => userStore().avatar)

var isLoggedIn = computed(() => userStore().isLoggedIn)
const activeKey = ref<string | null>(null)

const open1 = () => {
  ElNotification({
    title: '未登录',
    message: h('i', { style: 'color: teal' }, '您尚未登录，请先登录！'),
    type: 'warning',
    duration: 3000
  });
};

const handleLogout = () => {
    userStore().logout()
    router.replace('/').then(() => {
      window.location.reload() // 确保完全清除状态
    })
}

const handleButtonClick = () => {
  console.log(isLoggedIn)
  console.log(localStorage.getItem("Is"))
  if (isLoggedIn.value) {
    handleLogout(); // 调用退出逻辑
  } else {
    open1(); // 调用未登录时的弹窗提示
  }
};


</script>

<template>
  <n-layout-header bordered class="the-header" style="display: flex; align-items: center;">
    
    <n-grid cols="24" item-responsive>
      <n-grid-item class="ui-logo" span="12">
        <TextLogo />
      </n-grid-item>

      <n-grid-item class="e" span="2" offset='0'>
        <router-link to="/">首页</router-link>
      </n-grid-item>

      <!-- 篡改检测 -->
      <n-grid-item class="a" span="2" offset='0'>
        <router-link to="/ITDL">篡改检测</router-link>
      </n-grid-item>

      <n-grid-item class="a" span="2" offset='0'>
        <router-link to="/jcls">检测历史</router-link>
      </n-grid-item>
      
      <!-- 研究成果 -->
      <n-grid-item class="c" span="2" offset='0'>
        <router-link to="/xgjs">相关技术</router-link>
      </n-grid-item>
      <!-- 关于我们 -->
      <n-grid-item class="d" span="2" offset='0'>
        <router-link to="/gywm">关于我们</router-link>
      </n-grid-item>
      
      <n-grid-item class="d" span="2" offset='0'>

        <!-- 下拉菜单 -->
        <el-dropdown trigger="hover">
          <!-- 头像 -->
          <span class="el-dropdown-link" style=" border: 2px dashed blueviolet;; ">
            <el-avatar v-if="userStore().isLoggedIn"
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            />
          </span>

          <!-- 菜单内容 -->
          <template #dropdown>

            <el-dropdown-menu>
                <el-dropdown-item>
                  <router-link to="/grzx">个人中心</router-link>
                </el-dropdown-item>

              
                <el-dropdown-item >
                
                    <n-button  @click="handleButtonClick" style="border: solid 1px green;">退出登录</n-button>
                  
                </el-dropdown-item>
            </el-dropdown-menu>

          </template>

        </el-dropdown>

       
      </n-grid-item>
      
    </n-grid>
  </n-layout-header>
</template>

<style scoped>
.the-header {
  display: grid;
  height: 6%;
  padding: 0 var(--space-md);
  align-items: center;
}

.ui-logo {
  cursor: pointer;
  display: flex;
  font-size: var( --font-size-lg);
  align-items: center;
}

.login-button {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
}

@media screen and (max-width: 600px) {
  
}

</style>
