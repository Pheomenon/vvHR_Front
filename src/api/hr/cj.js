import request from '@/utils/request'
export default {
    getCjList(cjQuery, current, limit) {
        return request({
            url: `/cj/search/${current}/${limit}`,
            method: 'post',
            data: cjQuery
        })
    },
    deleteCjById(id) {
        return request({
            url: `/cj/${id}`,
            method: 'delete'
        })
    },
    updateCj(cj){
        return request({
            url:`/cj`,
            method:'put',
            data:cj
        })
    },
    getCjInfo(id){
        return request({
            url: `/cj/${id}`,
            method: 'get'
        })
    },
    addCj(cj){
        return request({
            url:`/cj`,
            method:'post',
            data:cj
        })
    }
}