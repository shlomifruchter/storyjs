story.js
========

This is a sample story telling app using Sails.js, Marionette, Backbone and Mongodb.

## Prerequisites
* Node.js - Download and Install [Node.js](http://www.nodejs.org/download/). You can also follow [this gist](https://gist.github.com/isaacs/579814) for a quick and easy way to install Node.js and npm
* MongoDB - Download and Install [MongoDB](http://www.mongodb.org/downloads) - Make sure it's running on the default port (27017).

### Tools Prerequisites
* [Bower](http://bower.io/)
* [Grunt](http://gruntjs.com).
* Ruby - you need Ruby and Compass to compile scss files to css. Install ruby for [Windows](http://rubyinstaller.org/) or [OSX](https://rvm.io/rvm/install).

    Make sure you add Ruby to PATH: e.g. 'c:\Ruby\bin', then run:
    ```s
    gem update --system
    gem install compass
    ```

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