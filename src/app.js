const TwitterClient = require('./twitter_client')
const Memo = require('./memo')

const twitterClient = new TwitterClient({
  api_key: process.env.TWITTER_API_KEY,
  api_secret_key: process.env.TWITTER_API_SECRET_KEY,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
})

const memo = new Memo()

const init = async () => {
  const { max_id_str: sinceId = 0 } = await memo.getLastExecInfo()
  const {
    statuses,
    search_metadata: { max_id_str: maxId },
  } = await twitterClient.search({
    q: '@microverseinc -filter:retweets',
    result_type: 'recent',
    since_id: sinceId,
  })
  const retweets = await Promise.all(
    statuses.map(status => twitterClient.retweet(status.id_str)),
  )
  memo.setLastExecInfo({ max_id_str: maxId, retweets: retweets.length })
}

init()
