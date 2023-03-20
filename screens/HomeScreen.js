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
import Carousel from "../components/Carousel";
import Services from "../components/Services";
import DressItem from "../components/DressItem";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../data/ProductReducer";
import { Service } from "../data/Data";
import { useNavigation } from "@react-navigation/native";
import { onPress } from "deprecated-react-native-prop-types/DeprecatedTextPropTypes";

const HomeScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curruntValue, previouseValue) => curruntValue + previouseValue, 0);
  const dispatch = useDispatch();
  const navigation = useNavigation();
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
    // console.log(coords);
    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      // console.log(response);

      for (let item of response) {
        let address = `${item.name} ${item.city}`;
        console.log(`this is my city : `, address);
        setDisplayCurruntAddress(address);
      }
    }
  };

  const product = useSelector((state) => state.product.product);
  console.log(`product array`, product);

  useEffect(() => {
    if (product.length > 0) return;

    const fetchProduct = () => {
      Service.map((service) => dispatch(getProducts(service)));
    };

    fetchProduct();
  }, []);

  return (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: "#F5F7F4" }}>
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
                uri: "https://scontent.fcmb1-2.fna.fbcdn.net/v/t39.30808-1/334936478_858626305238547_1854540384226413345_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=103&ccb=1-7&_nc_sid=7206a8&_nc_ohc=MUV8vZy2SEYAX8vOzTB&_nc_ht=scontent.fcmb1-2.fna&oh=00_AfCS_XlwH6ukhfRPmIYfr0sWmvwiYArdEvrEaTQ54cTcRg&oe=6418743A",
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
        {product.map((item, index) => (
          <DressItem item={item} key={index} />
        ))}
      </ScrollView>

      {total === 0 ? null : (
        <Pressable
          style={{
            backgroundColor: "#088f8f",
            padding: 10,
            marginBottom: 30,
            margin: 15,
            borderRadius: 7,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View >
            <View style={{flexDirection:"row", alignItems:"center"}}>
            <Text style={{ fontSize: 18, fontWeight: "600", color:"white"}}>{cart.length} </Text>
            <Text style={{ fontSize: 14, fontWeight: "600", color:"white" }}>Items | </Text>
            <Text style={{ fontSize: 18, fontWeight: "600", color:"white" }}>${total}</Text>


            </View>
            <Text style={{ fontSize: 13, fontWeight: "400", color:"white", marginRight:6 }}>Extra charges might apply</Text>
          </View>

          <Pressable onPress={() => navigation.navigate("PickUp")} style={{ backgroundColor:"yellow",padding:10, borderRadius: 20 }}>
            <Text style={{ fontSize: 14, fontWeight: "700", color:"black", marginRight:6 }}>Proceed to Pick Up</Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
