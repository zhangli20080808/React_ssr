// 初始化数据 当action被接收到之后 我们的数据该如何改变 必须是一个春函数
const defaultState = {
    name:'zls',
    newsList:[]
}

export default (state = defaultState, action) => {
    switch (action.type) {
        default:
            return state
    }
}