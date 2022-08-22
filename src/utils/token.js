// 向本地储存的方法
export const setToken = (token)=>{
    localStorage.setItem('TOKEN',token)
}

// 从本地获取的方法
export const getToken = ()=>{
    return localStorage.getItem('TOKEN')
}

// 清楚本地数据
export const removeToken = ()=>{
    localStorage.removeItem('TOKEN')
}