import React from 'react'
import {Doughnut} from 'react-chartjs-2';

const ChartComponent = (props) => {
  return(
    <div className="pointer" style={{width: '600px'}}>
      <Doughnut data={props.data}/>
    </div>
  )
}

export default ChartComponent;
