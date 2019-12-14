/**
* Chart
*/

import React from 'react';
import Chart from 'chart.js';

import './styles.css';

function customLabel(e){
  return {text: "$"};
}
class Charts extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const { records, labels, title, type, labelCurrency="" } = this.props;
    const ctx = this.chart.getContext('2d');
    const chartColors = ["#E84423","#ECCB2F","#5D9A20","#710026","#8CBBF5","#A6CD19","#4A176A","#EA9223","#253E7C"];
    const stepSize = records ? Math.ceil(records.reduce((acc, i) => {
        if (!isNaN(i)) {
          return acc > i ? acc : i;
        }
        return acc;
      }, 0) / 10) : 1;

    const chartOptions = {
      'bar' :
        {
          legend: {
            display: false,
          },
          scales: {
            yAxes: [{
              ticks: {
                min: 0,
                stepSize,
              },
            }],
          },
        },
      'pie' : {},
      'doughnut' : {
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              const label = data.labels[tooltipItem.index];
              let value = data.datasets[0].data[tooltipItem.index] || 'Other';
              value = (value < 1e-3) ? "" : value;
              return value ? label + ': ' + labelCurrency + value : label;
            }
          }
        },
        legend: {
          display: false,
        },
      }
    };
    const data = {
      labels,
      datasets: [
        {
          label: title,
          fill: false,
          lineTension: 0.1,
          backgroundColor: (type === 'bar') ? '#E84423' : chartColors,
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: '#817D7D',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#ef8b5d',
          pointHoverBorderColor: '#ea6225',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: records,
          spanGaps: false,
        },
      ],
    };

    new Chart(ctx, {
      data,
      type,
      options: chartOptions[type],
    });
  }


  render() {
    return (
      <div className="chart">
        <canvas ref={(c) => { this.chart = c; }} height="200" width="250"/>
      </div>
    );
  }
}

export default Charts;
