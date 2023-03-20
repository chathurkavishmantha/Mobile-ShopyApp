import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import { DeleveryTime, Time } from "../data/Data";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const PickUpScreen = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState([]);
  const [delivery, setDelivery] = useState([]);
  const navigation = useNavigation();

  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curruntValue, previouseValue) => curruntValue + previouseValue, 0);

  const proceedToCart = () => {
    if (!selectedDate || !selectedTime || !setDelivery) {
      Alert.alert(
        "Empty or Invalid",
        "Please select all the fileds",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    }

    if (selectedDate && selectedTime && delivery) {
      navigation.replace("Cart", {
        selectedTime: selectedTime,
        // pickUpDate: selectedDate,
        noOfDays: delivery,
      });
    }
  };

  return (
    <>
      <SafeAreaView>
        <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
          Enter Address
        </Text>
        <TextInput
          style={{
            padding: 40,
            borderColor: "gray",
            borderWidth: 0.7,
            paddingVertical: 80,
            borderRadius: 9,
            margin: 10,
          }}
        />
        <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
          Pick Up Date
        </Text>
        <HorizontalDatepicker
          mode="gregorian"
          startDate={new Date("2023-03-01")}
          endDate={new Date("2023-03-31")}
          initialSelectedDate={new Date("2023-01-22")}
          onSelectedDateChange={(date) => setSelectedDate(date)}
          selectedItemWidth={170}
          unselectedItemWidth={38}
          itemHeight={38}
          itemRadius={10}
          selectedItemTextStyle={styles.selectedItemTextStyle}
          unselectedItemTextStyle={styles.selectedItemTextStyle}
          selectedItemBackgroundColor="#222831"
          unselectedItemBackgroundColor="#ececec"
          flatListContainerStyle={styles.flatListContainerStyle}
        />

        <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
          Select Time
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {Time.map((item, index) => (
            <Pressable
              onPress={() => setSelectedTime(item.time)}
              key={index}
              style={
                selectedTime.includes(item.time)
                  ? {
                      margin: 10,
                      borderRadius: 7,
                      padding: 10,
                      backgroundColor: "purple",
                      borderWidth: 0.7,
                    }
                  : {
                      margin: 10,
                      borderRadius: 7,
                      padding: 10,
                      backgroundColor: "#E7E7E7",
                    }
              }
            >
              <Text
                style={
                  selectedTime.includes(item.time)
                    ? {
                        color: "white",
                      }
                    : {
                        color: "black",
                      }
                }
              >
                {item.time}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
          Delevery Date
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {DeleveryTime.map((item, index) => (
            <Pressable
              onPress={() => setDelivery(item.name)}
              key={index}
              style={
                delivery.includes(item.name)
                  ? {
                      margin: 10,
                      borderRadius: 7,
                      padding: 10,
                      backgroundColor: "green",
                      borderWidth: 0.7,
                    }
                  : {
                      margin: 10,
                      borderRadius: 7,
                      padding: 10,
                      backgroundColor: "#E7E7E7",
                      //   borderWidth: 0.7,
                    }
              }
            >
              <Text
                style={
                  delivery.includes(item.name)
                    ? {
                        color: "white",
                      }
                    : {
                        color: "black",
                      }
                }
              >
                {" "}
                {item.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </SafeAreaView>

      {total === 0 ? null : (
        <Pressable
          style={{
            backgroundColor: "#088f8f",
            padding: 10,
            marginBottom: 40,
            marginTop: "auto",
            margin: 15,
            borderRadius: 7,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 18, fontWeight: "600", color: "white" }}>
                {cart.length}{" "}
              </Text>
              <Text style={{ fontSize: 14, fontWeight: "600", color: "white" }}>
                Items |{" "}
              </Text>
              <Text style={{ fontSize: 18, fontWeight: "600", color: "white" }}>
                ${total}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 13,
                fontWeight: "400",
                color: "white",
                marginRight: 6,
              }}
            >
              Extra charges might apply
            </Text>
          </View>

          <Pressable
            onPress={proceedToCart}
            style={{
              backgroundColor: "yellow",
              padding: 1,
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "700",
                color: "black",
                marginRight: 6,
                padding: 10,
              }}
            >
              Proceed to Cart
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default PickUpScreen;

const styles = StyleSheet.create({});
