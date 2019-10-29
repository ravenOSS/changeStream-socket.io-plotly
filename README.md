<h3 align="center">changeStream-socket.io-plotly</h3>

<div align="center">

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> Skeleton code for displaying live streaming data with MongoDB change stream, socket.io, and plotly.js charting
    <br> 
</p>

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [TODO](../TODO.md)
- [Contributing](../CONTRIBUTING.md)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## About <a name = "about"></a>

Display data from a MongoDB instance using change streams.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites
node.js ^8.0.0
npm (installed with node.js)

A mongoDB replica set. Create free Atlas account at mongodb.com or create replicaset on your local machine. For testing, look at the docs for a single node replicaset.

### Installing

This is example code and not a library.

Either clone the repo or download zip and unpack.
```
git clone changeStream-socket.io-plotly && cd changeStream-socket.io-plotly
```

Install dependencies
```
npm install
```

rename example.dotenv to .env && edit atlas URL to include your username, password and url (obtained from Atlas console)
```
atlasURL = 'mongodb+srv://<userName>:<password>@<yourMongoInstance.mongodb.net/test?retryWrites=true&w=majority'
```

Data generator. Open a terminal window in the code root directory and start the generator with the following command. A timestamp and random data should be logged to the console.
```
node generator.js
```

Open another terminal window. Start the application. Status and port number should be logged to the console. If you get an error message about port in use, edit code and change port number
```
npm start
```

Open browser window and enter localhost:<port>
```
localhost:3300
```

A simply styled chart will render in the window and a dynamic trace will be built and updated at the same frequency as generator.js is configured. To change the freq just edit generator.js and change the setInterval timer (ms).

To change the number of datapoints displayed, edit plotlyChart.html (views dir) and modify
```
const dataPoints = 15
```

### Coding style tests

Eslint 'standard'

## Usage <a name="usage"></a>

Change generator.js to modify the generated data. Consider multiple data types and use Mongo's aggregation pipeline to create different change streams.

## Deployment <a name = "deployment"></a>

This is not production code. It has been stripped down to aid readability.

##  Built Using <a name = "built_using"></a>

- [MongoDB](https://www.mongodb.com/) - Database
- [Express](https://expressjs.com/) - Server Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment
- [plotlyjs](https://plot.ly/javascript/)) - Charting library

## Authors <a name = "authors"></a>

- [@ravenIoT](https://github.com/ravenOSS)


## Acknowledgements <a name = "acknowledgement"></a>

- Hat tip to anyone whose code was used
- Inspiration
- References
