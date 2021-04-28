const bodyParser = require('body-parser');
const express = require('express');
var routes = require('./routes.js');
const cors = require('cors');

const app = express();

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/* ---------------------------------------------------------------- */
/* ------------------- Route handler registration ----------------- */
/* ---------------------------------------------------------------- */

app.get('/', (req, res) => {
	//res.send('Welcome to AirBnDatabase ;) -- Go to /listings to see all listings (limit 10) in the server response of the terminal!');
	res.write('<body><p>Welcome to AirBnDatabase ;) -- Go to /listings to see all listings (limit 10) in the server response of the terminal!<\p><a href="http://localhost:3000/listings"><button>LISTINGS</button></a></body>');
});

app.get('/listings', routes.getAllListings);

app.get('/locations', routes.getAllLocations);


app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});