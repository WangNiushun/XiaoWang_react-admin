// 导入发送异步请求的request方法. 项目中所有异步请求都是调用 request方法实现的
// 本事就是对 axios的二次封装
import request from "@utils/request";

// 定义基础路径
const BASE_URL = "/admin/edu/subject";

// 假设本地服务器接口没写完,使用mock
// const MOCK_URL = `http://localhost:8888${BASE_URL}`

// 获取一级分类课程
export function reqGetSubject(page,limit) {
  return request({
    // 注意: 如果url地址只写了路径,回被项目中配置的 proxy拦截,然后将本地服务器的主机名拼接上去
    // 我们现在假设后台接口,没有完成,我们要使用mock服务器,应该将mock服务的主机名直接写在url地址里
    url: `${BASE_URL}/${page}/${limit}/`, 
    method: "GET",
  });
}

// 获取二级课程分类
export function reqGetSecSubject(parentId) {
  return request({
    // 注意: 如果url地址只写了路径,回被项目中配置的 proxy拦截,然后将本地服务器的主机名拼接上去
    // 我们现在假设后台接口,没有完成,我们要使用mock服务器,应该将mock服务的主机名直接写在url地址里
    url: `${BASE_URL}/get/${parentId}`, 
    method: "GET",
  });
}

