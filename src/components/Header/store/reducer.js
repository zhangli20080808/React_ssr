import { CHANG_LOGIN } from './constants'
const defaultState = {
    login: true
}
export default (state = defaultState, action) => {
    switch (action.type) {
        case CHANG_LOGIN:
        return  {
           ...state,
           login: action.value
        }

        default:
            return state
    }
}