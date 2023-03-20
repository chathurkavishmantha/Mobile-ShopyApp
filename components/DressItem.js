import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
// import { width } from "deprecated-react-native-prop-types/DeprecatedImagePropType";
import { useDispatch, useSelector } from "react-redux";
import { decrementQty, incrementQty } from "../data/ProductReducer";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from "../data/CartReducer";

const DressItem = ({ item }) => {
  // console.log("im item", item);
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.cart);

  const addItemToCart = () => {
    dispatch(addToCart(item)); //cart
    dispatch(incrementQty(item)); //product
  };

  return (
    <View style={{ backgroundColor: "white", margin: 10, borderRadius: 7 }}>
      <Pressable
        style={{
          backgroundColor: "#f8f8f8f",
          borderRadius: 8,
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          margin: 14,
        }}
      >
        <View>
          <Image
            source={{ uri: item.image }}
            style={{ width: 70, height: 70 }}
          />
        </View>
        <View>
          <Text>{item.name}</Text>
          <Text>${item.price}</Text>
        </View>

        {cart.some((c) => c.id === item.id) ? (
          <Pressable
            style={{
              flexDirection: "row",
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}
          >
            <Pressable
              onPress={() => {
                dispatch(decrementQuantity(item)); //cart
                dispatch(decrementQty(item)); //product
              }}
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                borderColor: "#BEBEBE",
                backgroundColor: "#E0E0E0",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 19,
                  color: "#088f8f",
                  paddingHorizontal: 6,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                -
              </Text>
            </Pressable>

            <Pressable>
              <Text
                style={{
                  fontSize: 19,
                  color: "#088f8f",
                  paddingHorizontal: 8,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                {item.quantity}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
                dispatch(incrementQuantity(item)); //cart
                dispatch(incrementQty(item)); //product
              }}
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                borderColor: "#BEBEBE",
                backgroundColor: "#E0E0E0",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 19,
                  color: "#088f8f",
                  paddingHorizontal: 6,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                +
              </Text>
            </Pressable>
          </Pressable>
        ) : (
          <Pressable onPress={addItemToCart} style={{ width: 80 }}>
            <Text
              style={{
                borderColor: "gray",
                borderWidth: 0.8,
                marginVertical: 10,
                color: "#088f8f",
                textAlign: "center",
                padding: 5,
                fontSize: 17,
                fontWeight: "bold",
                borderRadius: 6,
              }}
            >
              Add
            </Text>
          </Pressable>
        )}
      </Pressable>
    </View>
  );
};

export default DressItem;

const styles = StyleSheet.create({});
