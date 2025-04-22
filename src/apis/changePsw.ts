import { service } from "@/axios";

export function changePsw(userName:string,password:string){
    return service({
        url: '/user/changePsw',
        method: 'post',
        data:{userName,password}
    })
}