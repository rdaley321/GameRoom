import React from 'react'
import LineChartComponent from './LineChartComponent'
import circleArrow from '../images/loading-refresh-reload-loop-circle-arrow-38191.png'
import xIcon from '../images/x_icon.png'
import apiKey from '../secret/keys'
import { connect } from 'react-redux'

const PlayerCard = (props) => {
  let wins
  let winPercentage
  let kills
  let kdRatio
  let matchesPlayed

  props.stats.lifeTimeStats.forEach(stat => {
    switch(stat.key) {
      case 'Wins':
        wins = stat.value
      break
      case 'Win%':
        winPercentage = stat.value
      break
      case 'Kills':
        kills = stat.value
      break
      case 'K/d':
        kdRatio = stat.value
      break
      case 'Matches Played':
        matchesPlayed = stat.value
      break
      default:
    }
  })

  function postToDatabase(stats) {
    fetch(`http://localhost:5000/api/players/update/${props._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'authorization': localStorage.token
      },
      body: JSON.stringify({stats: stats})
    })
    .then(props.dispatch({type: 'UPDATE_PLAYER_IN_ROOM', payload: {stats: stats, id: props._id}}))
  }

  function handleRefresh() {
    fetch(`https://cors-anywhere.herokuapp.com/https://api.fortnitetracker.com/v1/profile/${props.stats.platformName}/${props.stats.epicUserHandle}`, {
      headers: {
        "TRN-Api-Key": apiKey
      }
    })
    .then(res => res.json())
    .then(res => {
      if(res.error){
        console.log('Cannot Update Player')
      } else {
        console.log('REFRESHING STATS AND SAVING TO DATABASE')
        postToDatabase(res)
      }
    })
  }

  function handleDelete() {
    fetch(`http://localhost:5000/api/players/${props._id}`, {
      method: 'DELETE',
      headers: {
        'authorization': localStorage.token,
        'room_id': props.currentRoomID
      }
    })
    .then(props.dispatch({type: 'DELETE_PLAYER_FROM_ROOM', payload: props._id}))
  }

  return (
    <div>
      <div className="refresh-icon-div" onClick={handleRefresh}>
        <img src={circleArrow} alt='refresh'/>
      </div>
      <div className="delete-icon-div" onClick={handleDelete}>
        <img src={xIcon} alt='delete'/>
      </div>
      <h1>{props.handle}</h1>
      <h6>{props.nickname}</h6>
      <h6>{props.stats.platformNameLong}</h6>
      <div>
        <h4>Life Time Stats</h4>
        <p>Wins: {wins}</p>
        <p>Win%: {winPercentage}</p>
        <p>Kills: {kills}</p>
        <p>K/D: {kdRatio}</p>
        <p>Matches Played: {matchesPlayed}</p>
      </div>
      <div>
        {props.stats.recentMatches.length > 1 && <LineChartComponent data={props.stats.recentMatches}/> }
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    currentRoomID: state.room.room_details._id
  }
}

export default connect(mapStateToProps)(PlayerCard)
