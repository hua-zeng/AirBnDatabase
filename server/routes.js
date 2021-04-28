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


// The exported functions, which can be accessed in index.js.
module.exports = {
	getAllListings: getAllListings
}