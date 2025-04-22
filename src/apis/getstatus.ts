import { service } from "@/axios";

export function getstatus(){
    return service({
        url: '/user/status',
        method: 'get',
    })
}