import {createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import authReducer from './reducers/authReducer'
import detailReducer from './reducers/detailReducer'
import confirmReducer from './reducers/comfirmReducer'
import resultReducer from './reducers/resultReducer'

const rootReducer = combineReducers({
    auth : authReducer,
    detail : detailReducer,
    confirm : confirmReducer,
    result : resultReducer
})

const middleWare = composeWithDevTools(applyMiddleware(thunk))

export default createStore(rootReducer , middleWare)