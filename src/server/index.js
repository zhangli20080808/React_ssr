import express from 'express';
import proxy from 'express-http-proxy';
import { matchRoutes } from 'react-router-config'
import { render } from './utils';
import { getStore } from '../store';
import routes from '../Routes';

const app = express();
app.use(express.static('public'));

// /api/news.json
// req.url = news.json
// proxyReqPathResolver: /ssr/api/news.json
// http://47.95.113.63 + proxyReqPathResolver()
// http://47.95.113.63/ssr/api/news.json

app.use('/api', proxy('http://47.95.113.63', {
	proxyReqPathResolver: function (req) {
		console.log(req.url);
		
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
