const roomReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SELECT_CURRENT_ROOM':
      return {...state, room_details: action.payload}
    case 'ADD_PLAYER_TO_ROOM':
      return {...state, room_details: {...state.room_details, players: [...state.room_details.players, action.payload]}}
    default:
      return state;
  }
}



export default roomReducer
