import request from '@/utils/request'
export default{
    uploadFile(){
        return request({
            url: `/file`,
            method: 'post',
            data: file
        })
    }
}