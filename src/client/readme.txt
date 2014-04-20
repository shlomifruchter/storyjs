To get it working you need to install nodejs and then after checking out the code, you need to install the following using npm.

Steps to configure your system:

1. Install Node.js.
2. Install Ruby:
- Windows: http://rubyinstaller.org/.
- OSX: https://rvm.io/rvm/install
2.1. Add Ruby to PATH: 'c:\Ruby\bin'
2.2. Open command line and run:
2.2.1 gem update --system
2.2.2 gem install compass

3. Open a nodejs console and run:

npm install -g yo
npm install -g generator-backbone

It should install everything you need globally, the rest is in the svn repository under node_modules.

4. Open a nodejs console, go to the root folder (trunk\phonegap-framework\app-backbone) and run 'grunt server'. This should run a server with the webpage on your localhost, and also launch a browser. You can use Ripple to check it on a mobile emulator.