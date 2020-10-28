import { func } from "prop-types"

const auth = {}

/**
 * 获取token令牌
 */
auth.getToken = function(){
    return localStorage.getItem('token')
}

/**
 * 设置token令牌
 * @param {令牌字符串 Str} token 
 */
auth.setToken = function(token){
    localStorage.setItem('token',JSON.stringify(token))
}

/**
 * 是否登录成功
 */
auth.isLogin = function(){
    return localStorage.getItem('token') ? true : false
}

/**
 * 注销登录,清楚登录缓存
 */
auth.logOut = function(){
    localStorage.removeItem('token')
}

/**
 * 记住我
 * @param {账户信息 Object} values 
 */
auth.setUserPwd = function(values){
    localStorage.setItem('loginInfo',JSON.stringify(values))
}

/**
 * 判断是否记住我
 */
auth.getUserPwd = function(){
    return localStorage.getItem('loginInfo') ? JSON.parse(localStorage.getItem('loginInfo')) : false
}

export default auth