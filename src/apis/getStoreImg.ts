import { service } from '@/axios'
export function getStoreImg(userName: string) {
  return service({
    url: '/images/getHistory',
    method: 'get',
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // },
    params: { userName }
  })
}