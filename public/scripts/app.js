/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  function createTweetElement(tweet) {
    let $tweet = $('<article>').addClass('tweet');
    let currentDate = new Date().getTime()
    let timePosted = tweet.created_at;
    let timeLapse = currentDate - timePosted;
    let secondsAgo = Math.round(timeLapse / 1000)
    let minutesAgo = Math.round(secondsAgo / 60)
    let hoursAgo = Math.round(minutesAgo / 60)
    let daysAgo = Math.round(hoursAgo / 24)
    let weeksAgo = Math.round(daysAgo / 7)
    let monthsAgo = Math.round(weeksAgo / 4.345)
    let yearsAgo = Math.round(monthsAgo / 12)
    let datePosted = moment().format("dddd, MMMM Do YYYY")

    // this function helps encode text so javascript (XSS) scripts can not be implemented within textfields
    // and cause not so fun bugs in our app
    function escape(str) {
      var div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }
    const safeHTML = `${escape(tweet.content.text)}`;

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
      $('header').append()
    $tweet = $tweet.append(html);
    return $tweet
  }

  function renderTweets(tweets) {
    $('.tweet-container').empty()
    for (let index of tweets) {
      let $newTweet = createTweetElement(index)
      $('.tweet-container').prepend($newTweet) //prepend aligns tweets from newest to oldest
    }
  }

  $(function() {
    let $tweetSubmit = $('#tweet-form')
    $tweetSubmit.on('submit', function (event) {
      event.preventDefault()
      console.log('Button Clicked, performing ajax call...')
      let $textArea = $('textarea').val().length
      let maxCounter = parseInt($(".counter").text(), 10) //check later why counter isnt working
      if ($textArea > 140) {
        $('.error').html('Tweet tweet, shorten your message!').slideToggle('slow')
      } else if (!$('textarea').val()) {
        $('.error').html("Tweet tweet, you can't tweet without... well... a tweet!").slideToggle('slow')
      } else {
        if ($('.error').is(':visible')) {
          $('.error').slideToggle('slow');
        }

      let dataRequest = $tweetSubmit.serialize()
      $.ajax('/tweets', {
        method: 'POST',
        data: dataRequest,
        success: function(data) {
          renderTweets(data);
        }
      })
      .then(function () {
        $('textarea').val('') //clear textfield after every submit
        console.log('Done!')
        $('.counter').text(140)
        loadTweets()
        })
      }
    })
  })

  let loadTweets = () => {
      $.ajax('/tweets', {
        method: 'GET'
      })
      .then(function (json) {
        renderTweets(json)
      })
    }

    loadTweets()

  $('.compose').click(function() {
    $('.new-tweet').slideToggle("fast", function() {
      if ($(this).is(':visible'))
      {
        $('textarea').focus()
      }
    })
  })
})


