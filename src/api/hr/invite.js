import request from '@/utils/request'
export default {
    getInviteList(inviteQuery, current, limit) {
        return request({
            url: `/invite/search/${current}/${limit}`,
            method: 'post',
            data: inviteQuery
        })
    },
    deleteInviteById(id) {
        return request({
            url: `/invite/${id}`,
            method: 'delete'
        })
    },
    updateInvite(invite){
        return request({
            url:`/invite`,
            method:'put',
            data:invite
        })
    },
    getInviteInfo(id){
        return request({
            url: `/invite/${id}`,
            method: 'get'
        })
    },
    addInvite(invite){
        return request({
            url:`/invite`,
            method:'post',
            data:invite
        })
    },
    bind(){
        return request({
            url:`/invite/bind`,
            method:'get'
        })
    }
}