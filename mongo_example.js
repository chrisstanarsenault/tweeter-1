"use strict"

const {MongoClient} = require("mongodb"); //using destructuring assignment
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.log(`Failled to conect: ${MONGODB_URI}`);
    throw err;
  }

  // ==> We have a connection to the "test-tweets" db,
  //     starting here.
  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  function getTweets(callback) {
    db.collection("tweets").find().toArray((err, tweets) => {
      if (err) {
        return callback(err)
;      }
      callback(null, tweets);
    });
  }

  getTweets((err, tweets) => {
    if (err) throw err;

    console.log("Logging each tweet:");
    for (let tweet of tweets) {
      console.log(tweet);
    }
    db.close()
  })
});