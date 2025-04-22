/*
 * @FilePath: /evaluation-frontend/src/apis/register.ts
 */
import { service } from '@/axios'

export function register(
  userName: string, 
  password: string
) {
  return service({
    url: '/user/register',  // 注册端点
    method: 'post',
    
    data: {
      userName,
      password
      
    }
  })
}