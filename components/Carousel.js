import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";

const Carousel = () => {
  const images = [
    "https://objectstorage.ap-mumbai-1.oraclecloud.com/n/softlogicbicloud/b/cdn/o/site-images/60ab360548f5a.jpg",
  "https://objectstorage.ap-mumbai-1.oraclecloud.com/n/softlogicbicloud/b/cdn/o/site-images/60ab35f030443.jpg",
  "https://objectstorage.ap-mumbai-1.oraclecloud.com/n/softlogicbicloud/b/cdn/o/site-images/60ab367bb1d40.jpg",
  "https://objectstorage.ap-mumbai-1.oraclecloud.com/n/softlogicbicloud/b/cdn/o/site-images/60ab37eb07ff3.jpg",
  "https://objectstorage.ap-mumbai-1.oraclecloud.com/n/softlogicbicloud/b/cdn/o/site-images/5f59f9199f096.jpg"

  ];
  return (
    <View>
      <SliderBox
      
        images={images}
        autoPlay
        circleLoop
        // dotColor={"#13274f"}
        // inactiveDotColor="#90a4ae"
        imageComponentStyle={{
          borderRadius: 6,
          width: "94%",
          
        }}
      />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({});
