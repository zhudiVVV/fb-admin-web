import request from '@/utils/request'
export function productCategoryList(parentId,params) {
  return request({
    url:'/api/v1/productCategory/list/'+parentId,
    method:'get',
    params
  })
}
export function deleteProductCate(id) {
  return request({
    url:'/api/v1/productCategory/delete/'+id,
    method:'post'
  })
}

export function createProductCate(data) {
  return request({
    url:'/api/v1/productCategory/create',
    method:'post',
    data:data
  })
}

export function updateProductCate(id,data) {
  return request({
    url:'/api/v1/productCategory/update/'+id,
    method:'post',
    data:data
  })
}

export function getProductCate(id) {
  return request({
    url:'/api/v1/productCategory/'+id,
    method:'get',
  })
}

// export function fetchList(parentId,params) {
//   return request({
//     url:'/api/v1/productCategory/list/'+parentId,
//     method:'get',
//     params:params
//   })
// }

export function updateShowStatus(data) {
  return request({
    url:'/productCategory/update/showStatus',
    method:'post',
    data:data
  })
}

export function updateNavStatus(data) {
  return request({
    url:'/productCategory/update/navStatus',
    method:'post',
    data:data
  })
}

export function fetchListWithChildren() {
  return request({
    url:'/api/v1/productCategory/list/withChildren',
    method:'get'
  })
}

export default {
  productCategoryList
}
