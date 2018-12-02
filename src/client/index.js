import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import routes from '../Routes'
import { Provider } from 'react-redux'
import {getClientStore} from '../store'

const store = getClientStore()
const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    {routes.map(route => (
                        <Route {...route} />
                    ))}
                </div>
            </BrowserRouter>
        </Provider>
    )
}
ReactDOM.hydrate(<App />, document.getElementById('root'))
