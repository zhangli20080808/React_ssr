import { CHANGE_LIST } from './constants';

const changeList = (list) => ({
	type: CHANGE_LIST,
	list
})

export const getHomeList = () => {
	    // 由于我们的服务器端也会运行一次
    // 浏览器运行 /api/news.json = localhost:3000/api/news.json
    // 服务端运行 /api/news.json = 服务器根目录下的/api/news.json 没有这个目录啊
	return (dispatch, getState, axiosInstance) => {
		return axiosInstance.get('/api/news.json?secret=M5s2sPneDE')
			.then((res) => {
				const list = res.data.data;
				dispatch(changeList(list))
			});
	}
} 
// 如何将数据存入redux之中呢 redux-thunk当我们用他做异步请求的时候 返回的函数可以接受到这个dispatch方法
// 再调用dispatch触发一个action