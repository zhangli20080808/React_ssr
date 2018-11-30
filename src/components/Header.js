import React from 'react'
// 同构:一套react代码  在服务器执行一次 在客户端再执行一次 解决点击事件无效的问题
import {Link} from 'react-router-dom'
const Header = () => {
    return (
        <div>
            <Link to='/'>home</Link>   
            <br/>
            <Link to='/login'>login</Link>     
        </div>
    )
}
export default Header