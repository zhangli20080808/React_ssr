import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, Route } from 'react-router-dom'
import routes from '../Routes'
import { Provider } from 'react-redux'

export const render = (store,routes,req) => {
    const content = renderToString((

        // 通常会用context做一些数据的传递 location 告诉服务器你浏览器现在在什么路径，用户所处的路径 req.path
        <Provider store={store}>
            <StaticRouter context={{}} location={req.path}>
                {/* 我们把route中的每一项展开作为他的属性就生成了路由 */}
                <div>
                    {routes.map(route => (
                        <Route {...route} />
                    ))}
                </div>
            </StaticRouter>
        </Provider>
    ))
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