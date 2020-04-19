import request from '@/utils/request'
export default {
    getWageList(wageQuery, current, limit) {
        return request({
            url: `/wage/search/${current}/${limit}`,
            method: 'post',
            data: wageQuery
        })
    },
    deleteWageById(id) {
        return request({
            url: `/wage/${id}`,
            method: 'delete'
        })
    },
    updateWage(wage){
        return request({
            url:`/wage`,
            method:'put',
            data:wage
        })
    },
    getWageInfo(id){
        return request({
            url: `/wage/${id}`,
            method: 'get'
        })
    },
    addWage(wage){
        return request({
            url:`/wage`,
            method:'post',
            data:wage
        })
    }
}