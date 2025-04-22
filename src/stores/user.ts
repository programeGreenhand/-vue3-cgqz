/*
 * @Author: li.yunhao
 * @Date: 2023-04-21 23:52:58
 * @LastEditors: li.yunhao li.yunhao@foxmail.com
 * @LastEditTime: 2023-05-19 13:26:51
 * @FilePath: /evaluation-frontend/src/stores/user.ts
 * @Description:
 */
import { defineStore } from 'pinia'
export const userStore = defineStore({
  id: 'user',
  state: () => ({
    isLoggedIn: true,
    token: '',
    avatar: '',
    username: ''
  }),
  actions: {

    async logout() {
      this.isLoggedIn = false
      this.token = ''
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('role')
    },

    async login(token: string) {
      this.isLoggedIn = true
      this.token = token
      localStorage.setItem('isLoggedIn', 'true');
      

      
    }
  },
  persist: true
})
