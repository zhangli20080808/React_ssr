import React from 'react'
import {Route} from 'react-router-dom'

import Home from './container/Home'
import Login from './container/Login/Index'

export default (
    <div>
        <Route path='/' exact component={Home}></Route>
        <Route path='/login' exact component={Login}></Route>
    </div>
)
// 做同构的同时  我们的路由要在服务器端跑一次，在客户端也跑一遍 用户体验 首先我们让路由在客户端跑