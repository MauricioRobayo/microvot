const twitterize = require('twitterize')

class TwitterClient {
  constructor(authOptions, memo) {
    this.client = twitterize(authOptions)
    this.memo = memo
    this.like = this.like.bind(this)
    this.retweet = this.retweet.bind(this)
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
    this.sinceId = sinceId
    const {
      statuses,
      search_metadata: { max_id_str: maxId },
    } = await this.search({
      q: query,
      result_type: 'recent',
      since_id: this.sinceId,
    })
    this.maxId = maxId
    return statuses
  }

  async retweetBatch(statuses) {
    const retweets = await Promise.all(statuses.map(this.retweet))
    this.validRetweets = retweets.filter(({ errors }) => !errors)
    return this.validRetweets
  }

  async likeBatch(statuses) {
    const likes = await Promise.all(statuses.map(this.like))
    this.validLikes = likes.filter(({ errors }) => !errors)
    return this.validLikes
  }

  async updateMemo() {
    this.memo.setLastExecInfo({
      max_id_str: this.maxId,
      retweets: this.validRetweets.length,
      likes: this.validLikes.length,
    })
  }
}

module.exports = TwitterClient
