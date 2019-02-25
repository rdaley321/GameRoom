import { history } from '../history'

const navigationReducer = (state = {path: '/'}, action) => {
  switch (action.type) {
    case 'NAV_TO_LOGIN':
      history.push('login')
      return {...state, path: '/login'}
    case 'NAV_TO_SIGNUP':
      history.push('signup')
      return {...state, path: '/signup'}
    default:
      return state;
  }
}



export default navigationReducer