import React from 'react'
import LineChartComponent from './LineChartComponent'

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

  return (
    <div>
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

export default PlayerCard
