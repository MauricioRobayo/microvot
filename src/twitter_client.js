const twitterize = require('twitterize')

class TwitterClient {
  constructor(authOptions, memo) {
    this.client = twitterize(authOptions)
    this.memo = memo
    this.like = this.like.bind(this)
    this.retweet = this.retweet.bind(this)
  }

  static async processBatch(statuses, fn) {
    const processed = await Promise.all(statuses.map(fn))
    return processed.filter(({ errors }) => !errors)
  }

  async search(queryParams) {
    const options = {
      requestMethod: 'GET',
      endpoint: '/search/tweets.json',
      queryParams,
    }
    return this.client(options)
  }

  async like({ id_str: id }) {
    const options = {
      requestMethod: 'POST',
      endpoint: `/favorites/create.json`,
      queryParams: {
        id,
      },
    }
    return this.client(options)
  }

  async retweet({ id_str: id }) {
    const options = {
      requestMethod: 'POST',
      endpoint: `/statuses/retweet/${id}.json`,
    }
    return this.client(options)
  }

  async searchRecent(query) {
    const { max_id_str: sinceId = 0 } = await this.memo.getLastExecInfo()
    const {
      statuses,
      search_metadata: { max_id_str: maxId },
    } = await this.search({
      q: query,
      result_type: 'recent',
      since_id: sinceId,
    })
    this.maxId = maxId
    return statuses
  }

  async retweetBatch(statuses) {
    this.retweets = await TwitterClient.processBatch(statuses, this.retweet)
    return this.retweets
  }

  async likeBatch(statuses) {
    this.likes = await TwitterClient.processBatch(statuses, this.like)
    return this.likes
  }

  async updateMemo() {
    this.memo.setLastExecInfo({
      max_id_str: this.maxId,
      retweets: this.retweets.length,
      likes: this.likes.length,
    })
  }
}

module.exports = TwitterClient
