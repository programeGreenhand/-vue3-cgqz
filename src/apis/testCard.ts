import { service } from '@/axios'
export function testCard(file:Blob) {
  return service({
    url: '/images/uploadlimit',
    method: 'post',
    headers: {
      'Content-Type': "Content-Type: multipart/form-data"
    },
    data: {
      file
    }
  })
}