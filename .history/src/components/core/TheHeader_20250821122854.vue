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
import { computed, h, ref ,onMounted,watch,onUnmounted} from 'vue'
import { userStore } from '@/stores/user'
import router from '@/router'
import { ElNotification } from 'element-plus'

const logosize = ref(12)
const linkSize = ref(2)
const offset = ref(0)

// 统一的布局更新函数
const updateLayout = () => {
  const isMobile = window.innerWidth <= 768
  
  if (isMobile) {
    logosize.value = 0  // 移动端隐藏logo
    linkSize.value = 4  // 增大链接区域
    offset.value = 0   // 设置间距
  } else {
    logosize.value = 12
    linkSize.value = 2
    offset.value = 0
  }
}

onMounted(() => {
  updateLayout()
  window.addEventListener('resize', updateLayout)
})

// 记得在组件卸载时移除监听器
onUnmounted(() => {
  window.removeEventListener('resize', updateLayout)
})


</script>

<template>
  <n-layout-header bordered class="the-header" style="display: flex; align-items: center;">
    
    <n-grid cols="24" item-responsive>
      <n-grid-item v-if="logosize > 0" class="ui-logo" :span="logosize">
        <TextLogo />
      </n-grid-item>

      <n-grid-item class="e" :span="linkSize" :offset="offset">
        <router-link to="/">首页</router-link>
      </n-grid-item>

      <n-grid-item class="a" :span="linkSize" :offset="offset">
        <router-link to="/ITDL">篡改定位</router-link>
      </n-grid-item>

      <n-grid-item class="a" :span="linkSize" :offset="offset">
        <router-link to="/jcls">检测历史</router-link>
      </n-grid-item>
      
      <!-- 研究成果 -->
      <n-grid-item class="c" :span="linkSize" :offset="offset">
        <router-link to="/xgjs">相关技术</router-link>
      </n-grid-item>
      <!-- 关于我们 -->
      <n-grid-item class="d" :span="linkSize" :offset="offset">
        <router-link to="/gywm">关于我们</router-link>
      </n-grid-item>
      
      <n-grid-item class="d" :span="2" offset='0' v-if="isLoggedIn">

        <!-- 下拉菜单 -->
        <el-dropdown trigger="hover">
          <!-- 头像 -->
          <span class="el-dropdown-link" style=" border: 2px dashed blueviolet;; ">
            <!-- <el-avatar v-if="userStore().isLoggedIn"
              src="https://api.ixiaowai.cn/api/api.php"
            /> -->
            hello
            <img src="@/assets/login.png" />
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

      <n-grid-item class="e" :span='2' offset="'0'" v-else>
        <router-link to="/auth/login">
          <img src="@/assets/head.png" class="headImg" style="max-width: 50%;">
        </router-link>
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

@media (max-width: 768px) {
    :root {
        font-size: 12px; /* 1rem = 14px */
    }

    .ui-logo{
      display: none;
    }

    .e img{
      min-width: 100%;
    }
   
   
}

</style>
