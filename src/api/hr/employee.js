import request from '@/utils/request'
export default{
    getEmployeeList(employeeQuery, current, limit) {
        return request({
            url: `/employee/search/${current}/${limit}`,
            method: 'post',
            data: employeeQuery
        })
    },
    deleteEmployeeById(id) {
        return request({
            url: `/employee/${id}`,
            method: 'delete'
        })
    },
    updateEmployee(employee){
        return request({
            url:`/employee`,
            method:'put',
            data:employee
        })
    },
    getEmployeeInfo(id){
        return request({
            url: `/employee/${id}`,
            method: 'get'
        })
    },
    addEmployee(employee){
        return request({
            url:`/employee`,
            method:'post',
            data:employee
        })
    },
    importEmployeeInfo(file){
        return request({
            url:`/employee/importEmployeeInfo`,
            method:'post',
            data:file
        })
    },
    employeeExist(employeeName){
        return request({
            url:`/employee/${employeeName}`,
            method:'post'
        })
    },
}