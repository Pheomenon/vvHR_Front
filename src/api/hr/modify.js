import request from '@/utils/request'
export default{
    sendVerifyCode(userForm){
        return request({
            url: `/modify/msm`,
            method: 'post',
            data: userForm
        })
    },
    checkVerifyCode(userForm){
        return request({
            url: `/modify/check`,
            method: 'post',
            data: userForm
        })
    }
}