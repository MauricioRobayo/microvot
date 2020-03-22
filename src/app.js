const TwitterClient = require('./twitter_client')
const Memo = require('./memo')

const twitterClient = new TwitterClient(
  {
    api_key: process.env.TWITTER_API_KEY,
    api_secret_key: process.env.TWITTER_API_SECRET_KEY,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  },
  new Memo(),
)

const init = async () => {
  const statuses = await twitterClient.searchRecent(
    '@microverseinc -filter:retweets',
  )
  await twitterClient.retweetBatch(statuses)
  twitterClient.updateMemo()
}

init()
