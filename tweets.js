const Twit = require('twit');
const express = require('express');

require('dotenv').config();

const API_key = process.env.API_KEY;
const API_secret = process.env.API_SECRET;
const access_token = process.env.ACCESS_TOKEN;
const access_token_secret = process.env.ACCESS_TOKEN_SECRET;
// console.log(API_key); // VALIDATING .env VARIABLES

const T = new Twit({
    consumer_key: API_key,
    consumer_secret: API_secret,
    access_token: access_token,
    access_token_secret: access_token_secret,
    timeout_ms: 60*1000
})

module.exports = () => {
    const tweets = express.Router();
    
    tweets.get('/', (req,res) => {
        // console.log('tweets.get'); // TRACKER
        var fromWho = req.query.account; 
        var howMany = req.query.count; 
        var tweets;
        
        T.get('statuses/user_timeline', {screen_name: fromWho, count: howMany})
        .then(result => {
            var tweets = result.data.map(tweet=>{
                var url = `https:twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`;
                return {
                    created_at: tweet.created_at,
                    text: tweet.text,
                    url: url,
                    image: tweet.user.profile_image_url_https,
                    id: tweet.id_str
                }
            })
            return res.json(tweets);
        })
        .catch(err => res.json(err));
    });
    
    return tweets;
};