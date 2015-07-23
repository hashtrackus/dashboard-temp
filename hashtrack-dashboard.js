Tweets = new Mongo.Collection("tweets");
// var fullTweets = Tweets.find({});
var currentTime = new Date().getTime();
var dayLength = 86400000;
var previousDay = currentTime - dayLength;

if (Meteor.isClient) {
  // Template.body.helpers({
  //   tweets: function () {
  //     return Tweet.find({});
  //   }
  // })
  angular.module('hashtrack', ['angular-meteor']);
  angular.module('hashtrack').controller('DashCtrl', ['$scope', '$meteor',
    function($scope, $meteor) {
      $scope.tweets = $meteor.collection(Tweets);
  }]);
}


// Meteor.methods({
//   filterTweet: function(tweets) {
//     return tweets.filter(function(e, i) {
//       return parseInt(e.timestamp_ms) > previousDay;
//     });
//   }
// });
