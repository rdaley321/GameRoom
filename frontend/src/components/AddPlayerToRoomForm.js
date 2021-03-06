import React from 'react'
import apiKey from '../secret/keys'
import { connect } from 'react-redux'
import API_URL from '../APIURL/apiUrl'

class AddPlayerToRoomForm extends React.Component {

  postToDatabase = (e, stats) => {
    let data = {
      handle: e.target.handle.value,
      nickname: e.target.nickname.value,
      stats: stats
    }
    fetch(`${API_URL}/api/players`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'room_id': this.props.currentRoom._id,
        'authorization': localStorage.token
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => this.props.dispatch({type: 'ADD_PLAYER_TO_ROOM', payload: res}))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    e.persist()
    fetch(`https://cors-anywhere.herokuapp.com/https://api.fortnitetracker.com/v1/profile/${e.target.platform.value}/${e.target.handle.value}`, {
      headers: {
        "TRN-Api-Key": apiKey
      }
    })
    .then(res => res.json())
    .then(res => {
      if(res.error){
        console.log('Player does not exist')
      } else {
        this.postToDatabase(e, res)
      }
    })
  }

  render () {
    return(
      <div className="form-bg room-form-div">
        <form className="form" id="playerForm" onSubmit={e => this.handleSubmit(e)}>
          <input type="text" name="handle" placeholder="handle..."/>
          <input type="text" name="nickname" placeholder="nickname..."/>
          <select name="platform" form='playerForm'>
            <option value="psn">PSN</option>
            <option value="xbl">XBL</option>
            <option value="pc">PC</option>
          </select>
          <button className="pointer" type="submit">Add player</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentRoom: state.room.room_details
  }
}

export default connect(mapStateToProps)(AddPlayerToRoomForm);
