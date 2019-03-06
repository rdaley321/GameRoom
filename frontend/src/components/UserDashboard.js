import React from 'react'
import { connect } from 'react-redux'

import RoomCard from './RoomCard'

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
      <div className="mountain-bg">
        <div className="dashboard-div">
          <div className="room-form-bg">
            <form className="form" onSubmit={e => this.handleSubmit(e)}>
              <label className="title">Create a Room</label>
              <input type="string" name="title" placeholder="Title..."></input>
              <button className="pointer" type="submit">Create Room</button>
            </form>
          </div>
          <div className="title room-card-div">
            {this.props.rooms && this.props.rooms.map(room => {
              return (
                <div onClick={e => this.handleClick(room)} key={room._id}>
                  <RoomCard {...room}/>
                </div>
              )
            })}
          </div>
        </div>
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
