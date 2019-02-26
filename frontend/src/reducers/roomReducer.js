const roomReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SELECT_CURRENT_ROOM':
    return {...state, room_details: action.payload}
    default:
      return state;
  }
}



export default roomReducer
