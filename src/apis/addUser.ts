import { service } from "@/axios";

export function addUser(userName:string,password:string){
    return service({
        url: '/user/add',
        method: 'post',
        data:{
            userName,password
        }
    })
}