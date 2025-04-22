/*
 * @Author: li.yunhao
 * @Date: 2023-04-21 23:28:30
 * @LastEditors: li.yunhao li.yunhao@foxmail.com
 * @LastEditTime: 2023-04-27 17:00:32
 * @FilePath: /evaluation-frontend/src/apis/login.ts
 * @Description:
 */
import { service } from '@/axios'
export function login(userName: string, password: string) {
  return service({
    url: '/user/login',
    method: 'post',
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // },
    data: {
      userName,
      password
    }
  })
}
