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
	res.send('Welcome to AirBnDatabase ;) -- Go to /listings to see all listings (limit 10) in the server response of the terminal!')
});

app.get('/listings', routes.getAllListings);



app.listen(3000, () => {
	console.log(`Server listening on PORT 3000`);
});