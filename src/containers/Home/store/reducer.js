// 初始化数据 当action被接收到之后 我们的数据该如何改变 必须是一个春函数

import { CHANGE_LIST } from './constants';

const defaultState = {
	newsList: []
}

export default (state = defaultState, action) => {
	switch(action.type) {
		case CHANGE_LIST:
			return {
				...state,
				newsList: action.list
			}
		default:
			return state;
	}
}