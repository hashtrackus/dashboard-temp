Tweets = new Mongo.Collection("tweets");

function unique(arr) {
    var hash = {}, result = [];
    for ( var i = 0, l = arr.length; i < l; ++i ) {
        if ( !hash.hasOwnProperty(arr[i]) ) { //it works with objects! in FF, at least
            hash[ arr[i] ] = true;
            result.push(arr[i]);
        }
    }
    return result;
}

if (Meteor.isClient) {
  angular.module('hashtrack', ['angular-meteor']);
  angular.module('hashtrack').controller('DashCtrl', ['$scope', '$meteor',
    function($scope, $meteor, $filter) {

      $scope.tweets = $meteor.collection(Tweets);

      $scope.uniqueTweeters = function(tweets) {
        var allUsers = [];
        tweets.forEach(function(e, i) {
          allUsers.push(e.user.screen_name);
        });
        var uniqueUsers = unique(allUsers);
        return uniqueUsers.length;
      };

      $scope.$watch('tweets', function(newVal, oldVal) {
        var currentTime = new Date().getTime();
        var dayLength = 86400000;
        var previousDay = currentTime - dayLength;
        $scope.dailyTweets = $scope.tweets.filter(function(el, idx) {
          console.log(el.timestamp_ms, Number(el.timestamp_ms));
          return Number(el.timestamp_ms) > previousDay;
        });
      });
  }]);
}
