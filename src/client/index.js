import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { renderRoutes} from 'react-router-config'
import routes from '../Routes'
import { Provider } from 'react-redux'
import {getClientStore} from '../store'

const store = getClientStore()
const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    {renderRoutes(routes)}
                </div>
            </BrowserRouter>
        </Provider>
    )
}
ReactDOM.hydrate(<App />, document.getElementById('root'))
