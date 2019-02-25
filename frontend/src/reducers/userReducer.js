const userReducer = (state = {currentUser: null}, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return {currentUser: action.payload}
    case 'LOG_OUT':
      return {currentUser: null}
    default:
      return state;
  }
}



export default userReducer
