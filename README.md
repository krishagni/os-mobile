OpenSpecimen Mobile App
=======================

Installing pre-requisites:

 1. Installing NodeJS and NPM on Ubuntu
  1. sudo add-apt-repository ppa:chris-lea/node.js
  2. sudo apt-get update
  3. sudo apt-get install nodejs
   
 2. Installing Cordova
  1. sudo npm install -g cordova
   
 3. Installing Ionic Framework
  1. sudo npm install -g ionic

 4. For installing Android SDK tools, please refer instructions given here: http://developer.android.com/sdk/installing/index.html
  

Build Instructions
==================

Pre-requisites: NodeJS and NPM, Cordova, Ionic Framework, and Android/iOS SDK

Steps:

 1. Checkout the project
  1. git clone https://github.com/krishagni/os-mobile.git
   
 2. Building Android app
  1. ionic platform add android
  2. ionic build android
  3. ionic emulate android

 3. Building iOS app
  1. ionic platform add ios
  2. ionic build ios
  3. ionic emulate ios
