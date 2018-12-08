import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from './store/'
import styles from './index.css'
class Header extends Component {
	componentWillMount() {
		// 我们在做客户端渲染的时候 styles是由style-loader生成的 它里面是没有getcss的
		// console.log(styles._getCss());
		// console.log(this.props.staticContext) //服务端-对象  客户端-undefined 可以用来区分我们的环境 存进去
		// if (styles._getCss) {
		// 	console.log(styles._getCss());
		// }
		if(this.props.staticContext){
			this.props.staticContext.css.push(styles._getCss()) 
		}
	}
	render() {
		const { login, handleLogin, handleLogout } = this.props;
		return (
			<div className={styles.test}>
				<Link to='/'>首页</Link>
				<br />
				{
					login ? <Fragment>
						<Link to='/translation'>翻译列表</Link>
						<br />
						<div onClick={handleLogout}>退出</div>
					</Fragment> : <div onClick={handleLogin}>登陆</div>
				}
			</div>
		)
	}
}

const mapState = (state) => ({
	login: state.header.login
});

const mapDispatch = (dispatch) => ({
	handleLogin() {
		dispatch(actions.login())
	},
	handleLogout() {
		dispatch(actions.logout())
	}
})

export default connect(mapState, mapDispatch)(Header);

