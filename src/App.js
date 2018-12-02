import React from 'react'
import Header from './components/Header'
import { renderRoutes } from 'react-router-config'
import routes from './Routes'

// renderRoutes 首先帮我们渲染一级路由 然后当我们进入二级路由的时候 这个方法会帮我们把一些二级路由的信息
// 带到对应的组件里面去 所以在app这个组价里面 我们可以通过props.route.routes获取到二级路由对应的那个数组
const App = (props) => {
    console.log(props.route);

    return (
        <div>
            <Header />
            {/* {renderRoutes(routes[0].routes)} */}
            {renderRoutes(props.route.routes)}
        </div>
    )
}
export default App