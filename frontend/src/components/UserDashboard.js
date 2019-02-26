import React from 'react'
import { connect } from 'react-redux'

import PlayerCard from './PlayerCard'

class UserDashboard extends React.Component {

  componentDidMount() {
    fetch('http://localhost:5000/api/users/rooms', {
      headers: {
        'Content-Type': 'application/json',
        'email': this.props.currentUser,
        'authorization': localStorage.token
      }})
      .then(res => res.json())
      .then(res => {
        this.props.dispatch({type:'FETCH_ROOMS', payload: res.rooms})
      })
      .catch(console.log)
  }


  handlesubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:5000/api/rooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'email': this.props.currentUser,
        'authorization': localStorage.token
      },
      body: JSON.stringify({title: e.target.title.value})
    })
  }


  render () {
    return (
      <div>
        <h1>Welcome {this.props.currentUser}</h1>
        <form onSubmit={e => this.handlesubmit(e)}>
          <label>Create a Room</label>
          <input type="string" name="title" placeholder="Title..."></input>
          <button type="submit">Create Room</button>
        </form>
        <ul>
          {this.props.rooms && this.props.rooms.map(room => {
            return <PlayerCard key="{room.id}" {...room}/>
          })}
        </ul>
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
