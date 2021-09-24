import React from "react";
import { View, Text, Image } from "react-native";
import { useSelector } from "react-redux";

// const yelpRestaurantInfo = {
//   name: "Farmhouse Kitchen Thai Cuisine",
//   image:
//     "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHJlc3RhdXJhbnR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
//   price: "$$",
//   reviews: "1442",
//   rating: 5,
//   categories: [{ title: "Thai" }, { title: "Asian" }],
// };

export default function About(props) {
  const darkTheme = useSelector((state) => state.themeReducer.isDark);
  const { name, image, price, reviews, rating, categories } =
    props.route.params;

  const formattedCategories = categories.map((cat) => cat.title).join(" • ");

  const description = `${formattedCategories} ${
    price ? " • " + price : ""
  } • 🎫 • ${rating} ⭐ (${reviews}+)`;

  return (
    <View style={{ backgroundColor: darkTheme ? "#18191A" : "#eee" }}>
      <RestaurantImage image={image} />
      <RestaurantName name={name} />
      <RestaurantDescriptio description={description} />
    </View>
  );
}

const RestaurantImage = (props) => (
  <Image source={{ uri: props.image }} style={{ width: "100%", height: 180 }} />
);

const RestaurantName = (props) => {
  const darkTheme = useSelector((state) => state.themeReducer.isDark);
  return (
    <Text
      style={{
        fontSize: 29,
        fontWeight: "bold",
        marginTop: 10,
        marginHorizontal: 15,
        color: darkTheme ? "white" : "black",
      }}
    >
      {props.name}
    </Text>
  );
};

const RestaurantDescriptio = (props) => {
  const darkTheme = useSelector((state) => state.themeReducer.isDark);
  return (
    <Text
      style={{
        marginTop: 10,
        marginHorizontal: 15,
        fontWeight: "400",
        fontSize: 15.5,
        color: darkTheme ? "white" : "black",
        marginBottom: 15,
      }}
    >
      {props.description}
    </Text>
  );
};
