import React from 'react'
import { connect } from 'react-redux'
import AddPlayerToRoomForm from './AddPlayerToRoomForm'

class Room extends React.Component {

  componentDidMount() {
    fetch(`http://localhost:5000/api/rooms/${this.props.room_id}`)
    .then(res => res.json())
    .then(res => this.props.dispatch({type:'SELECT_CURRENT_ROOM', payload: res}))
    .catch(err => console.log(err))
  }

  render () {
    return(
      <div>
        <AddPlayerToRoomForm />
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    room_id: state.navigation.path.split('/')[2],
    currentRoom: state.room.room_details
  }
}

export default connect(mapStateToProps)(Room)
