import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import SafeAndroidView from "../components/home/SafeAndroidView";
import LottieView from "lottie-react-native";
import firebase from "../firebase";
import MenuItems from "../components/restaurantDetails/MenuItems";

export default function OrderCompleted() {
  const darkTheme = useSelector((state) => state.themeReducer.isDark);
  const [lastOrder, setlastOrder] = useState({
    items: [
      {
        title: "Lasagna",
        description: "With butter lettuce, tomato and souce bechamel",
        price: "$13.50",
        image:
          "https://thestayathomechef.com/wp-content/uploads/2017/08/Most-Amazing-Lasagna-2-e1574792735811.jpg",
      },
    ],
  });
  const { items, restaurantName } = useSelector(
    (state) => state.cartReducer.selectedItems
  );
  const total = items
    .map((item) => Number(item.price.replace("$", "")))
    .reduce((prev, curr) => prev + curr, 0);

  const totalUSD = total.toLocaleString("en", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    const db = firebase.firestore();
    const unsubscribe = db
      .collection("orders")
      .orderBy("createdAt", "desc")
      .limit(1)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          setlastOrder(doc.data());
        });
      });
    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: darkTheme ? "#0e0f0f" : "white" }}
    >
      <View style={{ margin: 15, alignItems: "center", height: "100%" }}>
        <View style={{ backgroundColor: darkTheme ? "#0e0f0f" : "white" }}>
          <LottieView
            style={{ height: 100, alignSelf: "center", marginBottom: 30 }}
            source={require("../assets/animations/check-mark.json")}
            autoPlay
            speed={0.5}
            loop={false}
          />
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
              color: darkTheme ? "white" : "black",
            }}
          >
            Your order at {restaurantName} has been placed {totalUSD}
          </Text>
          <ScrollView>
            <MenuItems food={lastOrder.items} hideCheckbox={true} />
          </ScrollView>

          <LottieView
            style={{
              height: 250,
              alignSelf: "center",
              marginBottom: 30,
              backgroundColor: "#0e0f0f",
            }}
            source={
              darkTheme
                ? require("../assets/animations/cooking-dark1.json")
                : require("../assets/animations/cooking.json")
            }
            autoPlay
            speed={0.5}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
