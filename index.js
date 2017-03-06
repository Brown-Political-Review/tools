var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

/*//Set up mongoose
mongoose.connect('localhost');
var Tool = mongoose.model('Tool', {
  name: String,
  tags: Array,
  description: String
})*/

//Set up express
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': true}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());


//Create our api routes

/*//First the route to get all tools
app.get('/api/tools', function(req, res) {
  //Look in the database for all tools
  Tool.find(function(err, tools) {
    if (err) {
      res.send(err);
    }
    res.json(tools);
  });
});

app.post('/api/tools', function(req, res) {
  Tool.create({
    name: req.body.name,
    tags: req.body.tags,
    description: req.body.description
  }, function(err, tool) {
    if (err) {
      res.send(err);
    }
    //get and return all tools after you create one
    Tool.find(function(err, tools) {
      if (err) {
        res.send(err);
      }
      res.json(tools);
    });
  });
});
*/
//Listen and start app
app.listen(80);
