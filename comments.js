// Create web server application
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Set up MySQL connection
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'comments'
});

// Connect to MySQL
connection.connect(function(err) {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }

  console.log('Connected as id ' + connection.threadId);
});

// Set up GET route to display all comments
app.get('/', function(req, res) {
  connection.query('SELECT * FROM comments', function(err, rows, fields) {
    if (err) {
      console.error('Error querying: ' + err.stack);
      return;
    }

    res.send(rows);
  });
});

// Set up POST route to add a comment
app.post('/', function(req, res) {
  connection.query('INSERT INTO comments SET ?', req.body, function(err, result) {
    if (err) {
      console.error('Error inserting: ' + err.stack);
      return;
    }

    res.send('Inserted ' + result.affectedRows + ' row(s).');
  });
});

// Listen on port 3000
app.listen(3000, function() {
  console.log('Server listening on port 3000.');
});