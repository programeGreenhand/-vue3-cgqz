<template>
  <div class="Tips-container">
    
    
    <div class="logo">
        
    </div>

  
    <div class="tips-button">
      <el-button type="warning" @click="login" plain size="large">登录正式使用</el-button>

      
        <el-button type="primary" style="margin-left: 16px" @click="drawer = true" plain size="large">
              样例展示
        </el-button>

        <el-drawer v-model="drawer"  :with-header="false" :size="drawerWidth" >
          <testView></testView>
        </el-drawer>
    </div>

  </div>
</template>

<script lang="ts" setup>
import router from '@/router';
import { ref ,onMounted,watch } from 'vue'
import testView from '@/components/itdl/Test.vue'

const login = ()=>{
  router.push("/auth/login")
  console.log("跳转登录!!!")
}

const drawer = ref(false)

const isMobile = ref(false);
const checkDevice = () => {
  isMobile.value = window.innerWidth < 768; // 断点 768px
};

onMounted(() => {
  checkDevice();

});

// 2. 动态计算抽屉宽度
const drawerWidth = ref('30%'); // 默认 PC 端宽度
watch(isMobile, (val) => {
  drawerWidth.value = val ? '80%' : '30%'; // 手机端 80%，PC 端 30%
  console.log(drawerWidth.value)
}, { immediate: true });



</script>

<style scoped>
.Tips-container{
    width: 500px;
    height: 500px;  
    
   
}

.logo{
    width: 100%;
    height: 20%;
  
    background-image: url('@/assets/logo.jpg');
    background-size: 300px;
    background-position: center; 
     background-repeat: no-repeat; 
     opacity: 70%;
    
}



.tips-button{
    width:100%;
    height: 80%;
  
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 15px;
}


body, div {
  margin: 0;
  padding: 0;
}

/* @media  screen and (max-width: 768px) {
  .el-drawer{
    size: 80%;
  }
} */

</style>