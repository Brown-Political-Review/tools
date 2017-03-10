var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

//Set up the port
app.set('port', (process.env.PORT || 5000));

//Set up the uri for mongolab
var uristring = process.env.MONGODB_URI || 'localhost';

//Set up mongoose
mongoose.connect(uristring);
var Tool = mongoose.model('Tool', {
  name: String,
  tags: Array,
  description: String,
  url: String,
  resources: String
})

//Set up express
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': true}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());


//Create our api routes

//First the route to get all tools
app.get('/api/tools', function(req, res) {
  //Look in the database for all tools
  Tool.find()
    .sort({title: 1})
    .exec(function(err, tools) {
    if (err) {
      res.send(err);
    }
    res.json(tools);
  });
});

app.post('/api/tools', function(req, res) {
  var tags = req.body.tags.split(",");
  for (i=0; i<tags.length; i++) {
    tags[i] = tags[i].replace(/^\s+|\s+$/g, "");
  }
  Tool.create({
    name: req.body.name,
    tags: tags,
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

//Api to just get the tools with a particular tag
app.get('/api/tag/:tag', function(req, res) {
  var tag = req.params.tag;
  //Look in the database for all tools with that tag
  Tool.find({tags: {$in: [tag]}})
    .sort({title: 1})
    .exec(function(err, tools) {
    if (err) {
      res.send(err);
    }
    res.json(tools);
  });
});


//Set up our front end
app.get('*', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

//Listen and start app
app.listen(app.get('port'), function(){
  console.log("node is running on port", app.get('port'));
});
