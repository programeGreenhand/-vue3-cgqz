<template>
    <div class="profile-container">
      <el-card class="profile-card">
        <!-- 卡片头部（带装饰性图标） -->
        <template #header>
          <div class="card-header">
            <el-icon :size="28" color="#409EFC"><UserFilled /></el-icon>
            <span class="title">个人信息</span>
          </div>
        </template>
  
        <!-- 主体内容 -->
        <div class="content-wrapper">
          <!-- 左侧装饰图形 -->
          <div class="graphic-section">
            <img 
              src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" 
              class="security-img"
            />
          </div>
  
          <!-- 信息展示区域 -->
          <el-descriptions 
            class="info-section"
            :column="1" 
            border
            label-align="right"
            label-size="large"
          >
            <el-descriptions-item 
              label="账号" 
              label-class-name="custom-label"
            >
              <div class="info-content">
                <el-icon><User /></el-icon>
                <span class="text">{{ userInfo.username }}</span>
              </div>
            </el-descriptions-item>
  
            <el-descriptions-item 
              label="密码" 
              label-class-name="custom-label"
            >
              <div class="info-content">
                <el-icon><Lock /></el-icon>
                <span class="text">{{ userInfo.password }}</span>
                <el-button 
                  type="primary" 
                  link
                  @click="showPasswordDialog"
                >
                  修改密码
                </el-button>
              </div>
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </el-card>
  
      <!-- 修改密码对话框 -->
      <el-dialog 
        v-model="dialogVisible" 
        title="修改密码" 
        width="30%"
      >
        <el-form
          :model="passwordForm"
         
          ref="passwordFormRef"
          label-width="100px"
        >
          <el-form-item label="新密码" prop="newPassword">
            <el-input 
              v-model="passwordForm.newPassword" 
              type="password" 
              show-password
            />
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input 
              v-model="passwordForm.confirmPassword" 
              type="password" 
              show-password
            />
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitPassword">确认</el-button>
        </template>
      </el-dialog>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue'
  import axios from 'axios'
  import { 
    UserFilled, 
    User, 
    Lock 
  } from '@element-plus/icons-vue'
  import type { FormInstance, FormRules } from 'element-plus'
  import { ElMessage } from 'element-plus'
  import { getUserInfo } from '@/apis/getUserInfo'
  import { changePsw } from '@/apis/changePsw'
  
  // 用户信息数据
  const userInfo = reactive({
    username: '',
    password: ''
  })
  
  // 获取用户信息
  const fetchUserInfo = async () => {
    try {
      // 从本地存储获取当前登录用户名（根据实际登录逻辑调整）
      //http://172.22.121.29:8081/user/info
      const userName1 = localStorage.getItem("userName") ||'admin'
      // const response = await axios.get('http://localhost:8082/user/info', {
      //   params: { userName }
      // })
      const response = await getUserInfo(userName1)
      
      // 假设接口返回字段为 userName 和 Password
      console.log(response)
      userInfo.username = response.data.data.userName
      userInfo.password = response.data.data.password

    } catch (error) {
      ElMessage.error('获取用户信息失败')
      console.error('API Error:', error)
    }
  }
  
  // 组件挂载时获取数据
  onMounted(() => {
    fetchUserInfo()
  })
  
  // 密码修改相关
  const dialogVisible = ref(false)
  const passwordFormRef = ref<FormInstance>()
  const passwordForm = reactive({
    newPassword: '',
    confirmPassword: ''
  })
  
  // 验证规则保持不变...
  
  const showPasswordDialog = () => {
    dialogVisible.value = true
  }
  
  const submitPassword = async () => {
    passwordFormRef.value?.validate(async (valid) => {
      if (!valid) return
  
      try {
        // const response=  await axios.post('http://localhost:8081/user/changePsw', {
        //   userName: userInfo.username,
        //   password: passwordForm.newPassword
        // })
        const response = await changePsw(userInfo.username,passwordForm.newPassword)
        
        ElMessage.success(response.data)
        dialogVisible.value = false
        // 清空表单
        passwordForm.newPassword = ''
        passwordForm.confirmPassword = ''
      } catch (error) {
        ElMessage.error('密码修改失败')
        console.error('API Error:', error)
      }
    })
  }
  </script>
  
  <style scoped>
  .profile-container {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
    border: 10px dashed blueviolet;
  }
  
  .profile-card {
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .card-header {
    display: flex;
    align-items: center;
    gap: 12px;
    .title {
      font-size: 1.4rem;
      font-weight: 500;
      color: #303133;
    }
  }
  
  .content-wrapper {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 30px;
    padding: 20px;
  }
  
  .graphic-section {
    display: flex;
    align-items: center;
    justify-content: center;
    .security-img {
      width: 80%;
      opacity: 0.8;
      filter: grayscale(30%);
    }
  }
  
  .info-section {
    :deep(.custom-label) {
      width: 100px;
      font-weight: 500;
      color: #606266;
    }
    
    .info-content {
      display: flex;
      align-items: center;
      gap: 10px;
      .el-icon {
        color: #409EFF;
        font-size: 1.1rem;
      }
      .text {
        font-size: 1rem;
        color: #303133;
      }
    }
  }
  
  .el-form-item {
    margin-bottom: 22px;
  }
  </style>