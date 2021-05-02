var config = require('./db-config.js');
var mysql = require('mysql');

config.connectionLimit = 10;
var connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */

function getAllCities(req, res) {
  var query = `
    SELECT DISTINCT city_name
    FROM airbnb.covid_hospitalization;
  `;
  
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

function getTopInCity(req, res) {
  var inputCity = req.params.city;
  var query = `SELECT t.listing_id, MAX(t.listing_name) AS listing_name,
  lc.city_name, lc.neighborhood,
  t.avg_review_scores_rating
  FROM
  (SELECT c.*, l.listing_name
  FROM
  (SELECT r.*, rq.avg_review_scores_rating
  FROM
  (SELECT listing_id,
  COUNT(DISTINCT MONTH(date)) as num_months_reviewed
  FROM airbnb.review_qual
  GROUP BY listing_id
  HAVING COUNT(DISTINCT MONTH(date))>=9) r
  JOIN
  (SELECT listing_id,
  AVG(review_scores_rating) AS avg_review_scores_rating
  FROM airbnb.review_quant
  GROUP BY listing_id) rq
  ON r.listing_id = rq.listing_id
  WHERE avg_review_scores_rating IN
  (SELECT
  MAX(avg_review_scores_rating) AS avg_review_scores_rating
  FROM
  (SELECT listing_id,
  AVG(review_scores_rating) AS avg_review_scores_rating
  FROM airbnb.review_quant
  GROUP BY listing_id) s1
  )) c
  JOIN
  (SELECT DISTINCT id,
  name as listing_name
  FROM airbnb.listing) l
  ON c.listing_id = l.id) t
  JOIN airbnb.location lc
  ON t.listing_id = lc.listing_id
  WHERE UPPER(city_name) = UPPER('${inputCity}') AND neighborhood IS NOT NULL
  GROUP BY
  t.listing_id,
  lc.city_name, lc.neighborhood
  ORDER BY listing_id LIMIT 10`;
  
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });  
};


function getAllListingsByZipcodeAndAmenities(req, res) {
  var query = `
    SELECT c.name, c.zipcode, c.name, c.neighborhood, c.city_name, c.listing_id, MAX(c.amenities) AS amenities, MIN(c.url) as url
    FROM 
    (SELECT * FROM
	  airbnb.location lc
      JOIN
      airbnb.listing ls
      ON lc.listing_id = ls.id
      WHERE lc.zipcode = '${req.params.writtenZipcode}' and lc.neighborhood IS NOT NULL  and UPPER(ls.amenities) 
      LIKE UPPER('%${req.params.writtenAmenities}%')) c 
      GROUP BY c.name, c.zipcode, c.name, c.neighborhood, c.city_name, c.listing_id
      LIMIT 30`;
  
    connection.query(query, function(err, rows, fields) {
      if (err) console.log(err);
      else {
        res.json(rows);
      }
  });
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

/*This route gives the location of all available listings given the city and month.*/
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
  ON c.listing_id = rt.listing_id AND c.data_month = rt.data_month WHERE c.has_availability <> 'f' LIMIT 30`;

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/*This route displays all reviews based on a keyword. */
function getRecs(req, res) {
  var inputReviewKey = req.params.reviewKey;
  var query = `
      SELECT 
      C2.city_name, C2.name, 
      C2.comments, RV.reviewer_name, C2.date
      FROM
      (SELECT 
      C1.city_name, C1.name, 
      RQ.comments, RQ.date, RQ.reviewer_id
      FROM 
      (SELECT LS.id, LS.name, 
      LS.data_month, LC.city_name
      FROM
      airbnb.listing LS
      JOIN airbnb.location LC
      ON LS.id = LC.listing_id) C1 
      JOIN airbnb.review_qual RQ
      ON C1.id = RQ.listing_id 
      AND C1.data_month = MONTH(RQ.date)) C2
      JOIN airbnb.reviewer RV
      ON C2.reviewer_id = RV.id
      WHERE UPPER(C2.comments) LIKE UPPER('%${inputReviewKey}%');
    `; 
    
    connection.query(query, function(err, rows, fields) {
      if (err) console.log(err);
      else {
        res.json(rows);
      }
    });  
};

/* This route displays all information regarding covid hospitalization rates
and cancellations.*/
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


function getHostInfo(req, res) {
  var query = `
    WITH 
    C1 AS 
    (SELECT ls.host_id, ls.id
    FROM
    airbnb.host h JOIN airbnb.listing ls
    ON h.id = ls.host_id), 
    C2 AS
    (SELECT id, host_id, city_name
    FROM C1 JOIN airbnb.location lt
    ON id = lt.listing_id),
    C3 AS 
    (SELECT host_id,
    COUNT(distinct city_name) as num_cities,
    COUNT(distinct id) as num_listings 
    FROM C2 
    GROUP BY host_id
    HAVING COUNT(distinct city_name)>1)
    SELECT distinct r.host_id, hs.name as host_name,
    r.num_cities, r.num_listings, hs.about, hs.url, hs.picture
    FROM C3 r
    JOIN
    (SELECT id, name, about, url, picture FROM airbnb.host WHERE about IS NOT NULL) hs
    ON r.host_id = hs.id
    ORDER BY num_listings DESC LIMIT 15;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};


// The exported functions, which can be accessed in index.js.
module.exports = {
  getAllCities: getAllCities,
  getTopInCity: getTopInCity,
  getAllListingsByZipcodeAndAmenities:getAllListingsByZipcodeAndAmenities,
  getAllLocations: getAllLocations,
  getAllLocationsSpecifiedByCityAndMonth: getAllLocationsSpecifiedByCityAndMonth,
  getRecs: getRecs,
  getCovidCancellations: getCovidCancellations,
  getHostInfo: getHostInfo
}