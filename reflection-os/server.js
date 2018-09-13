const express = require('express');
const request = require('request');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {
	res.send({ express: 'Hello From Express' });
});

app.get('/api/twitter', (req, res) => {
	let screenName = req.query.screen_name;
	let count = req.query.count;
	let bearerToken = req.query.bearer_token;
	console.log('Screen name: ' + screenName);
	console.log('Count: ' + count);

	let timelineURL =
		'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=' + screenName + '&count=' + count;
	let options = {
		url: timelineURL,
		headers: {
			Authorization: 'Bearer ' + bearerToken
		}
	};

	function timelineCallback(error, twitterResponse, body) {
		if (!error && twitterResponse.statusCode == 200) {
			let tweets = JSON.parse(body);
			let ids = tweets.map(tweet => tweet.id_str);
			res.send({ tweetIds: ids });
		}
	}

	request(options, timelineCallback);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
