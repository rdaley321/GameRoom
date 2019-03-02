const roomReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SELECT_CURRENT_ROOM':
      return {...state, room_details: action.payload}
    case 'ADD_PLAYER_TO_ROOM':
      return {...state, room_details: {...state.room_details, players: [...state.room_details.players, action.payload]}}
    case 'UPDATE_PLAYER_IN_ROOM':
      const arr = state.room_details.players.map(player => {
        if(player._id === action.payload.id) {
          player = {...player, stats: action.payload.stats}
        }
        return player
      })
      
      return {...state, room_details: {...state.room_details, players: arr}}
    default:
      return state;
  }
}



export default roomReducer
