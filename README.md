# :mosque: Iqama App
React-native project to show the prayer times for different mosques in Edmonton. 

### Requirements

1. [nodejs](https://nodejs.org/en/)
2. Expo CLI
   `npm install -g expo-cli` 
4. The iqama-scraper [project](https://github.com/LocalAthan/iqama-app) (to serve the app)
5. [ngrok](https://ngrok.com/) (to generate public urls to localhost)

### Getting Started
After cloning project:

1. run iqama-scraper project
2. generate ngrok url to the localhost port serving iqama-scraper
   `ngrok http 3000`
3. update the .env file with the url generated
4. install dependencies
   `npm install`
5. run
   `npm start`
6. Scan the QR code that pops with Expo Go app on Android or the Camera app on iOS


#### Note
If you want to test using simulators, you need to download

a) Download [XCode](https://developer.apple.com/download/more/?=xcode) to run on iOS simulator or

b) Download [Android Studio](https://developer.android.com/studio) for an Android simulator. 

*This step isn't necessary*
