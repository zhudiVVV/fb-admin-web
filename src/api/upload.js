import request from '@/utils/request'

import axios from "axios";

export function upload(params) {
    return new Promise((resolve, reject) => {
        axios.post('/minio/upload', params, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                resolve(response.data)
                // 处理响应数据
            })
            .catch(error => {
                reject(error)
            });
    })

}
