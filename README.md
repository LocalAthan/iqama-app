#:mosque: Iqama App
Shows the prayer times for mosques in Edmonton

###Requirements

1. [nodejs](https://nodejs.org/en/) as this is a react-native project
2. The iqama-scraper [project](https://github.com/LocalAthan/iqama-app) to serve the app
3. [ngrok](https://ngrok.com/) for urls to localhost server

###Getting Started
After cloning project:

1. run iqama-scraper project
2. generate ngrok url to the localhost port serving iqama-scraper
   `ngrok http 3000`
3. update the .env file with the url generated
4. install dependencies
   `npm install`
5. run
   `npm start`


####Note
Download [XCode](https://developer.apple.com/download/more/?=xcode) to run on iOS simulator or dowload [Android Studio](https://developer.android.com/studio) for an Android simulator. 

*This step isn't necessary as you can scan a QR code after `npm start` and open the app with Expo Go on Android or the iOS Camera app*