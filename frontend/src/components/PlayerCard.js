import React from 'react'

const PlayerCard = (props) => {
  return (
    <div>
      <h3>{props.handle}</h3>
      <h4>{props.nickname}</h4>
    </div>
  )
}

export default PlayerCard
