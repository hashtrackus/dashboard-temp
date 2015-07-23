Tweets = new Mongo.Collection("tweets");
// var fullTweets = Tweets.find({});
var currentTime = new Date().getTime();
var dayLength = 86400000;
var previousDay = currentTime - dayLength;
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
  // Template.body.helpers({
  //   tweets: function () {
  //     return Tweet.find({});
  //   }
  // })
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

  }]);
}


// Meteor.methods({
//   filterTweet: function(tweets) {
//     return tweets.filter(function(e, i) {
//       return parseInt(e.timestamp_ms) > previousDay;
//     });
//   }
// });
