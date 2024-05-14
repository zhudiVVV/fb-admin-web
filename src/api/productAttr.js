import request from '@/utils/request'
export function productAttributeList(cid,params) {
  return request({
    url:'/api/v1/productAttribute/list/'+cid,
    method:'get',
    params:params
  })
}

export function deleteProductAttr(data) {
  return request({
    url:'/productAttribute/delete',
    method:'post',
    data:data
  })
}

export function createProductAttr(data) {
  return request({
    url:'/api/v1/productAttribute/create',
    method:'post',
    data:data
  })
}

export function updateProductAttr(id,data) {
  return request({
    url:'/api/v1/productAttribute/update/'+id,
    method:'post',
    data:data
  })
}
export function getProductAttr(id) {
  return request({
    url:'/api/v1/productAttribute/'+id,
    method:'get'
  })
}

export function getProductAttrInfo(productCategoryId) {
  return request({
    url:'/api/v1/productAttribute/attrInfo/'+productCategoryId,
    method:'get'
  })
}
