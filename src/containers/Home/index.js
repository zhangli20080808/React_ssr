import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getHomeList } from './store/actions';
import styles from './style.css'

class Home extends Component {

	componentWillMount() {
		// 我们在做客户端渲染的时候 styles是由style-loader生成的 它里面是没有getcss的
		// console.log(styles._getCss());
		// console.log(this.props.staticContext) //服务端-对象  客户端-undefined 可以用来区分我们的环境 存进去
		// if (styles._getCss) {
		// 	console.log(styles._getCss());
		// }
		if(this.props.staticContext){
			this.props.staticContext.css = styles._getCss()
		}
	}
	getList() {
		const { list } = this.props;
		return list.map(item => <div key={item.id}>{item.title}</div>)
	}

	render() {
		return (
			<div className={styles.test}>
				{this.getList()}
				<button onClick={() => { alert('click1') }}>
					click
				</button>
			</div>
		)
	}

	componentDidMount() {
		if (!this.props.list.length) {
			this.props.getHomeList();
		}
	}
}

Home.loadData = (store) => {
	// 这个函数，负责在服务器端渲染之前，把这个路由需要的数据提前加载好
	return store.dispatch(getHomeList())
}

const mapStateToProps = state => ({
	list: state.home.newsList
});

const mapDispatchToProps = dispatch => ({
	getHomeList() {
		dispatch(getHomeList());
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
