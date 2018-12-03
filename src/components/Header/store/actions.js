import { CHANG_LOGIN } from './constants'


const changeLogin = (value) => ({
    type: CHANG_LOGIN,
    value
})

export const getHeaderInfo = () => {
    // 由于我们的服务器端也会运行一次
    // 浏览器运行 /api/news.json = localhost:3000/api/news.json
    // 服务端运行 /api/news.json = 服务器根目录下的/api/news.json 没有这个目录啊
    return (dispatch,getState,axionsInstance) => {
       return axionsInstance.get('/api/isLogin.json?secret=M5s2sPneDE')
            .then((res) => {
                dispatch(changeLogin(res.data.data.islgoin))
            })
    }
}