import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";

export const localRestaurants = [
  {
    name: "Beachside Bar",
    image_url:
      "https://www.worldsbestbars.com/wp-content/uploads/2020/04/Jeremiah-Cocktail-bar-Tokyo-003.jpeg",
    categories: ["Cafe", "Bar"],
    price: "$$",
    reviews: 1244,
    rating: 4.5,
  },
  {
    name: "Benihana",
    image_url:
      "https://cubaneros-holidayinn.com/wp-content/uploads/2020/07/Cubaneros-Beach-Bar-17-1170x650.jpg",
    categories: ["Cafe", "Bar"],
    price: "$$",
    reviews: 1244,
    rating: 3.7,
  },
  {
    name: "Indian's Grill",
    image_url:
      "https://cubaneros-holidayinn.com/wp-content/uploads/2020/07/Cubaneros-Beach-Bar-17-1170x650.jpg",
    categories: ["Indian", "Bar"],
    price: "$$",
    reviews: 700,
    rating: 4.9,
  },
];

export default function RestaurantItems({ navigation, ...props }) {
  const darkTheme = useSelector((state) => state.themeReducer.isDark);
  return (
    <>
      {props.restaurantData.map((restaurant, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={1}
          style={{ marginBottom: 30 }}
          onPress={() =>
            navigation.navigate("RestaurantDetails", {
              name: restaurant.name,
              image: restaurant.image_url,
              price: restaurant.price,
              reviews: restaurant.review_count,
              rating: restaurant.rating,
              categories: restaurant.categories,
            })
          }
        >
          <View
            style={{
              marginTop: 10,
              padding: 15,
              backgroundColor: darkTheme ? "#18191A" : "white",
              borderRadius: 8,
            }}
          >
            <RestaurantImage image={restaurant.image_url} />
            <RestaurantInfo name={restaurant.name} rating={restaurant.rating} />
          </View>
        </TouchableOpacity>
      ))}
    </>
  );
}

const RestaurantImage = (props) => {
  const darkTheme = useSelector((state) => state.themeReducer.isDark);
  return (
    <>
      <Image
        source={{
          uri: props.image,
        }}
        style={{
          width: "100%",
          height: 180,
          borderRadius: 5,
        }}
      />
      <TouchableOpacity style={{ position: "absolute", right: 20, top: 20 }}>
        <MaterialCommunityIcons name="heart-outline" size={25} color="#fff" />
      </TouchableOpacity>
    </>
  );
};

const RestaurantInfo = (props) => {
  const darkTheme = useSelector((state) => state.themeReducer.isDark);
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginRight: 10,
        marginTop: 4,
      }}
    >
      <View>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            color: darkTheme ? "white" : "black",
          }}
        >
          {props.name}
        </Text>
        <Text style={{ fontSize: 13, color: darkTheme ? "#adadad" : "grey" }}>
          30-45 • min
        </Text>
      </View>
      <View
        style={{
          backgroundColor: darkTheme ? "grey" : "#eee",
          height: 30,
          width: 30,
          alignItems: "center",
          borderRadius: 15,
          justifyContent: "center",
        }}
      >
        <Text>{props.rating}</Text>
      </View>
    </View>
  );
};
