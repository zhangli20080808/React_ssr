import axios from 'axios'
import { CHANG_LIST } from './constants'

const changeList = (list) => ({
    type: CHANG_LIST,
    list
})
// 由action creator创建出的一个对象 
export const getHomeList = () => {
    return (dispatch) => {
       return axios.get('/api/news.json?secret=M5s2sPneDE')
            .then((res) => {
                const list = res.data.data
                dispatch(changeList(list))
            })
    }
}
// 如何将数据存入redux之中呢 redux-thunk当我们用他做异步请求的时候 返回的函数可以接受到这个dispatch方法
// 再调用dispatch触发一个action