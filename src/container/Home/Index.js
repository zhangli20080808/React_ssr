import React from 'react'
// 同构:一套react代码  在服务器执行一次 在客户端再执行一次 解决点击事件无效的问题
const Home = () => {
    return (
        <div>
            <div>zl，loveyousgsgs</div>
            <button onClick={()=>alert('click')}>click</button>
        </div>
    )
}
export default Home