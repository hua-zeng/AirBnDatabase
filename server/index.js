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


app.get('/listings', routes.getAllListings);

app.get('/location', routes.getAllLocations);

app.get('/location/:selectedCity/:selectedMonth', routes.getAllLocationsSpecifiedByCityAndMonth);

app.get('/reviews/:reviewKey', routes.getRecs);
app.get('/covid/:selectedCity', routes.getCovidCancellations);


app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});