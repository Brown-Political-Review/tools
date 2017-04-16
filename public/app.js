//Set up the angular app
var app = angular.module("tools", ['ngRoute', 'ngSanitize']);

app.config(function($routeProvider) {
  $routeProvider
    .when("/submit", {
      templateUrl: "submit.html",
      controller: "SubmitCtrl"
    })
    .when("/", {
      templateUrl: "main.html",
      controller: "MainCtrl"
    })
    .when("/tag/:tag", {
      templateUrl: "main.html",
      controller: "TagCtrl"
    })
})

//Create a controller
app.controller('MainCtrl', function($scope, $http){
    $scope.taglist = true;
    $http.get('/api/tools')
      .success(function(data) {
        $scope.tools = data;
        $scope.tags = [];
        var tag_names = [];
        for (i=0; i<data.length; i++) {
          var tool_tags = data[i].tags;
          for (j=0; j<tool_tags.length; j++) {
            tag = {"tag": tool_tags[j], "clicked": true};
            if (tag_names.includes(tag["tag"])==false) {
              $scope.tags.push(tag);
              tag_names.push(tag["tag"])
            }
          }
        }
      })
      .error(function(data) {
        console.log('Error' + data)
      });
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
      setTimeout(sameHeights, 10);
    }
    $scope.turnAllTagsOff = function() {
      for (i=0; i<$scope.tags.length; i++) {
        console.log(tag)
        tag.clicked = false;
      }
    }
    $scope.turnAllTagsOn = function() {
      for (i=0; i<$scope.tags.length; i++) {
        console.log(tag)
        tag.clicked = true;
      }
    }
  }
);

app.controller('TagCtrl', function($scope, $http, $routeParams){
    $scope.taglist = true;
    $http.get('/api/tag/' + $routeParams.tag)
      .success(function(data) {
        $scope.tools = data;
        $scope.tags = [{"tag": $routeParams.tag, "clicked": true}];
      })
      .error(function(data) {
        console.log('Error' + data)
      });
    $scope.tagActivated = function(){ return true};
  }
);

app.controller('SubmitCtrl', function($scope, $http){
  $scope.formData = {};
  //Create a function to submit the form data
  $scope.createTool = function(){
    $http.post('/api/tools', $scope.formData)
      .success(function(data) {
        $scope.formData = {};
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  }
});
