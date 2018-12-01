import React from 'react'
// 同构:一套react代码  在服务器执行一次 在客户端再执行一次 解决点击事件无效的问题
import Header from '../../components/Header'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
    name : state.name
})
const Home = (props) => {
    return (
        <div>
            <Header />
            <div>this is {props.name}</div>
            <button onClick={()=>alert('click')}>click</button>
        </div>
    )
}
export default connect(mapStateToProps,null)(Home)