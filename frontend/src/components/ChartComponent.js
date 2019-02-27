import React from 'react'
import {Doughnut} from 'react-chartjs-2';

const ChartComponent = (props) => {
  return(
    <div style={{width: '700px'}}>
      <Doughnut data={props.data}/>
    </div>
  )
}

export default ChartComponent;