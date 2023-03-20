import { StyleSheet, Text, ScrollView, View, Pressable } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { decrementQuantity, incrementQuantity } from "../data/CartReducer";
import { decrementQty, incrementQty } from "../data/ProductReducer";

const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const route = useRoute();

  const navigation = useNavigation();
  const dispatch = useDispatch();
  console.log("im route", route);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curruntValue, previouseValue) => curruntValue + previouseValue, 0);

  return (
    <>
    <ScrollView style={{ marginTop: 50 }}>
      {total === 0 ? (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ marginTop: 40 }}>Your cart is empty</Text>
        </View>
      ) : (
        <>
          <View
            style={{ padding: 10, flexDirection: "row", alignItems: "center" }}
          >
            <Ionicons
              onPress={() => navigation.goBack()}
              name="arrow-back"
              size={24}
              color="black"
            />
            <Text>Your Bucket</Text>
          </View>

          <Pressable
            style={{
              backgroundColor: "white",
              borderRadius: 12,
              marginLeft: 10,
              marginRight: 10,
              padding: 14,
            }}
          >
            {cart.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <View style={{ width: 90 }}>
                  <Text style={{ fontSize: 16, fontWeight: "600" }}>
                    {item.name}
                  </Text>
                </View>

                {/* Button */}
                <View style={{ width: 90 }}>
                  <Pressable
                    style={{
                      flexDirection: "row",
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      alignItems: "center",
                      borderRadius: 10,
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
                </View>

                <Text style={{ fontSize: 16, fontWeight: "600" }}>
                  {item.price * item.quantity}
                </Text>
              </View>
            ))}
          </Pressable>

          <View style={{ marginHorizontal: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 30 }}>
              Billing Details
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 7,
              padding: 15,
              margin:10,
              marginTop: 15,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 17, fontWeight: "400", color: "gray" }}>
                Item Total 
              </Text>
              <Text
                style={{ fontSize: 18, fontWeight: "400", color: "#088f8f" }}
              >
                ${total}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginVertical: 8,
              }}
            >
              <Text style={{ fontSize: 17, fontWeight: "400", color: "gray" }}>
                Delivery Fee | 1.2 Km
              </Text>
              <Text
                style={{ fontSize: 18, fontWeight: "400", color: "#088f8f" }}
              >
                Free
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 17, fontWeight: "500", color: "gray" }}>
                Free Delivery on Your order
              </Text>
            </View>
            <View
              style={{
                borderColor: "gray",
                height: 1,
                borderWidth: 0.5,
                marginTop: 10,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginVertical: 10,
              }}
            >
              <Text style={{ fontSize: 17, fontWeight: "400", color: "gray" }}>
                Selected Date
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "400",
                  color: "#088f8f",
                }}
              ></Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignContent: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "400",
                  color: "gray",
                }}
              >
                No of Days
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "400",
                  color: "#088f8f",
                }}
              >
                {route.params.noOfDays}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignContent: "center",
                justifyContent: "space-between",
                marginVertical: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  color: "gray",
                  fontWeight: "400",
                }}
              >
                Selected Pick Up Time
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "400",
                  color: "#088f8f",
                }}
              >
                {route.params.selectedTime}
              </Text>
            </View>

            <View
              style={{
                borderColor: "gray",
                height: 1,
                borderWidth: 0.5,
                marginTop: 10,
              }}
            />

            <View
              style={{
                flexDirection: "row",
                alignContent: "center",
                justifyContent: "space-between",
                marginVertical: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                }}
              >
                To Pay
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  marginRight: 4,
                }}
              >
                ${total + 95}
              </Text>
            </View>
          </View>
        </>
      )}
    </ScrollView>

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
              Place Order
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>

    
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
