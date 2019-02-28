import { combineReducers } from 'redux'

import navigationReducer from './navigationReducer';
import userReducer from './userReducer'
import roomReducer from './roomReducer'
import doughnutChartReducer from './doughnutChartReducer'



const rootReducer = combineReducers({
  navigation: navigationReducer, 
  user: userReducer,
  room: roomReducer,
  doughnutChart: doughnutChartReducer
})

export default rootReducer
