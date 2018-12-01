import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import Routes from '../Routes'
import { createStore ,applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

export const render = (req) => {
    const reducer = (state = { name: 'dell' }, action) => {
        return state
    }
    const store = createStore(reducer,applyMiddleware(thunk))

    const content = renderToString((
        // 通常会用context做一些数据的传递 location 告诉服务器你浏览器现在在什么路径，用户所处的路径 req.path
        <Provider store={store}>
         <StaticRouter context={{}} location={req.path}>{Routes}</StaticRouter>
        </Provider>
    ))
    // renderToString会帮我们把这个组件变成字符串，然后返回给浏览器 只能渲染基础页面，事件没有
    return `
    <html>
       <head>
           <title>ssr</title>
       </head>
       <body>
         <div id='root'>${content}</div>
         <script src='index.js'></script>
       </body>
   </html>
   `
}