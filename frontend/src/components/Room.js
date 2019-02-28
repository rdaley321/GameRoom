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

  handleChange(e) {
    e.persist()
    this.props.dispatch({type: 'SORT_BY', payload: e.target.value})
  }


  render () {
    const room = this.props.currentRoom
    let currentSort
    switch(this.props.currentButton) {
      case 'wins':
        currentSort = room && room.players.map(player => player.stats.lifeTimeStats.find(stat => stat.key === 'Wins').value)
      break
      case 'winPercentage':
        currentSort = room && room.players.map(player => player.stats.lifeTimeStats.find(stat => stat.key === 'Win%').value.replace(/%/g, ''))
      break
      case 'kills':
        currentSort = room && room.players.map(player => player.stats.lifeTimeStats.find(stat => stat.key === 'Kills').value)
      break
      case 'kd':
        currentSort = room && room.players.map(player => player.stats.lifeTimeStats.find(stat => stat.key === 'K/d').value)
      break
      case 'matches':
        currentSort = room && room.players.map(player => player.stats.lifeTimeStats.find(stat => stat.key === 'Matches Played').value)
      break
      default:
    }

    const title = room && <h1>Room: {room.title}</h1>
    const players = room && room.players.map(player => <PlayerCard key={player._id} {...player}/>)
    const labels = room && room.players.map(player => player.handle)
    const colors = labels && randomColor({count: labels.length})

    const  data = {
      	labels: labels,
      	datasets: [{
      		data: currentSort,
          backgroundColor: colors
      	}]
      };
      
    return(
      <div>
        {title}
        <AddPlayerToRoomForm />
        <form>
          <fieldset>
              <label htmlFor="wins">Wins</label>
              <input
                onChange={e => this.handleChange(e)}
                type="radio"
                name="sortBy"
                value="wins"
                checked={this.props.currentButton === "wins"} />
              <label htmlFor="winPercentage">Win Percentage</label>
              <input
                onChange={e => this.handleChange(e)}
                type="radio"
                name="sortBy"
                value="winPercentage"
                checked={this.props.currentButton === "winPercentage"} />
              <label htmlFor="kills">Kills</label>
              <input
                onChange={e => this.handleChange(e)}
                type="radio"
                name="sortBy"
                value="kills"
                checked={this.props.currentButton === "kills"} />
              <label htmlFor="kd">K/D Ratio</label>
              <input
                onChange={e => this.handleChange(e)}
                type="radio"
                name="sortBy"
                value="kd"
                checked={this.props.currentButton === "kd"} />
              <label htmlFor="matches">Matches Played</label>
              <input
                onChange={e => this.handleChange(e)}
                type="radio"
                name="sortBy"
                value="matches"
                checked={this.props.currentButton === "matches"} />
          </fieldset>
        </form>
        <ChartComponent data={data}/>
        {players}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    room_id: state.navigation.path.split('/')[2],
    currentRoom: state.room.room_details,
    currentButton: state.doughnutChart.sortBy
  }
}

export default connect(mapStateToProps)(Room)
