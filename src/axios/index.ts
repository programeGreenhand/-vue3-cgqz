/*
 * @Author: KWQ
 * @Date: 2023-04-14 17:08:43
 * @LastEditors: li.yunhao li.yunhao@foxmail.com
 * @LastEditTime: 2023-05-30 16:12:22
 * @FilePath: /evaluation-frontend/src/axios/index.ts
 * @Description:
 *
 */
import { computed, ref } from 'vue'
import axios, { type AxiosRequestHeaders } from 'axios'
import { createDiscreteApi, lightTheme, darkTheme, type ConfigProviderProps } from 'naive-ui'
import router from '@/router'
import { userStore } from '@/stores/user'

const baseURl = 'http://localhost:8081';
// const baseURl = '/api'

const service = axios.create({
  baseURL: baseURl,
  timeout: 15000 // 请求超时时间
})

//src\axios

// request拦截器 添加token
service.interceptors.request.use(
  (config) => {
    const token = userStore().token
    if (token) {
      const reqHeader = config.headers as AxiosRequestHeaders
      console.log(token)
      reqHeader.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// const themeRef = ref<'light' | 'dark'>('dark')
// const configProviderPropsRef = computed<ConfigProviderProps>(() => ({
//   theme: themeRef.value === 'light' ? lightTheme : darkTheme
// }))
// const { message } = createDiscreteApi(['message'], { configProviderProps: configProviderPropsRef })

// //  response拦截器
// service.interceptors.response.use((response) => {
//   if (response.data.status === 200) {
//     return response.data.data    //返回从后端请求成功的数据
//   } else if (response.data.status === 401) {
//     message.error(response.data.msg + '，请重新登录')
//     userStore().logout()
//     router.push('/login')
//     return Promise.reject()
//   } else {
//     message.error(response.data.msg)
//     return Promise.reject()   //表示错误
//   }
// })
export { service, baseURl }
