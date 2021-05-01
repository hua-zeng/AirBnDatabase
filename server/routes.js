var config = require('./db-config.js');
var mysql = require('mysql');

config.connectionLimit = 10;
var connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */

function getAllListings(req, res) {
  var query = `
  SELECT * FROM airbnb.listing LIMIT 10;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  })
};

function getAllLocations(req, res) {
  var query = `
    SELECT * FROM airbnb.location LIMIT 10;;
  `;
  
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};


function getAllLocationsSpecifiedByCityAndMonth(req, res) {
  var query = `
  SELECT c.url, c.listing_id, c.name as listing_name,
  c.neighborhood, c.price,
  rt.review_scores_rating, c.has_availability
  FROM
  (SELECT * FROM
  airbnb.location lc
  JOIN
  airbnb.listing ls
  ON lc.listing_id = ls.id
  WHERE lc.city_name = '${req.params.selectedCity}' AND ls.data_month = '${req.params.selectedMonth}' AND lc.neighborhood IS NOT NULL) c
  JOIN
  airbnb.review_quant rt
  ON c.listing_id = rt.listing_id AND c.data_month = rt.data_month LIMIT 30`;

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};


function getCovidCancellations(req, res) {
  var query =`WITH covid_cancellations AS (
    SELECT COUNT(*) AS cancellations, month(date) AS data_month
    FROM airbnb.review_qual A
    JOIN airbnb.listing B
    ON A.listing_id = B.id
    JOIN airbnb.location C
    ON B.id = C.listing_id
    WHERE city_name = '${req.params.selectedCity}'
    AND (comments LIKE '%covid%' OR comments LIKE '%cancel%')
    GROUP BY month(date)),

    covid_cases AS (
      SELECT AVG(num_covid_hosp) AS covid_cases, month(date) AS data_month
      FROM airbnb.covid_hospitalization
      WHERE city_name = '${req.params.selectedCity}' 
      GROUP BY month(date))

  SELECT A.data_month, covid_cases, cancellations
  FROM covid_cases C
  JOIN
  covid_cancellations A
  ON
  C.data_month = A.data_month`;

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};




// The exported functions, which can be accessed in index.js.
module.exports = {
	getAllListings: getAllListings,
  getAllLocations: getAllLocations,
  getAllLocationsSpecifiedByCityAndMonth: getAllLocationsSpecifiedByCityAndMonth,
  getCovidCancellations: getCovidCancellations
}