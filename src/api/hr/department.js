import request from '@/utils/request'
export default {
    getDepartment() {
        return request({
            url: `/department`,
            method: 'get'
        })
    },
    deleteDepartment(id){
        return request({
            url:`/department/${id}`,
            method:'delete'
        })
    },
    getDepartmentInfo(id){
        return request({
            url: `/department/${id}`,
            method: 'get'
        })
    },
    updateDepartment(department){
        return request({
            url:`/department`,
            method:'put',
            data:department
        })
    },
    addDepartment(department){
        return request({
            url:`/department`,
            method:'post',
            data:department
        })
    }
}