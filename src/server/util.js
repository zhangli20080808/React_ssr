import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, Route } from 'react-router-dom'
import { matchRoutes } from 'react-router-config'
import routes from '../Routes'
import { Provider } from 'react-redux'
import getStore from '../store'

export const render = (req) => {

    const store = getStore()
    // 如果在这里能拿到异步数据 并填充到store之中
    // store里面填充什么我们不知道 我们需要结合用户的的请求地址和当前的路由做判断
    // 如果用户访问 / 我们就拿 home的异步数据
    // 如果用户访问 /login 我们就拿 login的异步数据

    // 根据路由的路径往store里面加数据

    const matchedRoutes = matchRoutes(routes,req.path)

    //让 matchRoutes里面所有的组件，对应的loadData方法执行一次 
    console.log(matchedRoutes);
    

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