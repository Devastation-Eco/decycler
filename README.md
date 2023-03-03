## Decycler
Decycler is a mobile app built with React Native Expo that allows users to post their rubble so that other companies can safely and ecologically dispose of it for a fee. 
The app uses Firebase as a backend to store and retrieve information about the rubble postings and the companies that can pick them up.

## Getting started
To run Decycler on your local machine, you'll need to have [Node.js](https://nodejs.org/en/) and [Expo CLi](https://docs.expo.dev/workflow/expo-cli/) installed.
Then, follow these steps:

1. Clone the repository:
```
git clone https://github.com/Devastation-Eco/decycler
```
2. Go inside the folder an install all needed dependencies:
```
cd decycler
npm install
```
3. Set up Firebase and Google API:
- Replace the firebaseConfig found in firebase.js with your own config
- Set the API keys in both register screens found inside the register screens folder
- Set your Google Places API key inside AddNewPostScreen.js
4. Start the app:
```
npm start
```
And now follow he instructions on the command line to get it running either on your phone or on an emulator

## Using Decycler
Once you have Decycler running, you can:
- Create an account as a company or a user
- Post your rubble with information such as its type, location and estimated amount of rubble
- Browse available rubbles and see their details
- Contact the person posting their rubble to agree on a price pickup date
