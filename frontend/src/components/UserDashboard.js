import React from 'react'
import { connect } from 'react-redux'

import RoomCard from './RoomCard'
import Chat from './Chat'

class UserDashboard extends React.Component {

  fetchRooms() {
    fetch('http://localhost:8080/api/users/rooms', {
      headers: {
        'Content-Type': 'application/json',
        'email': this.props.currentUser,
        'authorization': localStorage.token
      }})
      .then(res => res.json())
      .then(res => {
        this.props.dispatch({type:'FETCH_ROOMS', payload: res.rooms})
      })
      .catch(err => console.log('Please Login Again'))
  }

  componentDidMount() {
    this.fetchRooms()
  }


  handleSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:8080/api/rooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'email': this.props.currentUser,
        'authorization': localStorage.token
      },
      body: JSON.stringify({title: e.target.title.value})
    })
    .then(res => this.fetchRooms())
  }

  handleClick = (room) => {
    this.props.dispatch({type: 'NAV_TO_ROOM', payload: room._id})
  }


  render () {
    return (
      <div>
        <h1>Welcome {this.props.currentUser}</h1>
        <form onSubmit={e => this.handleSubmit(e)}>
          <label>Create a Room</label>
          <input type="string" name="title" placeholder="Title..."></input>
          <button type="submit">Create Room</button>
        </form>
        <ul>
          {this.props.rooms && this.props.rooms.map(room => {
            return (
              <li onClick={e => this.handleClick(room)} key={room._id}>
                <RoomCard {...room}/>
              </li>
            )
          })}
        </ul>
        <Chat />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser,
    rooms: state.user.rooms
  }
}

export default connect(mapStateToProps)(UserDashboard);
