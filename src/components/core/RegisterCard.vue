<!-- RegisterCard.vue 优化版 -->
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
import { register } from '@/apis/register' // 使用注册API
import { userStore } from '@/stores/user'
import router from '@/router'

const themeRef = ref<'light' | 'dark'>('light')
const configProviderPropsRef = computed(() => ({
  theme: themeRef.value === 'light' ? lightTheme : darkTheme
}))
const { message } = createDiscreteApi(['message'], { configProviderProps: configProviderPropsRef })

// 表单状态管理
const formRef = ref<FormInst | null>(null)
const isLoading = ref(false)
const registerModel = ref({
  username: '',
  password: '',
  confirmPassword: ''
})

// 增强验证规则
const registerRules: FormRules = {
  username: [
    { 
      required: true, 
      message: '用户名不能为空',
      trigger: ['blur', 'input']
    },
    {
      min: 4,
      max: 16,
      message: '用户名长度需在4-16个字符之间',
      trigger: ['blur', 'input']
    }
  ],
  password: [
    { 
      required: true, 
      message: '密码不能为空',
      trigger: ['blur', 'input']
    },
    { 
      min: 8, 
      message: '密码长度至少8位',
      trigger: ['blur', 'input']
    },
    {
      pattern: /^(?=.*[A-Za-z])(?=.*\d).+$/,
      message: '需包含字母和数字组合',
      trigger: ['blur', 'input']
    }
  ],
  confirmPassword: [
    {
      validator: (_, value) => value === registerModel.value.password,
      message: '两次输入密码不一致',
      trigger: ['blur', 'input']
    }
  ]
}

// 优化后的注册逻辑
const doRegister = async () => {
  try {
    await formRef.value?.validate()
    
    isLoading.value = true
    
    const response = await register(
      registerModel.value.username,
      registerModel.value.password
    )

    console.log(response.data)

    // 处理注册成功
    if (response.data.code === 200) {
      message.success('注册成功，正在跳转登录...')
      
      // 自动填充用户名到登录页
      router.push({
        path: '/auth/login',
        query: { username: registerModel.value.username }
      })
    }
  } catch (error: any) {
    // 错误处理
    const errorMessage = error.response?.data?.message || '注册失败，请检查网络连接'
    
    if (error.response?.status == 502) {
      if (errorMessage.includes('username')) {
        formRef.value?.restoreValidation()
        message.error('用户名已被注册')
      }
    } else {
      message.error(errorMessage)
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="container">
    <n-card
      class="login-card"
      style="width: 400px;"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template #header>
        <TextLogo />
      </template>
      
      <n-form 
        ref="formRef" 
        :model="registerModel" 
        :rules="registerRules"
        @keyup.enter="doRegister"
      >
        <n-form-item path="username" label="用户名">
          <n-input
            v-model:value="registerModel.username"
            placeholder="请输入用户名（4-16位）"
            clearable
          />
        </n-form-item>

        <n-form-item path="password" label="密码">
          <n-input
            v-model:value="registerModel.password"
            type="password"
            placeholder="至少8位字母+数字组合"
            clearable
            show-password-on="click"
          />
        </n-form-item>

        <n-form-item path="confirmPassword" label="确认密码">
          <n-input
            v-model:value="registerModel.confirmPassword"
            type="password"
            placeholder="请再次输入密码"
            clearable
            show-password-on="click"
          />
        </n-form-item>
      </n-form>

      <template #action>
        <n-space justify="space-between" align="center">
          <n-button 
            text
            @click="router.push('/auth/login')"
          >
            已有账号？立即登录
          </n-button>
          
          <n-button 
            type="primary"
            :loading="isLoading"
            @click="doRegister"
          >
            {{ isLoading ? '注册中...' : '立即注册' }}
          </n-button>
        </n-space>
      </template>
    </n-card>
  </div>
</template>

<!-- 保持原有样式 -->

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
  background-image: url("@/assets/login-background03.jpg");
  background-size:contain;
}



</style>
