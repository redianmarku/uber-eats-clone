import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { useSelector } from "react-redux";

const items = [
  {
    image: require("../../assets/images/shopping-bag.png"),
    text: "Pick-up",
  },
  {
    image: require("../../assets/images/soft-drink.png"),
    text: "Soft Driks",
  },

  {
    image: require("../../assets/images/bread.png"),
    text: "Bakery Items",
  },
  {
    image: require("../../assets/images/fast-food.png"),
    text: "Fast Food",
  },
  {
    image: require("../../assets/images/deals.png"),
    text: "Deals",
  },
  {
    image: require("../../assets/images/coffee.png"),
    text: "Coffee & Tea",
  },
  {
    image: require("../../assets/images/desserts.png"),
    text: "Desserts",
  },
];

export default function Categories() {
  const darkTheme = useSelector((state) => state.themeReducer.isDark);
  return (
    <View
      style={{
        marginTop: 10,
        backgroundColor: darkTheme ? "#18191A" : "white",
        paddingVertical: 10,
        paddingLeft: 10,
        paddingRight: 10,
      }}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {items.map((item, index) => (
          <View key={index} style={{ alignItems: "center", marginRight: 30 }}>
            <Image
              source={item.image}
              style={{
                width: 50,
                height: 40,
                resizeMode: "contain",
              }}
            />
            <Text
              style={{
                fontSize: 13,
                fontWeight: "bold",
                color: darkTheme ? "white" : "black",
              }}
            >
              {item.text}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
