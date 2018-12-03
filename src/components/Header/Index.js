import React,{Fragment} from 'react'
// 同构:一套react代码  在服务器执行一次 在客户端再执行一次 解决点击事件无效的问题
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Header = (props) => {
    return (
        <div>
            <Link to='/'>首页</Link>
            <br />
            {
                props.login ? 
                <Fragment>
                    <Link to='/login'>翻译列表</Link>
                    <br />
                    <Link to='/logout'>注销</Link>
                </Fragment>: <Link to='/login'>登录</Link>
            }
        </div>
    )
}
const mapState = state => ({
    login: state.header.login
})

export default connect(mapState, null)(Header)