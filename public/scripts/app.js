/*
 * Client-side JS logic goes here
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  // This function
  function createTweetElement(tweet) {
    let $tweet = $('<article>').addClass('tweet');
    let datePosted = moment(tweet.created_at).fromNow();

    // this function helps encode text so javascript (XSS) scripts can not be implemented within textfields
    // and cause not so fun bugs in our app
    function escape(str) {
      var div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }
    const safeHTML = `${escape(tweet.content.text)}`;

    // html template that is being used for each tweet created with values being passed in from db
    let html = `
      <header class="tweet-header">
        <img src=${tweet.user.avatars.small} />
        <p class="title-name">${tweet.user.name}</p>
        <p class="title-tweet-handle">${tweet.user.handle}</p>
      </header>
      <div class = "tweet-body">${safeHTML}</div>
      <footer class="tweet-footer">
        <p class="post-time">${datePosted}</p>
        <i class="far fa-heart"></i>
        <i class="fas fa-retweet"></i>
        <i class="far fa-flag"></i>
      </footer>
      `;
      $('header').append();
    $tweet = $tweet.append(html);
    return $tweet;
  }

  function renderTweets(tweets) {
    $('.tweet-container').empty();
    for (let index of tweets) {
      let $newTweet = createTweetElement(index);
      $('.tweet-container').prepend($newTweet); //prepend aligns tweets from newest to oldest
    }
  }

  // function for POSTing tweets after running through a validation checker to make sure tweet stays under
  // 140 characters, and that textarea is not empty,
  $(function() {
    let $tweetSubmit = $('#tweet-form');
    $tweetSubmit.on('submit', function (event) {
      event.preventDefault();
      console.log('Button Clicked, performing ajax call...')
      let $textArea = $('textarea').val().length;
      if ($textArea > 140) {
        $('.error').html('Tweet tweet, shorten your message!').slideToggle('slow');
      } else if (!$('textarea').val()) {
        $('.error').html("Tweet tweet, you can't tweet without... well... a tweet!").slideToggle('slow');
      } else {
        if ($('.error').is(':visible')) {
          $('.error').slideToggle('slow');
        }

      let dataRequest = $tweetSubmit.serialize()
      $.ajax('/tweets', {
        method: 'POST',
        data: dataRequest,
      })
      .then(function () {
        $('textarea').val(''); //clear textfield after every submit
        $('.counter').text(140); //reset the counter back to 140
        loadTweets();
        });
      };
    });
  });

  let loadTweets = () => {
      $.ajax('/tweets', {
        method: 'GET'
      })
      .then(function (json) {
        renderTweets(json)
      });
    };

    loadTweets()


  //open/closes the new tweet container, and autofocuses into text field when opened
  $('.compose').click(function() {
    $('.new-tweet').slideToggle("fast", function() {
      if ($(this).is(':visible'))
      {
        $('textarea').focus();
      }
    })
  })
})


