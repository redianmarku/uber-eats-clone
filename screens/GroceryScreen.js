import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import GroceryList from "../components/grocery/GroceryList";
import grocery from "../components/grocery/groceryData";
import LottieView from "lottie-react-native";

export default function GroceryScreen() {
  const darkTheme = useSelector((state) => state.themeReducer.isDark);
  const [buying, setBuying] = useState(false);
  const [loading, setLoading] = useState(true);

  const start = () => {
    setBuying(true);
    setTimeout(function () {
      setLoading(false);
    }, 2000);
  };

  return (
    <View
      style={{
        backgroundColor: darkTheme ? "#0e0f0f" : "#eee",
        height: "100%",
      }}
    >
      {buying ? (
        <>
          <LottieView
            style={{
              height: 200,
              alignSelf: "center",
            }}
            autoPlay
            autoSize
            source={require("../assets/animations/think.json")}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <GroceryList
              name="Fruit & Vegetables"
              data={grocery.fruitvagetables}
            />
            <GroceryList name="Dairy & Eggs" data={grocery.diaryegg} />
            <GroceryList name="Snacks & Cookies" data={grocery.snakscookie} />
          </ScrollView>
          {loading ? (
            <View
              style={{
                backgroundColor: darkTheme ? "black" : "#eee",
                position: "absolute",
                possition: "absolute",
                justifyContent: "center",
                alignSelf: "center",
                height: "100%",
                width: "100%",
              }}
            >
              <LottieView
                style={{
                  height: 250,
                  position: "absolute",
                  top: 85,
                  right: 20,
                }}
                source={require("../assets/animations/loading-grocery.json")}
                autoPlay
                speed={3}
              />
            </View>
          ) : null}
        </>
      ) : (
        <>
          <LottieView
            style={{
              height: 400,
              position: "absolute",
              top: 35,
              right: -15,
            }}
            source={require("../assets/animations/online-grocery.json")}
          />
          <TouchableOpacity
            onPress={start}
            style={{
              marginTop: 500,
              backgroundColor: "green",
              borderWidth: 0,
              padding: 15,
              borderRadius: 10,
              width: 300,
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "white",
                alignSelf: "center",
                fontWeight: "bold",
              }}
            >
              Start Buying
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
