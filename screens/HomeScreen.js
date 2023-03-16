import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  Pressable,
  Image,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Carousel from "./Carousel";
import Services from "./Services";
import DressItem from "./DressItem";


const HomeScreen = () => {
  const [displayCurruntAddress, setDisplayCurruntAddress] = useState(
    "We are loading your location"
  );
  const [locationServicesEnable, setLocationServicesEnable] = useState(false);

  useEffect(() => {
    checkIfLocationEnabled();
    getCurruntLocation();
  }, []);

  const checkIfLocationEnabled = async () => {
    let enable = await Location.hasServicesEnabledAsync();
    if (!enable) {
      Alert.alert(
        "Location services not enabled",
        "please enble the services",
        [
          {
            text: "Cancle",
            onPress: () => console.log("Cancle Pressed"),
          },
          {
            text: "OK",
            onPress: () => console.log("OK Pressed"),
          },
        ],
        { cancelable: false }
      );
    } else {
      setLocationServicesEnable(enable);
    }
  };

  const getCurruntLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission denided",
        "Allow the app to use the location services",
        [
          {
            text: "Cancle",
            onPress: () => console.log("Cancle Pressed"),
          },
          {
            text: "OK",
            onPress: () => console.log("OK Pressed"),
          },
        ],
        { cancelable: false }
      );
    }

    const { coords } = await Location.getCurrentPositionAsync();
    console.log(coords);
    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      console.log(response);

      for (let item of response) {
        let address = `${item.name} ${item.city} ${item.postalCode}`;
        console.log(`this is my city : `, address);
        setDisplayCurruntAddress(address);
      }
    }
  };

  // products data 
const services = [
  {
    id: "0",
    image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
    name: "shirt",
    quantity: 0,
    price: 10,
  },
  {
    id: "11",
    image: "https://cdn-icons-png.flaticon.com/128/892/892458.png",
    name: "T-shirt",
    quantity: 0,
    price: 10,
  },
  {
    id: "12",
    image: "https://cdn-icons-png.flaticon.com/128/9609/9609161.png",
    name: "dresses",
    quantity: 0,
    price: 10,
  },
  {
    id: "13",
    image: "https://cdn-icons-png.flaticon.com/128/599/599388.png",
    name: "jeans",
    quantity: 0,
    price: 10,
  },
  {
    id: "14",
    image: "https://cdn-icons-png.flaticon.com/128/9431/9431166.png",
    name: "Sweater",
    quantity: 0,
    price: 10,
  },
  {
    id: "15",
    image: "https://cdn-icons-png.flaticon.com/128/3345/3345397.png",
    name: "shorts",
    quantity: 0,
    price: 10,
  },
  {
    id: "16",
    image: "https://cdn-icons-png.flaticon.com/128/293/293241.png",
    name: "Sleeveless",
    quantity: 0,
    price: 10,
  },
];

  return (
    <ScrollView style={{flex:1, backgroundColor:'#F5F7F4', marginTop:50}}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 35,
          padding: 10,
        }}
      >
        <MaterialIcons name="location-on" size={30} color="red" />
        <View>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>Home</Text>
          <Text>{displayCurruntAddress}</Text>
        </View>
        <Pressable style={{ marginLeft: "auto", marginRight: 7 }}>
          <Image
            style={{ width: 50, height: 50, borderRadius: 25 }}
            source={{
              uri: "https://scontent.fcmb1-2.fna.fbcdn.net/v/t39.30808-6/334936478_858626305238547_1854540384226413345_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=z2f0aqAq4nYAX9dZYFl&_nc_ht=scontent.fcmb1-2.fna&oh=00_AfBkXK11mgaGXvUbTl0Ylbx0Cr-CLjWbAGOyhtzDzcueCA&oe=6410E7C0",
            }}
          />
        </Pressable>
      </View>

      {/* Search Bar */}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          margin: 10,
          borderWidth: 0.8,
          borderColor: "#c0c0c0",
          justifyContent: "space-between",
          borderRadius: 7,
        }}
      >
        <TextInput placeholder="Search For items or More" />
        <Feather
          style={{ marginLeft: "auto" }}
          name="search"
          size={24}
          color="black"
        />
      </View>

      {/* Images Carousel */}
      <Carousel />

      {/* Services */}
      <Services />

      {/* Render Products */}
      {
        services.map((product,index) =>(
          <DressItem item={product} key={index}/>
        ))
      }
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
