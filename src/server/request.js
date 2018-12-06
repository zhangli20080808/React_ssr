import axios from 'axios';
import config from '../config/index'

const createInstance = (req) => axios.create({
	baseURL: 'http://47.95.113.63/ssr',
	headers: {
		cookie: req.get('cookie') || ''
	},
	params: {
		secret: config.secret
	}
});

export default createInstance;