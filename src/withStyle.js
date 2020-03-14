// 这个函数是生成高阶组件的函数
// 这个函数返回一个组件
import React, { Component } from 'react';
// 返回的这个组件，叫做高阶组件
export default (DecoratedCopmonent, styles) => {
    return class NewComponent extends Component {
        UNSAFE_componentWillMount() {
            // 我们在做客户端渲染的时候 styles是由style-loader生成的 它里面是没有getcss的
            // console.log(styles._getCss());
            // console.log(this.props.staticContext) //服务端-对象  客户端-undefined 可以用来区分我们的环境 存进去
            // if (styles._getCss) {
            // 	console.log(styles._getCss());
            // }
            if (this.props.staticContext) {
                this.props.staticContext.css.push(styles._getCss())
            }
        }
        render() {
            return <DecoratedCopmonent {...this.props} />
        }
    }
}