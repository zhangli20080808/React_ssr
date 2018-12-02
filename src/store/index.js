import { createStore, applyMiddleware,combineReducers} from 'redux'
import thunk from 'redux-thunk'
import { reducer as homeReducer } from '../container/Home/store'
import clientAxios from '../client/request'
import serverAxios from '../server/requset'


const reducer = combineReducers({
    home: homeReducer
})

export const getStore = () => {
    // 改变服务器端的store的内容，那么久一定要用serverAxios
    return createStore(reducer, applyMiddleware(thunk.withExtraArgument(serverAxios)))
}
export const getClientStore = () => {
    // 改变服务器端的store的内容，那么久一定要用clientAxios

    const defaultState = window.context.state
    return createStore(reducer, defaultState,applyMiddleware(thunk.withExtraArgument(clientAxios)))
}
