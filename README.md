# SMS Fishing 
The project builds on a pilot project that was undertaken in 2006 to
develop the use of SMS technology to enhance communication in agricultural
value chains in Cambodia. The project worked closely with farmers, traders,
silo managers and Ministry of Commerce officials to develop an electronic
marketing communication system (EMCS) based on text messaging. The
EMCS demonstrated a successful proof-of-concept and showed SMS as a
robust and cost-effective technology. Future projects will explore the wider
scale implementation of this SMS system in Cambodia and address the broader
issues of cost, training and user literacy levels. 

Rural coastal peruvian fishing app. it supports 5  types of fish - barracuda, bass, flounder, tuna,  mojarra. there are 2 types of users - buyers and sellers. buyers can post how many of a type of fish they want at a certain price. sellers can post how many fish they have and at what price they want to sell. people can also text just a fish name to get price info about it. they can also text 'today' to get a recommendation.


## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and NPM](nodejs.org) >= v0.12.0
- [Bower](bower.io) (`npm install --global bower`)
- [Ruby](https://www.ruby-lang.org) and then `gem install sass`
- [Grunt](http://gruntjs.com/) (`npm install --global grunt-cli`)
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`

### Developing

1. Run `npm install` to install server dependencies.

2. Run `bower install` to install front-end dependencies.

3. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

4. Run `grunt serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

Run `grunt build` for building and `grunt serve` for preview.

## Testing

Running `npm test` will run the unit tests with karma.
