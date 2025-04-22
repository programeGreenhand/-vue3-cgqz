import { service } from "@/axios";

export function deleteUser(userName:string){
    return service({
        url: '/user/delete',
        method: 'delete',
        params:{userName}
    })
}