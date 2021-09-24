import React, { useState } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import AccountSettings from "../components/account/AccountSettings";

export default function AccountScreen({ navigation }) {
  const darkTheme = useSelector((state) => state.themeReducer.isDark);

  return (
    <View
      style={{
        backgroundColor: darkTheme ? "#18191A" : "white",
        height: "100%",
      }}
    >
      <View
        style={{
          backgroundColor: darkTheme ? "#18191A" : "#eee",
        }}
      >
        <AccountSettings />
      </View>
    </View>
  );
}
