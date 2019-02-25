import { combineReducers } from 'redux'

import navigationReducer from './navigationReducer';
import userReducer from './userReducer'



const rootReducer = combineReducers({navigation: navigationReducer, user: userReducer})

export default rootReducer
