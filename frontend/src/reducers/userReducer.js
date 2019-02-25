const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return {...state, currentUser: action.payload}
    case 'LOG_OUT':
      return {...state, currentUser: null}
    default:
      return state;
  }
}



export default userReducer
