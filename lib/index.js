import express from 'express';
import bodyParser from 'body-parser';
import React from 'react';
import Tabs from './Tabs';
const ReactDOMServer = require("react-dom/server");

const app = express()
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: '****',
  password: '****',
  database: '****'
});
const fs = require('fs'); // this engine requires the fs module

app.engine('ntl', function(filePath, options, callback) { // define the template engine
  fs.readFile(filePath, function (err, content) {
    if (err) return callback(err);
    const rendered = content.toString()
                    .replace('#index#', options.index)
                    .replace('#about#', options.about)
                    .replace('#feedback#', options.feedback)
                    .replace('#users#', options.users)
                    ;
    return callback(null, rendered);
  });
});

app.set('views', 'views');

app.set('view engine', 'ntl');

app.use(express.static('public'));

// Get HomePage - Landing Page
app.get('/', function (req, res) {
    const index = ReactDOMServer.renderToString(<Tabs />);
    res.render('index', {index: index});
    // res.render(<Tabs />);
    // res.send( <Tabs /> );
});

app.get('/about', function (req, res) {
  const about = "<div class='aboutContent'><div class='about'>About</div></div>";
  res.render('about', {about: about});
});

app.get('/feedback', function (req, res) {
  const feedback = "<div class='aboutContent'><div class='about'>Feedback</div></div>";
  res.render('feedback', {feedback: feedback});
});

app.get('/users', function (req, res) {
  const users = "<div class='aboutContent'><div class='about'>Hi People</div></div>";
  res.render('users', {users: users});
});


app.get('/religion', function (req, res) {
    const sqlComments = "SELECT count(*) AS number, easycoopfin.religion.religion_name AS name from easycoopfin.member " +
                        "join easycoopfin.religion on easycoopfin.member.religion_id = easycoopfin.religion.religion_id " +
                        "group by easycoopfin.member.religion_id";
    connection.query(sqlComments, function(error, result) {
            if (error) throw error;
            res.send(JSON.stringify({'data': result}));
    });
});

app.get('/timein_fr', function (req, res) {
    const sqlComments = "select walked_in AS state, count(*) AS number from front_office.front_off  "+
                        "GROUP BY  "+
                        "UNIX_TIMESTAMP(walked_in) DIV 3600 "+
                        "order by number desc";
    connection.query(sqlComments, function(error, result) {
            if (error) throw error;
            res.send(JSON.stringify({'data': result}));
    });
});

app.get('/timeout_fr', function (req, res) {
    const sqlComments = "select end AS state, count(*) AS number from front_office.front_off  "+
                        "GROUP BY  "+
                        "UNIX_TIMESTAMP(end) DIV 3600 "+
                        "order by number desc";
    connection.query(sqlComments, function(error, result) {
            if (error) throw error;
            res.send(JSON.stringify({'data': result}));
    });
});

app.get('/purpose_fr', function (req, res) {
    const sqlComments = "select enquiry AS state, count(*) AS number from front_office.front_off "+
                        "GROUP BY enquiry "+
                        "order by number desc";
    connection.query(sqlComments, function(error, result) {
            if (error) throw error;
            res.send(JSON.stringify({'data': result}));
    });
});

app.get('/timespentinoffice_fr', function (req, res) {
    const sqlComments = "SELECT TIMESTAMPDIFF(MINUTE,walked_in, `end`) AS state, count(*) AS number from front_office.front_off "+
                        "where walked_in <> '' AND end <> '' GROUP BY state order by number desc limit 20";
    connection.query(sqlComments, function(error, result) {
            if (error) throw error;
            res.send(JSON.stringify({'data': result}));
    });
});
app.get('/timespentinqueue_fr', function (req, res) {
    const sqlComments = "SELECT TIMESTAMPDIFF(MINUTE,walked_in, `start`) AS state, count(*) AS number from front_office.front_off "+
                        "where walked_in <> '' AND end <> '' GROUP BY state order by number desc limit 20";
    connection.query(sqlComments, function(error, result) {
            if (error) throw error;
            res.send(JSON.stringify({'data': result}));
    });
});

app.get('/frontofficers_fr', function (req, res) {
    const sqlComments = "select opened as state, count(*) AS number from front_office.front_off "+
"group by opened "+
"order by number desc "+
"limit 6";
    connection.query(sqlComments, function(error, result) {
            if (error) throw error;
            res.send(JSON.stringify({'data': result}));
    });
});

app.get('/agebrackets', function (req, res) {
    const sqlComments = "SELECT count(*) AS number, "+
						  "CASE "+
                          "WHEN (SELECT DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), dob)), '%Y')+0 AS age) BETWEEN 0 AND 9 THEN '0 to 9' "+
						  "WHEN (SELECT DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), dob)), '%Y')+0 AS age) BETWEEN 10 and 19 THEN '10 to 19' "+
						  "WHEN (SELECT DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), dob)), '%Y')+0 AS age) BETWEEN 20 and 29 THEN '20 to 29' "+
						  "WHEN (SELECT DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), dob)), '%Y')+0 AS age) BETWEEN 30 and 39 THEN '30 to 39' "+
						  "WHEN (SELECT DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), dob)), '%Y')+0 AS age) BETWEEN 40 and 49 THEN '40 to 49' "+
						  "WHEN (SELECT DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), dob)), '%Y')+0 AS age) BETWEEN 50 and 59 THEN '50 to 59' "+
						  "WHEN (SELECT DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), dob)), '%Y')+0 AS age) >= 60 THEN '60 +'  "+
                          "END AS age "+
						  "FROM easycoopfin.member "+
                          "GROUP BY age "+
                          "ORDER BY number DESC";
    connection.query(sqlComments, function(error, result) {
            if (error) throw error;
            res.send(JSON.stringify({'data': result}));
    });
});

app.get('/gender', function (req, res) {
    const sqlComments = "SELECT count(*) AS number, " +
                        "CASE gender " +
                        "WHEN 'M' THEN 'Male' " +
                        "WHEN 'F' THEN 'Female' " +
                        "END AS gender FROM easycoopfin.member " +
                        "group by easycoopfin.member.gender";
    connection.query(sqlComments, function(error, result) {
            if (error) throw error;
            res.send(JSON.stringify({'data': result}));
    });
});

app.get('/companies', function (req, res) {
    const sqlComments = "SELECT count(*) AS number, company.NAME AS companies from easycoopfin.member " +
                        "join easycoopfin.company on easycoopfin.member.company_id = easycoopfin.company.ID " +
                        "group by easycoopfin.member.company_id " +
                        "order by number desc";
    connection.query(sqlComments, function(error, result) {
            if (error) throw error;
            res.send(JSON.stringify({'data': result}));
    });
});

app.get('/mobile', function (req, res) {
    const sqlComments = "SELECT count(*) AS number, company.NAME AS companies from easycoopfin.member " +
                        "join easycoopfin.company on easycoopfin.member.company_id = easycoopfin.company.ID " +
                        "group by easycoopfin.member.company_id " +
                        "order by number desc";
    connection.query(sqlComments, function(error, result) {
            if (error) throw error;
            res.send(JSON.stringify({'data': result}));
    });
});

app.get('/states_greenpole', function (req, res) {
  /*
    const sqlComments = "SELECT count(*) AS number, " +
                        "state_of_origin AS state FROM greenpole2.holder " +
                        "group by state_of_origin order by number desc";
                        */
    const sqlComments = "SELECT count(*) AS number, "+
"CASE  "+
"WHEN state_of_origin IS NULL THEN 'No Data' ELSE state_of_origin "+
"END AS state FROM greenpole2.holder "+
"group by state_of_origin order by number desc";
    connection.query(sqlComments, function(error, result) {
            if (error) throw error;
            res.send(JSON.stringify({'data': result}));
    });
});

app.get('/gender_greenpole', function (req, res) {
    const sqlComments = "SELECT count(*) AS number, gender  FROM greenpole2.holder " +
                        "group by gender";
    connection.query(sqlComments, function(error, result) {
            if (error) throw error;
            res.send(JSON.stringify({'data': result}));
    });
});

app.get('/agebracket_greenpole', function (req, res) {
    const sqlComments = "SELECT count(*) AS number, " +
						  "CASE " +
                          "WHEN (SELECT DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), dob)), '%Y')+0 AS age) BETWEEN 0 AND 9 THEN '0 to 9' " +
						  "WHEN (SELECT DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), dob)), '%Y')+0 AS age) BETWEEN 10 and 19 THEN '10 to 19' " +
						  "WHEN (SELECT DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), dob)), '%Y')+0 AS age) BETWEEN 20 and 29 THEN '20 to 29' " +
						  "WHEN (SELECT DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), dob)), '%Y')+0 AS age) BETWEEN 30 and 39 THEN '30 to 39' " +
						  "WHEN (SELECT DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), dob)), '%Y')+0 AS age) BETWEEN 40 and 49 THEN '40 to 49' " +
						  "WHEN (SELECT DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), dob)), '%Y')+0 AS age) BETWEEN 50 and 59 THEN '50 to 59' " +
						  "WHEN (SELECT DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), dob)), '%Y')+0 AS age) >= 60 THEN '60 +' " +
                          "END AS agegroup " +
						  "FROM greenpole2.holder " +
                          "GROUP BY agegroup " +
                          "ORDER BY number DESC";
    connection.query(sqlComments, function(error, result) {
            if (error) throw error;
            res.send(JSON.stringify({'data': result}));
    });
});

app.get('/lga_greenpole', function (req, res) {
    const sqlComments = "SELECT count(*) AS number, "+
                        "CASE  "+
                        "WHEN local_govt_area IS NULL THEN 'No LGA' "+
                        "WHEN local_govt_area = '' THEN 'No LGA' "+
                        "ELSE local_govt_area "+
                        "END AS lga "+
                        "FROM greenpole2.holder "+
                        "group by local_govt_area";
    connection.query(sqlComments, function(error, result) {
            if (error) throw error;
            res.send(JSON.stringify({'data': result}));
    });
});

app.get('/marital_greenpole', function (req, res) {
    const sqlComments = "SELECT count(*) AS number, "+
                        "CASE "+
                        "WHEN marital_status IS NULL THEN 'No Data' "+
                        "WHEN marital_status = '' THEN 'No Data' "+
                        "ELSE marital_status "+
                        "END AS status FROM greenpole2.holder "+
                        "group by marital_status order by number desc";
    connection.query(sqlComments, function(error, result) {
            if (error) throw error;
            res.send(JSON.stringify({'data': result}));
    });
});

app.get('/occupation_greenpole', function (req, res) {
    const sqlComments = "SELECT count(*) AS number, " +
                        "CASE " +
                        "WHEN occupation IS NULL THEN 'No Data' " +
                        "WHEN occupation = '' THEN 'No Data' " +
                        "ELSE occupation " +
                        "END AS status FROM greenpole2.holder " +
                        "group by occupation order by number desc";
    connection.query(sqlComments, function(error, result) {
            if (error) throw error;
            res.send(JSON.stringify({'data': result}));
    });
});

app.get('/states_mutualfunds', function (req, res) {
    const sqlComments = "SELECT count(*) AS number, " +
                        "CASE " +
                        "WHEN state IS NULL THEN 'No State' " +
                        "ELSE state " +
                        "END AS state " +
                        "FROM greenpole2.mutual_fund_account "+
                        "group by state";
    connection.query(sqlComments, function(error, result) {
            if (error) throw error;
            res.send(JSON.stringify({'data': result}));
    });
});

app.get('/country_mutualfunds', function (req, res) {
    const sqlComments = "SELECT count(*) AS number, " +
                        "CASE " +
                        "WHEN country IS NULL THEN 'No Country' "+
                        "WHEN country = '' THEN 'No Country' "+
                        "ELSE country " +
                        "END AS country "+
                        "FROM greenpole2.mutual_fund_account "+
                        "group by country";
    connection.query(sqlComments, function(error, result) {
            if (error) throw error;
            res.send(JSON.stringify({'data': result}));
    });
});

app.get('/email_mutualfunds', function (req, res) {
    const sqlComments = "SELECT count(*) AS number, "+
                        "CASE "+
                        "WHEN email IS NULL THEN 'No Email'  "+
                        "WHEN email = '' THEN 'No Email'  "+
                        "ELSE email "+
                        "END AS email "+
                        "FROM greenpole2.mutual_fund_account "+
                        "group by email order by number desc";
    connection.query(sqlComments, function(error, result) {
            if (error) throw error;
            res.send(JSON.stringify({'data': result}));
    });
});

app.get('/principal_mutualfunds', function (req, res) {
    const sqlComments = "SELECT count(*) AS number, " +
                        "CASE " +
                        "WHEN principal_amount IS NULL THEN 'None'  " +
                        "WHEN principal_amount = '' THEN 'None'  " +
                        "ELSE principal_amount  " +
                        "END AS principal  " +
                        "FROM greenpole2.mutual_fund_account  " +
                        "group by principal_amount  " +
                        "order by principal_amount desc";
    connection.query(sqlComments, function(error, result) {
            if (error) throw error;
            res.send(JSON.stringify({'data': result}));
    });
});

app.get('/units_mutualfunds', function (req, res) {
    const sqlComments = "SELECT count(*) AS number, " +
                        "CASE " +
                        "WHEN units IS NULL THEN 'None'  " +
                        "WHEN units = '' THEN 'None'  " +
                        "ELSE units  " +
                        "END AS units  " +
                        "FROM greenpole2.mutual_fund_account  " +
                        "group by units  " +
                        "order by units desc";
    connection.query(sqlComments, function(error, result) {
            if (error) throw error;
            res.send(JSON.stringify({'data': result}));
    });
});

app.get('/lga_mutualfunds', function (req, res) {
    const sqlComments = "SELECT count(*) AS number, "+
                        "CASE "+
                        "WHEN lga IS NULL THEN 'No LGA'  "+
                        "WHEN lga = '' THEN 'No LGA' "+
                        "ELSE lga "+
                        "END AS lga "+
                        "FROM greenpole2.mutual_fund_account "+
                        "group by lga";
    connection.query(sqlComments, function(error, result) {
            if (error) throw error;
            res.send(JSON.stringify({'data': result}));
    });
});

app.get('/city_mutualfunds', function (req, res) {
    const sqlComments = "SELECT count(*) AS number, " +
                        "CASE " +
                        "WHEN city IS NULL THEN 'No City'  " +
                        "WHEN city = '' THEN 'No City' " +
                        "ELSE city " +
                        "END AS city " +
                        "FROM greenpole2.mutual_fund_account " +
                        "group by city";
    connection.query(sqlComments, function(error, result) {
            if (error) throw error;
            res.send(JSON.stringify({'data': result}));
    });
});

app.get('/email_greenpole', function (req, res) {
    const sqlComments = "SELECT "+
                        "(SELECT COUNT(*) FROM greenpole2.holder)- "+
                        "(SELECT COUNT(*) from greenpole2.holder_email_address) "+
                        "AS number, 'NoEmail' AS 'name' "+
                        "UNION "+
                        "select count(*) as number, "+
                        "CASE "+
                        "WHEN email_address IS NULL THEN 'No Email Addr' "+
                        "WHEN email_address = '' THEN 'No Email' "+
                        "ELSE 'hasEmail' "+
                        "END AS name  "+
                        "FROM greenpole2.holder_email_address";
    connection.query(sqlComments, function(error, result) {
            if (error) throw error;
            res.send(JSON.stringify({'data': result}));
    });
});

app.get('/mobile_greenpole', function (req, res) {
    const sqlComments = "";
    connection.query(sqlComments, function(error, result) {
            if (error) throw error;
            res.send(JSON.stringify({'data': result}));
    });
});

app.get('/query_shareholder', function (req, res) {
    const sqlComments = "select distinct first_name from greenpole2.holder limit 500";
    connection.query(sqlComments, function(error, result) {
            if (error) throw error;
            res.send(JSON.stringify({'data': result}));
    });
});

app.listen(3838, () => console.log('Example app listening on port 3838!'))
