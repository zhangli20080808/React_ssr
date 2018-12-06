import axios from 'axios';
import config from '../config/index'
const instance = axios.create({
	baseURL: '/',
	params :{
		secret: config.secret
	}
});

export default instance;