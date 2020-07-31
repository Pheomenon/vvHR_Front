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
    checkEmployeeInDepartment(employee){
        return request({
            url:`/employee/checkEmployeeInDepartment`,
            method:'post',
            data:employee
        })
    },
    getEmployeeNameUseDepartment(departmentName){
        return request({
            url:`/employee/getEmployeeNameUseDepartment/${departmentName}`,
            method:'post'
        })
    },
    getEmployeeIdCardUseName(employeeName){
        return request({
            url:`/employee/getEmployeeIdCardUseName/${employeeName}`,
            method:'post'
        })
    },
    getLevelUseIdCard(idCard){
        return request({
            url: `/employee/getLevelUseIdCard/${idCard}`,
            method:'post'
        })
    }
}