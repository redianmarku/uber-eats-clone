import React from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";

export default function OrderItem({ item }) {
  const darkTheme = useSelector((state) => state.themeReducer.isDark);
  const { title, price } = item;
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
      }}
    >
      <Text
        style={{
          fontWeight: "600",
          fontSize: 16,
          color: darkTheme ? "white" : "black",
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          opacity: 0.7,
          fontSize: 16,
          color: darkTheme ? "white" : "black",
        }}
      >
        {price}
      </Text>
    </View>
  );
}
