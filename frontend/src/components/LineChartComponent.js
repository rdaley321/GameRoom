import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChartComponent = (props) => {
  let arr = []
  for (let i = 1; i < props.data.length + 1; i++) {
    arr.push(`Game ${i}`)
  }

  const data = {
    labels: arr,
    datasets: [
      {
        label: 'Recent-Game Kills',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: props.data.map(obj => obj.kills)
      }
    ]
  };

  return (
    <div style={{width: '300px', margin: '0 auto'}}>
      <Line data={data}/>
    </div>
  )
}

export default LineChartComponent





//
// export default React.createClass({
//   displayName: 'LineExample',
//
//   render() {
//     return (
//       <div>
//         <h2>Line Example</h2>
//         <Line data={data} />
//       </div>
//     );
//   }
// });
