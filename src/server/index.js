import express from 'express'
import React from 'react'
import path from 'path'
import { renderToString } from 'react-dom/server'
import {StaticRouter} from 'react-router-dom'
import Routes from '../Routes'
// 虚拟dom 是真是DOM的一个JavaScript的对象映射 因为虚拟dom是一个js对象 所以在客户端渲染的时候，把一个虚拟dom
// 转化成真是的dom挂载在页面上，也可以在ssr的时候把虚拟dom转化成字符串，返回给浏览器，虚拟dom让我们在做ssr的时候变得简单方便

// 客户端渲染 react代码在浏览器上执行，消耗的是用户浏览器的性能
// 服务端渲染 react代码在服务器上执行，消耗的是服务器端的性能

const app = express();

app.use(express.static('public'))
app.get('/', function (req, res) {
    const content = renderToString((
        // 通常会用context做一些数据的传递 location 告诉服务器你浏览器现在在什么路径，用户所处的路径 req.path
        <StaticRouter context={{}} location={req.path}>{Routes}</StaticRouter>
    ))
    // renderToString会帮我们把这个组件变成字符串，然后返回给浏览器 只能渲染基础页面，事件没有
    res.send(`
    <html>
       <head>
           <title>ssr</title>
       </head>
       <body>
         <div id='root'>${content}</div>
         <script src='index.js'></script>
       </body>
   </html>
   `)
})
var server = app.listen('3000')
// 服务器端渲染中的路由 StaticRouter 
