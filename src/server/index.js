import express from 'express';
import proxy from 'express-http-proxy';
import { matchRoutes } from 'react-router-config'
import { render } from './utils';
import { getStore } from '../store';
import routes from '../Routes';
import { rejects } from 'assert';
import { resolve } from 'path';

const app = express();
app.use(express.static('public'));

// /api/news.json
// req.url = news.json
// proxyReqPathResolver: /ssr/api/news.json
// http://47.95.113.63 + proxyReqPathResolver()
// http://47.95.113.63/ssr/api/news.json

app.use('/api', proxy('http://47.95.113.63', {
	proxyReqPathResolver: function (req) {
		return '/ssr/api' + req.url;
	}
}));

app.get('*', function (req, res) {

	// 如果在这里能拿到异步数据 并填充到store之中
	// store里面填充什么我们不知道 我们需要结合用户的的请求地址和当前的路由做判断
	// 如果用户访问 / 我们就拿 home的异步数据
	// 如果用户访问 /login 我们就拿 login的异步数据

	const store = getStore(req);
	// 根据路由的路径，来往store里面加数据
	const matchedRoutes = matchRoutes(routes, req.path);
	// 让matchRoutes里面所有的组件，对应的loadData方法执行一次
	const promises = [];
	matchedRoutes.forEach(item => {
		// 如果进入的这些组件有loadData，就把提前加载数据的方法 对应的promise

		if (item.route.loadData) {
			const promise = new Promise((reslove, reject) => {
				item.route.loadData(store).then(reslove).catch(reslove)
			})
			promises.push(promise)
		}
	})
	Promise.all(promises).then(() => {
		// reatc-router-config定义路由的时候 如果发现了我们组件出现了redirect  他会自动帮我们操作一下这个context
		const context = {css:[]}
		const html = render(store, routes, req, context)
		// 在这判断你是已经存在的页面还是404里面的页面
		// console.log(context.css)
		if (context.action === 'REPLACE') {
			res.redirect(301, context.url)
		} else if (context.notFind) {
			// 在我们返回页面的状态码之前就改变这个状态码
			res.status(404)
			res.send(html);
		} else {
			res.send(html);
		}
	}).catch(() => {
		res.send('sorry,requset error')
	})
});

var server = app.listen(3003);

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


1.服务器街搜到请求 store是空的 接着服务器回去匹配路由 看是哪个组件 我知道显示的是这个组件  但是要注意服务端是不会渲染 componentDidmount的
所以他的reduce一直是个空 不会去拿远程服务器的数据
2.服务器端不会执行 服务端是不会渲染 componentDidmount的 所以列表内容获取不到

我们的问题是什么呢？就是让服务器也能执行 componentDidmount去获取到数据
 first : loadData方法


 second : 路由的重构

3.客户端代码运行 这个时候store已然是空的
4.客户端执行componentDidMount 列报表数据被获取
5.store中的列表数据被更新
6.客户端渲染出store中list数据对应的列表内容

脱水 注水  服务端把页面返回之后客户端在做二次渲染的时候，二次渲染的一开始，客户端的store是空的，所以页面开始会白屏
会调用 componentDidmount去获取到数据 成功之后页面才会显示
问题？服务端渲染store的时候和客户端渲染store的时候数据是不同的 如何做到统一呢

我们在创建客户端的时候 我用服务端给我的数据
拿到服务器返给我我们的state的状态  window.context.state 默认值

使用proxy代理，让中间层承担数据获取职责 中间层的好处 容易调错 客户端-nodeServer nodeServer-apiServer 让
nodeServer变成一个代理服务器 express-http-proxy
根据环境对url做了一个区分
axios 两个重要概念  instance/interceptors
对axios请求的前缀做一些特殊的配置

redux-thunk中的withExtraArgument
withExtraArgument 关于server的判断我们加到store里面去
比对文件  beyond compare

1.刚进入页面，处于非登录状态
2.用户点击登录按钮，进行登录操作
 （1).浏览器发送请求给node服务器
 （2).转发给api服务器，进行登录
 （3).api服务器生成cookie
 （4).浏览器上存了cookie，登录成功
3.当用户重新刷新页面的时候
 （1).浏览器去请求html页面
 （2).nodejs服务器进行服务端渲染
 （3).进行服务端渲染，首先要去api服务器获取数据

 一个网站  文字 多媒体(图片) 链接  搜索引擎判断一个网站到底如何的时候 还是看这三个方面
 如何做我们的服务器端的css渲染
*/
