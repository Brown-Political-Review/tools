//Set up the angular app
var app = angular.module("tools", []);

//Create a controller
app.controller('MainCtrl', [
  '$scope', function($scope){
    $scope.tools = [
      {title: 'tool1', tags:['tag1', 'tag2']},
      {title: 'tool2', tags:['tag2', 'tag3']},
      {title: 'tool1', tags:['tag1', 'tag2']},
      {title: 'tool2', tags:['tag2', 'tag3']},
      {title: 'tool1', tags:['tag1', 'tag2']},
      {title: 'tool2', tags:['tag2', 'tag3']},
    ];
    $scope.tags = [
      {tag: 'tag1', clicked: true},
      {tag: 'tag2', clicked: false},
      {tag: 'tag3', clicked: false},
      {tag: 'tag4', clicked: true},
      {tag: 'tag5', clicked: false},
      {tag: 'tag6', clicked: false},
      {tag: 'tag7', clicked: true},
      {tag: 'tag8', clicked: false},
      {tag: 'tag9', clicked: false},
      {tag: 'tag10', clicked: true},
      {tag: 'tag11', clicked: false},
      {tag: 'tag12', clicked: false},
      {tag: 'tag13', clicked: true},
      {tag: 'tag14', clicked: false},
      {tag: 'tag15', clicked: false},
      {tag: 'tag16', clicked: true},
      {tag: 'tag17', clicked: false},
      {tag: 'tag18', clicked: false},
    ];
    $scope.tagActivated = function(tool) {
      for (i=0; i<tool.tags.length; i++){
        var tagObj = $scope.tags.find(x => x.tag===tool.tags[i]);
        if (typeof tagObj != "undefined") {
          if (tagObj["clicked"]){
            return true;
          }
        }
      }
      return false;
    }
    $scope.toggleTag = function(tag) {
      tag.clicked = !tag.clicked;
    }
  }
]);
