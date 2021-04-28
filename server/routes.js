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
  WHERE lc.city_name = '${req.params.selectedCity}' AND ls.data_month = '${req.params.selectedMonth}') c
  JOIN
  airbnb.review_quant rt
  ON c.listing_id = rt.listing_id AND c.data_month = rt.data_month LIMIT 25`;

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
  getAllLocationsSpecifiedByCityAndMonth: getAllLocationsSpecifiedByCityAndMonth
}