import React from 'react'
import { connect } from 'react-redux'
import AddPlayerToRoomForm from './AddPlayerToRoomForm'
import PlayerCard from './PlayerCard'
import ChartComponent from './ChartComponent'
import randomColor from 'randomcolor'

class Room extends React.Component {


  componentDidMount() {
    fetch(`http://localhost:8080/api/rooms/${this.props.room_id}`)
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

    const title = room && <h1 className="title">Room: {room.title}</h1>
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
      <div className="werewolf-bg">
        <div className="room-content-div">
          <div className="title-and-graph-div">
            {title}
            <div className="entire-doughnut-chart">
              <form className="radio-button-form">
                  <div>
                    <label htmlFor="wins">Wins</label>
                    <input
                      onChange={e => this.handleChange(e)}
                      type="radio"
                      name="sortBy"
                      value="wins"
                      checked={this.props.currentButton === "wins"} />
                  </div>
                  <div>
                    <label htmlFor="winPercentage">Win Percentage</label>
                    <input
                      onChange={e => this.handleChange(e)}
                      type="radio"
                      name="sortBy"
                      value="winPercentage"
                      checked={this.props.currentButton === "winPercentage"} />
                  </div>
                  <div>
                    <label htmlFor="kills">Kills</label>
                    <input
                      onChange={e => this.handleChange(e)}
                      type="radio"
                      name="sortBy"
                      value="kills"
                      checked={this.props.currentButton === "kills"} />
                  </div>
                  <div>
                    <label htmlFor="kd">K/D Ratio</label>
                    <input
                      onChange={e => this.handleChange(e)}
                      type="radio"
                      name="sortBy"
                      value="kd"
                      checked={this.props.currentButton === "kd"} />
                  </div>
                  <div>
                    <label htmlFor="matches">Matches Played</label>
                    <input
                      onChange={e => this.handleChange(e)}
                      type="radio"
                      name="sortBy"
                      value="matches"
                      checked={this.props.currentButton === "matches"} />
                  </div>
              </form>
              <ChartComponent data={data}/>
            </div>
          </div>
          <div className="form-and-players-div">
            <AddPlayerToRoomForm />
            <div className="all-players-div">
              {players}
            </div>
          </div>
        </div>
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
