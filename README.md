story.js
========

This is a sample story telling app using Sails.js, Marionette, Backbone and Mongodb.

## Prerequisites
* Node.js - Download and Install [Node.js](http://www.nodejs.org/download/). You can also follow [this gist](https://gist.github.com/isaacs/579814) for a quick and easy way to install Node.js and npm
* MongoDB - Download and Install [MongoDB](http://www.mongodb.org/downloads) - Make sure it's running on the default port (27017).

### Tools Prerequisites
* NPM - Node.js package manager, should be installed when you install node.js.
* Bower - Web package manager, installing [Bower](http://bower.io/) is simple when you have npm:
* Grunt - Download and Install [Grunt](http://gruntjs.com).

## Getting started

**Install MongoDB, make sure mongod runs on default port (localhost:27017)**

**Install the following npm packages:**
```s
npm install -g bower
npm install -g grunt-cli
npm install -g sails@0.94
```

**Install dependencies:**
```sh
cd /src/client
npm install
bower install

cd /src/server
npm install
```

**Run server:**
```sh
cd /src/server
sails lift
```

**Launch client in browser:**
```sh
cd /src/client
grunt server
```