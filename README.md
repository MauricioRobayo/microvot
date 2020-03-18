<br />
<p align="center">
  <a href="https://twitter.com/microvot">
    <img src="assets/microvot.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center"><a href="https://twitter.com/microvot">MICROVOT</a></h3>

  <p align="center">
    Retweets everything <a href="https://twitter.com/microverseinc">@microverseinc</a> related!
    <br/>
    <a href="https://twitter.com/intent/follow?screen_name=microvot">Follow</a>
    ·
    <a href="https://github.com/MauricioRobayo/microvot/issues">Report Bug</a>
    ·
    <a href="https://github.com/MauricioRobayo/microvot/issues">Request Feature</a>
  </p>
</p>

![tweeting](https://github.com/MauricioRobayo/microvot/workflows/bot/badge.svg)

## Table of Contents

- [About the Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

## About The Project

[Microvot](https://twitter.com/microvot) is a simple bot that periodically search Twiter for tweets mentioning [@microverseinc](https://twitter.com/microverseinc), and retweets them in a batch.

It uses [GitHub Actions](https://github.com/actions) on a scheduled interval. You can take a look at the action [here](.github/workflows/bot.yml).

The Twitter API allows to search using the `since_id` parameter, so we stored the `max_id` of the last search we have seen on a [gist](https://gist.github.com/MauricioRobayo/443448bbbddd72ba3bc10187edb9b9c6), and on the next search we use that `max_id` as the next `since_id`. That way we get only the new tweets made after each search.

### Built With

- Node.js
- [GitHub Gist](https://gist.github.com/)
- [GitHub Actions](https://github.com/actions)

## Getting Started

To get a local copy up and running clone the repository and move into the directory:

```sh
git clone https://github.com/mauriciorobayo/microvot.git
cd microvot
```

### Prerequisites

Go to [Twitter Developer](https://developer.twitter.com/en/apps/create) to create a new app and get the keys and tokens.

Once you get the keys and tokens, copy the [`.env.sample`](.env.sample) file to a `.env` file in the root of the project, and copy-paste your credentials.

You will also need a [GitHub personal access token](https://github.com/settings/tokens/new) with `gist` scope to copy-paste into the `.env` file.

### Installation

To install the dependencies of the project run `npm install`.

You will need to generate an initial empty gist, once you have it, you'll need to update the info to the gist on [`src/memo.js`](./src/memo.js)

## Usage

You can clone this project and use at as a template to create your own bot that periodically does a search on Twitter and retweets whatever you want.

## Roadmap

See the [open issues](https://github.com/MauricioRobayo/microvot/issues) for a list of proposed features (and known issues).

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the [MIT License](LICENSE).

## Contact

Mauricio Robayo - [@MauricioRobayo](https://github.com/MauricioRobayo).

Project Link: [https://github.com/MauricioRobayo/microvot](https://github.com/MauricioRobayo/microvot)

## Acknowledgements

- [Robot image](https://www.pngrepo.com/svg/9288/robot-hand-drawn-outline)
- [Best README Template](https://github.com/othneildrew/Best-README-Template/blob/master/README.md)
- [Twitterize](https://github.com/MauricioRobayo/twitterize)
