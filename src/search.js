const twitterize = require('twitterize')

const t = twitterize({
  api_key: process.env.TWITTER_API_KEY,
  api_secret_key: process.env.TWITTER_API_SECRET_KEY,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
})

const options = {
  requestMethod: 'GET',
  endpoint: '/search/tweets.json',
  queryParams: { q: '@microverseinc -filter:retweets' },
}

t(options)
  .then(response => {
    console.log(JSON.parse(response))
  })
  .catch(console.log)