<template>
  <div v-if="IsAdmin" class="user-management">
    <el-card class="management-card">
      <template #header>
        <div class="card-header">
          <span>用户管理</span>
          <el-button type="primary" @click="showAddDialog">新增用户</el-button>
        </div>
      </template>

      <el-table :data="userList" style="width: 100%" v-loading="loading">
        <el-table-column prop="username" label="用户名" width="180" />
        <el-table-column prop="passWord" label="密码" />
        <el-table-column prop="status" label="状态" width="120">
          <template #default="{ row }">
            <el-tag :type="row.status ? 'success' : 'danger'">
              {{ row.status ? '正常' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220">
          <template #default="{ row }">
            <el-button 
              size="small" 
              :type="row.status ? 'danger' : 'success'"
              @click="toggleUserStatus(row)"
              :loading="row.banLoading"
            >
              {{ row.status ? '禁用' : '启用' }}
            </el-button>
            <el-button 
              size="small" 
              type="danger" 
              @click="deleteUsers(row)"
              :loading="row.deleteLoading"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 新增用户对话框 -->
    <el-dialog v-model="addDialogVisible" title="新增用户">
      <el-form :model="newUser" :rules="formRules" ref="addFormRef">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="newUser.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="newUser.password" type="password" show-password />
        </el-form-item>
        
      </el-form>
      <template #footer>
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitAddUser">确认</el-button>
      </template>
    </el-dialog>
  </div>

  <h1 v-if="!IsAdmin">无权限查看<br>请联系管理员</h1>
</template>

<script setup lang="ts">
import { ref, onMounted ,reactive} from 'vue'
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { addUser } from '@/apis/addUser'
import {deleteUser} from '@/apis/deleteUser'
import {banUser} from '@/apis/banUser'
import {getstatus} from '@/apis/getstatus'

interface UserItem {
username: string
passWord: string
status: number      
banLoading?: boolean
deleteLoading?: boolean
}
    // status是否必须传有待商榷
const loading = ref(false)
const userList = ref<UserItem[]>([])
const addDialogVisible = ref(false)

const newUser = reactive({
username: '',
password: ''
})

const addFormRef = ref()

const IsAdmin = (localStorage.getItem('role') == 'admin')

// 表单验证规则
const formRules = {
username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

// 获取用户列表
const fetchUsers = async () => {
try {
  loading.value = true
  // const response = await axios.get('http://localhost:8082/user/status')
  const response = await getstatus()

  console.log(response.data)

  userList.value = response.data.data.map((user: any) => ({
    username:user.userName,
    passWord:user.password,
    status:user.status,
    banLoading: false,
    deleteLoading: false
  }))
} catch (error) {
  ElMessage.error('获取用户列表失败')
} finally {
  loading.value = false
}
}

// 切换用户状态
const toggleUserStatus = async (user: UserItem) => {
try {
  user.banLoading = true
  // await axios.put('http://localhost:8081/user/ban', {
  //   username: user.username,
  //   status: user.status
  // })

  await banUser(user.username,user.status)


  // user.status = !user.status
  user.status = user.status?0:1
  ElMessage.success('状态更新成功')
} catch (error) {
  ElMessage.error('操作失败')
} finally {
  user.banLoading = false
}
}

// 删除用户
const deleteUsers = (user: UserItem) => {
ElMessageBox.confirm('确认删除该用户？', '警告', {
  confirmButtonText: '确认',
  cancelButtonText: '取消',
  type: 'warning'
}).then(async () => {
  try {
    user.deleteLoading = true
    // await axios.delete('http://localhost:8082/user/delete', {
    //   params: { userName: user.username }
    // })

    const response = await deleteUser(user.username)
    

    

    userList.value = userList.value.filter(u => u.username !== user.username)
    ElMessage.success(response.data)
  } catch (error) {
    ElMessage.error('删除失败')
  } finally {
    user.deleteLoading = false
  }
})
}

// 新增用户
const showAddDialog = () => {
addDialogVisible.value = true
}

const submitAddUser = async () => {
await addFormRef.value.validate(async (valid: boolean) => {
  if (!valid) return

  console.log(newUser.username,newUser.password)
  try {
    // await axios.post('http://localhost:8082/user/add', {
    //   userName: newUser.username,
    //   password: newUser.password
    // })
    const response1 = await addUser(newUser.username,newUser.password)

    ElMessage.success(response1.data)

    addDialogVisible.value = false
    await fetchUsers()
    Object.assign(newUser, { username: '', password: '' })
  } catch (error) {
    console.log(error)
    ElMessage.error('新增失败')
  }
})
}

// 初始化数据
onMounted(() => {
fetchUsers()
})
</script>
  
  <style scoped>
  .user-management {
    padding: 20px;
    margin: 0 auto;
    border: 10px dashed blueviolet;
  }
  
  .management-card {
    max-width: 1200px;
    
  }
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .el-table {
    margin-top: 15px;
  }
  
  .el-button + .el-button {
    margin-left: 10px;
  }
  </style>@/apis/getstatus