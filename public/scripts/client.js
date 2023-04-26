/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const tweets = require("../../server/routes/tweets");

// Fake data taken from initial-tweets.json
$(document).ready(function() {
  const $tweetsSeccion = $('#tweets-container');
const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];
const createTweetElement = function (tweet) {
  /* Your code for creating the tweet element */
  const $tweet = $("<article>").addClass("tweet");
  const $header = $("<header>");
  const $avatarName = $("<div>").addClass("avatarName");
  const $avatarNameTop = $("<div>").addClass("avatarNameTop");
  const $avatar = $("<img>").addClass("avatar").attr("src", tweet.user.avatars).attr("alt", "Avatar");
  const $userName = $("<h3>").addClass("user-name").text(tweet.user.name);
  const $userHandle = $("<span>").addClass("user-handle").text(tweet.user.handle);
  const $text = $("<p>").addClass("tweet-text").text(tweet.content.text);;
  const $footer = $("<footer>");
  const $date = $("<span>").addClass("tweet-date").text(tweet.created_at);
  const $icons = $("<div>").addClass("tweet-icons");
  const $flag = $("<i>").addClass("fa-solid fa-flag");
  const $retweet = $("<i>").addClass("fa-solid fa-retweet");
  const $heart = $("<i>").addClass("fa-solid fa-heart");

  $avatarNameTop.append($avatar, $userName);
  $avatarName.append($avatarNameTop, $userHandle);
  $header.append($avatarName, $text);
  $icons.append($flag, $retweet, $heart);
  $footer.append($date, $icons);
  $tweet.append($header, $footer);
  console.log($tweet);

  return $tweet;
};

const renderTweets = function (tweets) {
  $tweetsSeccion.empty();
  // loops through tweets
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet); // calls createTweetElement for each tweet
    $("#tweets-container").prepend($tweet); // takes return value and appends it to the tweets container
  }
};

const fetchtweets = () => (
  $.ajax({
    method: 'GET',
    url: '/tweets'
  }).then((tweets) => {
    renderTweets(tweets)
  })
)

// renderTweets(data);
fetchtweets();

const $form = $('#new-tweet-form');

$form.on('submit', (event) => {
  event.preventDefault();
  console.log('Form submited')
  const dataTweet = $form.serialize();
  console.log(dataTweet);

  $.ajax({
    method: 'POST',
    url: '/tweets',
    data: dataTweet
  }).then(() => {
    console.log('request right');
    fetchtweets();
  })



})


});