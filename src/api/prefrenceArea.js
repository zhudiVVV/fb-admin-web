import request from '@/utils/request'
export function fetchList() {
  return request({
    url:'/api/v1/prefrenceArea/listAll',
    method:'get',
  })
}
