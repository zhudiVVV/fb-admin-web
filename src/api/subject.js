import request from '@/utils/request'
export function fetchListAll() {
  return request({
    url:'/api/v1/subject/listAll',
    method:'get',
  })
}

export function fetchList(params) {
  return request({
    url:'/subject/list',
    method:'get',
    params:params
  })
}
