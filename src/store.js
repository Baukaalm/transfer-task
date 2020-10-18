import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk';
import transfer from './modules/transfer/reducers'
import user from './modules/auth/reducers'

const rootReducer = combineReducers({
    transfer,
    user
})


export default createStore(rootReducer, applyMiddleware(thunkMiddleware)) 