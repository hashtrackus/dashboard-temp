Tweet = new Mongo.Collection("tweets");

var currentTime = new Date().getTime();
var dayLength = 86400000;
var previousDay = currentTime - dayLength;

if (Meteor.isClient) {
  Template.body.helpers({
    tweets: function () {
      return Tweet.find({});
    }
  });
}


Meteor.methods({
  filterTweets: function(tweets) {
    return tweets.filter(function(e, i) {
      return parseInt(e.timestamp_ms) > previousDay;
    });
  }
});
