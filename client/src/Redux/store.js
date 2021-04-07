import {createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import authReducer from './reducers/authReducer'
import detailReducer from './reducers/detailReducer'

const rootReducer = combineReducers({
    auth : authReducer,
    detail : detailReducer
})

const middleWare = composeWithDevTools(applyMiddleware(thunk))

export default createStore(rootReducer , middleWare)