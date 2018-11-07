/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  const data = [{
      "user": {
        "name": "Newton",
        "avatars": {
          "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];

  function createTweetElement(tweet) {
    let $tweet = $("<article>").addClass("tweet");
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

    let timeAgo = () => {
      if (timePosted >= 3.17e-11) {
        return yearsAgo.toString() + " years ago"
      } else if (timePosted >= 3.8052e-10 && timePosted < 3.17e-11) {
        return monthsAgo.toString() + " months ago"
      } else if (timePosted >= 1.65345181878e-9 && timePosted < 3.8052e-10) {
        return weeksAgo.toString() + " weeks ago"
      }else if (timePosted >= 1.157416273146000029e-8 && timePosted < 1.65345181878e-9) {
        return daysAgo.toString() + " days ago"
      } else if (timePosted >= 2.777799055550400069e-7 && timePosted < 1.157416273146000029e-8) {
        return hoursAgo.toString() + " hours ago"
      } else if (timePosted >= 1.666679433330240084e-5 && timePosted < 2.777799055550400069e-7) {
        return minutesAgo.toString() + " minutes ago"
      } else if (timePosted >= 0.0010000076599981440502 && timePosted < 1.666679433330240084e-5) {
        return secondsAgo.toString() + " seconds ago"
      } else {
        return "Now"
      }
    }

    let html = `
      <header class="tweet-header">
        <img src=${tweet.user.avatars.small} />
        <p class="title-name">${tweet.user.name}</>
        <p class="title-tweet-handle">${tweet.user.handle}</span>
      </header>
      <div class="tweet-body">${tweet.content.text}</div>
      <footer class="tweet-footer">
        <p class="post-time">${timeAgo()}</p>
        <img src="../images/bird.png">
        <img src="../images/bird.png">
        <img src="../images/bird.png">
      </footer>
      `;
    $tweet = $tweet.append(html);
    return $tweet
  }

  function renderTweets(tweets) {
    for (let index of tweets) {
      let $newTweet = createTweetElement(index)
      $('.tweet-container').append($newTweet)
    }
  }
  renderTweets(data)

  $(function() {
    let $tweetSubmit = $("#tweet-form")
    $tweetSubmit.on('submit', function (event) {
      event.preventDefault()
      console.log('Button Clicked, performing ajax call...')
      let dataRequest = $("#tweet-form").serialize()
      console.log(dataRequest)
      $.ajax('/tweets', {
        method: 'POST',
        data: dataRequest
      })
      .then(function () {

        console.log('Done!')
      })
    })
  })
})


