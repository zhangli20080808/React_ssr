import { CHANGE_LOGIN } from './constants';

const changeLogin = (value) => ({
	type: CHANGE_LOGIN,
	value
});

export const login = () => {
	return (dispatch, getState, axiosInstance) => {
		return axiosInstance.get('/api/login.json?secret=M5s2sPneDE')
			.then((res) => {
				dispatch(changeLogin(true))
			});
	}
} 

export const logout = () => {
	return (dispatch, getState, axiosInstance) => {
		return axiosInstance.get('/api/logout.json?secret=M5s2sPneDE')
			.then((res) => {
				dispatch(changeLogin(false))
			});
	}
} 

export const getHeaderInfo = () => {
	    // 由于我们的服务器端也会运行一次
    // 浏览器运行 /api/news.json = localhost:3000/api/news.json
    // 服务端运行 /api/news.json = 服务器根目录下的/api/news.json 没有这个目录啊
	return (dispatch, getState, axiosInstance) => {
		return axiosInstance.get('/api/isLogin.json?secret=M5s2sPneDE')
			.then((res) => {
				dispatch(changeLogin(res.data.data.login))
			});
	}
} 