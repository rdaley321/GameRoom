import { combineReducers } from 'redux'

import navigationReducer from './navigationReducer';
import userReducer from './userReducer'
import roomReducer from './roomReducer'



const rootReducer = combineReducers({navigation: navigationReducer, user: userReducer, room: roomReducer})

export default rootReducer
