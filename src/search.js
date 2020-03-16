const twitterize = require('twitterize')
const Memo = require('./memo')

const search = async () => {
  const memo = new Memo()
  const { max_id: maxId = 0 } = await memo.getLastExecInfo()
  const t = twitterize({
    api_key: process.env.TWITTER_API_KEY,
    api_secret_key: process.env.TWITTER_API_SECRET_KEY,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  })
  const options = {
    requestMethod: 'GET',
    endpoint: '/search/tweets.json',
    queryParams: {
      q: '@microverseinc -filter:retweets',
      since_id: maxId,
      result_type: 'recent',
    },
  }

  t(options)
    .then(response => {
      console.log(response)
      memo.setLastExecInfo({ maxId: response.search_metadata.max_id })
    })
    .catch(console.log)
}

search()
