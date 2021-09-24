import React from "react";
import { View, Text, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";

export default function GroceryItem(props) {
  const darkTheme = useSelector((state) => state.themeReducer.isDark);
  const dispatch = useDispatch();
  return (
    <View>
      <View style={{ marginHorizontal: 7, width: 130 }}>
        <Image
          style={{ height: 65, width: 85, margin: 30 }}
          source={{ uri: props.image }}
        />
        <Text
          style={{ color: darkTheme ? "white" : "black", fontWeight: "bold" }}
        >
          {props.name}
        </Text>
        <Text style={{ color: "green" }}>{props.price}</Text>
      </View>
    </View>
  );
}
