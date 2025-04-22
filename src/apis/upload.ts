import { service } from '@/axios'
export function upload(file:Blob,userName:string) {
  return service({
    url: '/images/uploaduser',
    method: 'post',
    headers: {
      'Content-Type': "Content-Type: multipart/form-data"
    },
    data: {
      file,
      userName
    }
  })
}