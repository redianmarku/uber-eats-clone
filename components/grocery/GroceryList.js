import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Divider } from "react-native-elements";
import { useSelector } from "react-redux";
import GroceryItem from "./GroceryItem";

export default function GroceryList(props) {
  const darkTheme = useSelector((state) => state.themeReducer.isDark);
  return (
    <View style={{ marginBottom: 10 }}>
      <Text
        style={{
          color: darkTheme ? "white" : "black",
          fontSize: 20,
          fontWeight: "bold",
          margin: 10,
        }}
      >
        {props.name}
      </Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: "row" }}>
          {props.data.map((item, index) => (
            <GroceryItem
              key={index}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
        </View>
      </ScrollView>
      <Divider
        width={0.5}
        style={{ marginHorizontal: 10, marginVertical: 7 }}
        color="#b5b5b5"
      />
    </View>
  );
}
