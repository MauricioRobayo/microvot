const twitterize = require('twitterize')

class TwitterClient {
  constructor(authOptions) {
    this.client = twitterize(authOptions)
  }

  async search(queryParams) {
    const options = {
      requestMethod: 'GET',
      endpoint: '/search/tweets.json',
      queryParams,
    }
    return this.client(options)
  }

  async retweet(id) {
    const options = {
      requestMethod: 'POST',
      endpoint: `/statuses/retweet/${id}.json`,
    }
    return this.client(options)
  }
}

module.exports = TwitterClient
