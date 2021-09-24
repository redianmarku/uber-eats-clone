import React from "react";
import { View, Text } from "react-native";
import { Divider } from "react-native-elements";
import About from "../components/restaurantDetails/About";
import MenuItems from "../components/restaurantDetails/MenuItems";
import ViewCart from "../components/restaurantDetails/ViewCart";

const foods = [
  {
    title: "Lasagna",
    description: "With butter lettuce, tomato and souce bechamel",
    price: "$13.50",
    image:
      "https://thestayathomechef.com/wp-content/uploads/2017/08/Most-Amazing-Lasagna-2-e1574792735811.jpg",
  },
  {
    title: "Homestyle Burger",
    description: "Includes large French Fries and you choice of large drink",
    price: "$11.73",
    image:
      "https://img.cdn4dd.com/cdn-cgi/image/fit=cover,width=1200,height=1200,format=jpeg,quality=50/https://doordash-static.s3.amazonaws.com/media/photos/33ecdcb3-7771-48a9-8ed9-561f197dc80c-retina-large-jpeg",
  },
  {
    title: "Egg Bacon",
    description: "With cheese, avocado, egg and bacon",
    price: "$6.50",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/ac/Bacon%2C_egg%2C_and_cheese_on_bread.jpg",
  },
  {
    title: "Tomato Soup",
    description: "Delicious soup made of tomatos, and spicy",
    price: "$10.30",
    image:
      "https://jessicainthekitchen.com/wp-content/uploads/2020/02/Creamy-Tomato-Soup-with-Cheesy-Croutons-Vegan-4-500x375.jpg",
  },
  {
    title: "Strawberry Brioche",
    description: "Strawberry Brioche with Pearl Sugar and Concealment",
    price: "$5.25",
    image:
      "https://www.bakefromscratch.com/wp-content/uploads/2018/03/strawberry-brioche-bread.jpg",
  },
  {
    title: "Meat Piza",
    description: "Peperoni, bacon, Italian sousage, ham and mozzarella cheese",
    price: "$13.99",
    image:
      "https://emilybites.com/wp-content/uploads/2011/12/Meat-Lover-27s-Pizza-1c.jpg",
  },
  {
    title: "Penne Vodka",
    description: "Pink sounce and chicken",
    price: "$13.95",
    image:
      "https://www.cookingclassy.com/wp-content/uploads/2020/01/penne-alla-vodka-10.jpg",
  },
];

export default function RestaurantDetails({ route, navigation }) {
  return (
    <View>
      <About route={route} />
      <Divider width={1.8} />
      <MenuItems restaurantName={route.params.name} food={foods} />
      <ViewCart navigation={navigation} />
    </View>
  );
}
