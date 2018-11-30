import express from 'express'
import Home from './containser/Home'
import React from 'react'
import { renderToString } from 'react-dom/server'

const app = express();
const content = renderToString(<Home />)

app.get('/', function (req, res) {
    // renderToString会帮我们把这个组件变成字符串，然后返回给浏览器
    res.send(
        `
       <html>
       <head>
           <title>ssr</title>
       </head>
       <body>
       ${content}             
       </body>
   </html>
   `
    )
})
var server = app.listen('3000')