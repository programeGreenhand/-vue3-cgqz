<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  NCard,
  NForm,
  NFormItem,
  NInput,
  NSpace,
  createDiscreteApi,
  NButton,
  lightTheme,
  darkTheme,
  type FormInst,
  type FormRules,
  type ConfigProviderProps
} from 'naive-ui'
import TextLogo from './TextLogo.vue'
import { login } from '@/apis/login'
import { userStore } from '@/stores/user'
import router from '@/router'
  import { ElMessage } from 'element-plus'
import { Enter } from '@vicons/ionicons5'



const themeRef = ref<'light' | 'dark'>('light')
const configProviderPropsRef = computed<ConfigProviderProps>(() => ({
  theme: themeRef.value === 'light' ? lightTheme : darkTheme
}))
const { message } = createDiscreteApi(['message'], { configProviderProps: configProviderPropsRef })

const formRef = ref<FormInst | null>(null)
const loginModel = ref({
  username: '',
  password: ''
})
const loginRules: FormRules = {
  password: [
    {
      required: true,
      message: '请输入密码'
    }
  ]
}

const doLogin = () => {
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      // // ========== 新增模拟登录代码 ==========
      // // 开发环境模拟登录
      // if (import.meta.env.MODE === 'development') {
      //   const mockResponse = {
      //     token: 'mock-token-123',
      //     user: {
      //       avatar: 'https://pic3.zhimg.com/80/v2-6afa72220d29f045ac9b3c4847cfb3c5_720w.webp',
      //       username: loginModel.value.username || '测试用户'
      //     }
      //   }
        
      //   message.success('模拟登录成功')
      //   userStore().login(mockResponse.token, mockResponse.user.avatar, mockResponse.user.username)
      //   router.push('/ITDL')
      //   return
      // }
      // // ========== 模拟代码结束 ==========

      // 原真实登录逻辑
   
     const response = await login(loginModel.value.username, loginModel.value.password)


     

     if(response.data.code === 200){
      const token = response.data.data[1]
      console.log(response.data)
     localStorage.setItem("token",token)


     
        ElMessage.success('登陆成功！成功')
        localStorage.setItem("userName",loginModel.value.username)
        userStore().login(token)
        
        localStorage.setItem('role',response.data.data[0])
        router.push('/ITDL')
     }else if(response.data.code == 503){
      console.log(response.data.msg)
      ElMessage.error(response.data.msg)
      router.replace('/auth/login')
     }else{
    
      ElMessage.error(response.data.msg)
      router.replace('/auth/login')
     }

      
    }
  })
}
</script>

<template>
  
    
  
  <div class="container" >
    <n-card
    class="login-card"
    style="width: 400px ;"
    :bordered="false"
    size="huge"
    role="dialog"
    aria-modal="true"
    @keyup.enter="doLogin"
  >
    <template #header>
      <TextLogo />
    </template>
    <n-form ref="formRef" :model="loginModel" :rules="loginRules" >
      <n-form-item path="username" label="用户名">
        <n-input
          v-model:value="loginModel.username"
          @keydown.enter.prevent
          placeholder="请输入用户名  (admin)"
        />
      </n-form-item>
      <n-form-item path="password" label="密码" >
        <n-input
          v-model:value="loginModel.password"
          type="password"
          @keydown.enter.prevent
          placeholder="请输入密码 (admin)"
        />
      </n-form-item>
    </n-form>
    <template #action>
      <n-space justify="end" >
        <n-button @click="router.push('/auth/register')"> 注册 </n-button>
        <n-button type="primary" @click="doLogin"> 登录 </n-button>
      </n-space>
    </template>
  </n-card>
  </div>


 
  
</template>

<style scoped>
.login-card {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  

}

.container{
  width: 100%;
  height: 650px;
  background-image: url("@/assets/tech.png");
  background-size:contain;
}



</style>
