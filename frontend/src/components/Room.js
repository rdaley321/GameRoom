import React from 'react'
import { connect } from 'react-redux'
import AddPlayerToRoomForm from './AddPlayerToRoomForm'
import PlayerCard from './PlayerCard'
import ChartComponent from './ChartComponent'
import randomColor from 'randomcolor'

class Room extends React.Component {


  componentDidMount() {
    fetch(`http://localhost:5000/api/rooms/${this.props.room_id}`)
    .then(res => res.json())
    .then(res => this.props.dispatch({type:'SELECT_CURRENT_ROOM', payload: res}))
    .catch(err => console.log(err))
  }

  render () {
    const title = this.props.currentRoom && <h1>Room: {this.props.currentRoom.title}</h1>
    const players = this.props.currentRoom && this.props.currentRoom.players.map(player => <PlayerCard key={player._id} {...player}/>)
    const labels = this.props.currentRoom && this.props.currentRoom.players.map(player => player.handle)
    const playersKD = this.props.currentRoom && this.props.currentRoom.players.map(player => player.stats.lifeTimeStats.find(stat => stat['key'] === 'K/d').value)
    const colors = labels && randomColor({count: labels.length})

    const  data = {
      	labels: labels,
      	datasets: [{
      		data: playersKD,
          backgroundColor: colors
      	}]
      };


    return(
      <div>
        {title}
        <AddPlayerToRoomForm />
        <ChartComponent data={data}/>
        {players}
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
