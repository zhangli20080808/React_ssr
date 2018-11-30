import express from 'express'
import { render } from './util'
const app = express();

app.use(express.static('public'))
app.get('*', function (req, res) {
    res.send(render(req))
})
var server = app.listen('3000')
// 虚拟dom 是真是DOM的一个JavaScript的对象映射 因为虚拟dom是一个js对象 所以在客户端渲染的时候，把一个虚拟dom
// 转化成真是的dom挂载在页面上，也可以在ssr的时候把虚拟dom转化成字符串，返回给浏览器，虚拟dom让我们在做ssr的时候变得简单方便
// 客户端渲染 react代码在浏览器上执行，消耗的是用户浏览器的性能
// 服务端渲染 react代码在服务器上执行，消耗的是服务器端的性能

// 服务器端渲染中的路由 StaticRouter 
// 服务端渲染  第一次加载好页面以后，之后页面的跳转就不是服务器端的跳转了，而是js控制的页面跳转了 之后bundle里面的js会接管页面后的流程
// 走的都是客户端路由了 所以说 服务器端渲染并不是说每一个页面都去做服务端渲染 指的是你访问的第一个页面具有服务端渲染的特性
