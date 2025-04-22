import { service } from "@/axios";

export function banUser(userName:string,status:number){
    return service({
        url: '/user/ban',
        method: 'put',
        data:{
            userName,status
        }
    })
}