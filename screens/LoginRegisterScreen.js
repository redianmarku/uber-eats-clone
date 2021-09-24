import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { useSelector } from "react-redux";
import Login from "../components/account/Login";
import Register from "../components/account/Register";
import LottieView from "lottie-react-native";

const styles = StyleSheet.create({
  fieldStyle: {
    fontSize: 16,
    padding: 13,
    marginVertical: 5,

    borderBottomWidth: 1,
  },
  buttonStyle: {
    marginTop: 20,
    backgroundColor: "green",
    borderWidth: 0,
    padding: 15,
    borderRadius: 3,
  },
});

export default function LoginRegisterScreen({ navigation }) {
  const darkTheme = useSelector((state) => state.themeReducer.isDark);
  const [engine, setEngine] = useState("register");

  return (
    <View
      style={{
        backgroundColor: darkTheme ? "#18191A" : "white",
        height: "100%",
      }}
    >
      <View>
        <Image
          style={{ height: 170, width: 300, alignSelf: "center" }}
          source={
            darkTheme
              ? require("../assets/images/logo.png")
              : require("../assets/images/logo-light.png")
          }
        />

        {engine == "register" ? (
          <Register navigation={navigation} setEngine={setEngine} />
        ) : (
          <Login navigation={navigation} setEngine={setEngine} />
        )}
      </View>

      <LottieView
        style={{
          height: 300,
          alignSelf: "center",
          backgroundColor: darkTheme ? "#18191A" : "white",
        }}
        source={require("../assets/animations/opening-dark.json")}
        autoPlay
        speed={0.5}
        loop={false}
      />
    </View>
  );
}
