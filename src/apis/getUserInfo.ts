import { service } from "@/axios";

export function getUserInfo(userName:string){
    return service({
        url: '/user/info',
        method: 'get',
        params: {userName}
    })
}