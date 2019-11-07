const layout = {
  title: 'Streaming data to Plotly',
  height: 600,
  width: 1000,
  font: {
    family: 'Lato',
    size: 20,
    color: 'rgb(100,150,200)'
  },
  plot_bgcolor: 'rgba(200,255,0,0.1)',
  margin: {
    pad: 10
  },
  xaxis: {
    title: 'Timestamp',
    titlefont: {
      family: 'Verdana, Sans-serif',
      color: 'rgb(100,150,200)',
      size: 18
    },
    type: 'date'
  },
  yaxis: {
    title: 'Data Measurement',
    titlefont: {
      family: 'Verdana, Sans-serif',
      color: 'rgb(100,150,200)',
      size: 18
    },
    type: 'linear',
    range: [0, 100]
  }
}

// Plotly requires an initial trace for animation to work
// Create a couple of x and y coordinates in arrays
const xArray0 = [moment().subtract(10, 'sec').format(), moment().format() ]
const yArray0 = [0, 0.2]

let trace0 = {
  x: xArray0,
  y: yArray0,
  type: 'scatter',
  mode: 'lines',
  line: { shape: 'spline' }
}

const data = [trace0]

Plotly.newPlot('pchart', data, layout)

const dataPoints = 15

const socket = io()
socket.on('chartData', (packet) => {
  console.log(`packet.Time: ${packet[0]}`)
  console.log(`packet.Data: ${packet[1]}`)

  if (xArray0.length < dataPoints) {
    xArray0.push(packet[0])
    yArray0.push(packet[1])
  } else {
    xArray0.push(packet[0])
    xArray0.shift()
    yArray0.push(packet[1])
    yArray0.shift()
  }

  trace0 = {
    xArray0,
    yArray0,
    type: 'scatter',
    mode: 'lines+text',
    line: { shape: 'spline' }
    //  line: {simplify: false},
  }

  const data = [trace0] // debug
  console.log(`xArray0 after new data: ${xArray0}`)
  console.log(`yArray0 after new data: ${yArray0}`)

  Plotly.animate('pchart', {
    data,
    traces: [0],
    layout: {
      xaxis: {
        range: [xArray0[0], xArray0[xArray0.length - 1]]
      }
    },
    transition: {
      duration: 2500,
      easing: 'cubic-in-out'
    }
  })
})
