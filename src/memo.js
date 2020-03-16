const GistClient = require('gist-client')

class Memo {
  constructor() {
    this.gistClient = new GistClient()
    this.gistClient.setToken(process.env.GIST_TOKEN)
    this.gistId = '443448bbbddd72ba3bc10187edb9b9c6'
  }

  async getLastExecInfo() {
    const gist = await this.gistClient.getOneById(this.gistId)
    return JSON.parse(gist.files['microvot.json'].content)
  }

  setLastExecInfo({ maxId }) {
    this.gistClient.update(this.gistId, {
      files: {
        'microvot.json': {
          content: JSON.stringify({ max_id: maxId, datetime: new Date() }),
        },
      },
    })
  }
}

module.exports = Memo
