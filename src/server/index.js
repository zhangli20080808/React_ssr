import express from 'express'
import { render } from './util'
const app = express();

app.use(express.static('public'))
app.get('*', function (req, res) {
    res.send(render(req))
})
var server = app.listen('3000')



/*
虚拟dom 是真是DOM的一个JavaScript的对象映射 因为虚拟dom是一个js对象 所以在客户端渲染的时候，把一个虚拟dom
转化成真是的dom挂载在页面上，也可以在ssr的时候把虚拟dom转化成字符串，返回给浏览器，虚拟dom让我们在做ssr的时候变得简单方便
客户端渲染 react代码在浏览器上执行，消耗的是用户浏览器的性能
服务端渲染 react代码在服务器上执行，消耗的是服务器端的性能
服务器端渲染中的路由 StaticRouter 
服务端渲染  第一次加载好页面以后，之后页面的跳转就不是服务器端的跳转了，而是js控制的页面跳转了 之后bundle里面的js会接管页面后的流程
走的都是客户端路由了 所以说 服务器端渲染并不是说每一个页面都去做服务端渲染 指的是你访问的第一个页面具有服务端渲染的特性

中间层  相对于nodeserver javaserver 他们的计算性能效率要更高 
架构 对于java服务器 专注于数据的获取 计算 node服务器 他只是从java服务器取导数据和自己的react组件做一个结合，负责生成页面的内容
此时node服务器只是一个中间层，负责拼装要展示给用户的界面，然后把页面返回给用户

nodeServer--拼装页面 浏览器--运行js 而底层 关于数据查询 数据计算 java/c++ 
好处 -->nodeServe执行react 其实是比较消耗性能的，当用户量比较大的时候,nodeServe可能就承载不住，我们可以单独的增加nodeServe的数量来解决这个负载的平静问题
后续会引入数据获取服务器的概念
如果我们在服务端使用redux的话  那我们在客户端也需要使用redux

创建一个store 并传递给路由下的每一个组件
redux react-redux react-thunk

构架redux代码结构 -->HOME
我们从reducer写起 负责初始化创建一些数据  然后我们去全局store的index.js 这个地方需要对rendce做一个组合
只要涉及派发一个action 我们应该action的创建放在store目录的actions.js
*/