import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { useSelector } from "react-redux";
import firebase from "../firebase";
import CollapsibleView from "@eliav2/react-native-collapsible-view";
import LottieView from "lottie-react-native";

export default function OrdersScreen() {
  const darkTheme = useSelector((state) => state.themeReducer.isDark);
  const [orders, setOrders] = useState([]);
  const db = firebase.firestore();

  useEffect(() => {
    db.collection("orders")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        setOrders(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  return (
    <View
      style={{
        backgroundColor: darkTheme ? "#0e0f0f" : "#eee",
        height: "100%",
      }}
    >
      <LottieView
        style={{
          height: 200,
          alignSelf: "center",
          backgroundColor: darkTheme ? "#0e0f0f" : "#eee",
        }}
        source={require("../assets/animations/orders.json")}
        autoPlay
        speed={0.5}
        loop={true}
      />
      <ScrollView style={{ backgroundColor: darkTheme ? "#0e0f0f" : "#eee" }}>
        {orders == [] ? (
          <Text>Loading</Text>
        ) : (
          orders.map((order, index) => (
            <CollapsibleView
              arrowStyling={{
                size: 22,
                thickness: 3,
                svgProps: { style: { backgroundColor: "green" } },
                polylineProps: { strokeLinejoin: "bevel" },
              }}
              titleStyle={{ color: "red" }}
              style={{
                borderWidth: 0,
                backgroundColor: darkTheme ? "#18191A" : "white",
                borderRadius: 7,
                paddingVertical: 20,
              }}
              key={index}
              title={
                "Restaurant: " +
                order.restaurantName +
                "        " +
                "Orders: " +
                order.items.length
              }
            >
              {order.items.map((item, index) => (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 15,
                    marginHorizontal: 15,
                  }}
                  key={index}
                >
                  <Image
                    style={{ width: 60, height: 60, borderRadius: 4 }}
                    source={{ uri: item.image }}
                  />

                  <Text
                    style={{
                      fontSize: 16,
                      color: darkTheme ? "white" : "black",
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: darkTheme ? "white" : "black",
                    }}
                  >
                    {item.price}
                  </Text>
                </View>
              ))}
            </CollapsibleView>
          ))
        )}
      </ScrollView>
    </View>
  );
}
