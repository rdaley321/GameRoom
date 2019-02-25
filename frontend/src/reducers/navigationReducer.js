import { history } from '../history'

const navigationReducer = (state = {path: '/'}, action) => {
  switch (action.type) {
    case 'NAV_TO_LOGIN':
      history.push('login')
      return {...state, path: '/login'}
    case 'NAV_TO_SIGNUP':
      history.push('signup')
      return {...state, path: '/signup'}
    case 'NAV_TO_DASHBOARD':
      history.push('dashboard')
      return {...state, path: '/dashboard'}
    default:
      return state;
  }
}



export default navigationReducer
