const GistClient = require("gist-client");

class Memo {
  constructor() {
    this.gistClient = new GistClient();
    this.gistClient.setToken(process.env.GIST_TOKEN);
    this.gistId = "443448bbbddd72ba3bc10187edb9b9c6";
    this.gistFile = "microvot.json";
  }

  async getLastExecInfo() {
    const gist = await this.gistClient.getOneById(this.gistId);
    const file = gist.files[this.gistFile];
    return file.size > 0 ? JSON.parse(file.content) : {};
  }

  setLastExecInfo({ maxId, ...metadata }) {
    this.gistClient.update(this.gistId, {
      files: {
        [this.gistFile]: {
          content: JSON.stringify({
            max_id_str: maxId,
            datetime: new Date(),
            ...metadata,
          }),
        },
      },
    });
  }
}

module.exports = Memo;
