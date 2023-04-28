
$(document).ready(function () {
  const $tweetsSeccion = $("#tweets-container");

  const createTweetElement = function (tweet) {
    /* code for creating the tweet element */
    const $tweet = $("<article>").addClass("tweet");
    const $header = $("<header>");
    const $avatarName = $("<div>").addClass("avatarName");
    const $avatarNameTop = $("<div>").addClass("avatarNameTop");
    const $avatar = $("<img>").addClass("avatar").attr("src", tweet.user.avatars).attr("alt", "Avatar");
    const $userName = $("<h3>").addClass("user-name").text(tweet.user.name);
    const $userHandle = $("<span>").addClass("user-handle").text(tweet.user.handle);
    const $text = $("<p>").addClass("tweet-text").text(tweet.content.text);
    const $footer = $("<footer>");
    const $date = $("<span>").addClass("tweet-date").text(timeago.format(tweet.created_at));
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

  const loadTweets = () =>
    $.ajax({
      method: "GET",
      url: "/tweets",
    }).then((tweets) => {
      renderTweets(tweets);
    });

  // renderTweets(data);
  loadTweets();

  const $form = $("#new-tweet-form");
  const $textArea = $form.find('textarea');
  const errorMessage = $('#error-message');

  // Moved event listeners for the textarea and form outside the submit event listener
  $textArea.on('input', function() {
    errorMessage.hide();
  });

  $form.on("submit", (event) => {
    event.preventDefault();
    const $textArea = $form.find("textarea");
    const textTweet = $textArea.val().trim();
    //validation of tweet empty
    if(!textTweet){
      const $errorEmpty = $("<h2>").text("Tweet is empty");
      errorMessage.empty().append($errorEmpty);
      errorMessage.show(); // Show the error message
      return;
    }

    //validation tweet longer than 140 characters
    if (textTweet.length > 140){
      const $errorLonger = $("<h2>").text("The tweet is longer than 140 characters.");
      errorMessage.empty().append($errorLonger);
      errorMessage.show(); // Show the error message     
      return;
    }
   
    const dataTweet = $form.serialize();
    console.log(dataTweet);


    $.ajax({
      method: "POST",
      url: "/tweets",
      data: dataTweet,
    }).then(() => {
      console.log("request right");
      loadTweets();
      $textArea.val("");
    });

    $textArea.on("input", () => {
      $("#errorMessage").empty();
    });
  });
  errorMessage.hide(); // Hide the error message after successful submission
  
});
