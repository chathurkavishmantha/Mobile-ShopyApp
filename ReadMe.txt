
npx expo install expo-location
npm i react-native-image-slider-box  {*https://www.npmjs.com/package/react-native-image-slider-box*}

Error For : 

Android Bundling failed 16ms
Unable to resolve module react-native-image-slider-box from E:\Projects\laundry-app\screens\Carousel.js: react-na-native-image-slider-box could not be found within the project or in these directories:
  node_modules
  1 | import { StyleSheet, Text, View } from "react-native";
  2 | import React from "react";
> 3 | import { SliderBox } from "react-native-image-slider-box";

Fixled: npm i deprecated-react-native-prop-types
        node modules --> react-module --> change index files 400 line