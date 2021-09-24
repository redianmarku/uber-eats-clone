import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text } from "react-native";
import { View } from "react-native";
import Categories from "../components/home/Categories";
import HeaderTabs from "../components/home/HeaderTabs";
import { Divider } from "react-native-elements";
import RestaurantItems, {
  localRestaurants,
} from "../components/home/RestaurantItems";
import SafeAndroidView from "../components/home/SafeAndroidView";
import SearchBar from "../components/home/SearchBar";

import { useSelector } from "react-redux";
import { StyleSheet, Platform, StatusBar } from "react-native";

export const YELP_API_KEY =
  "OEQliltTLb-ghVeecLmFB6BMdn0StoRqn4FuPS3_LAnATGO9JmKxPvYFzte36FJKW__uRrk7vlO9nyUtqU9B0nTNrQINV5KEEASP4yQknUCCnWfODBjCK4qk-YdJYXYx";

export default function Home({ navigation }) {
  const [restaurantData, setRestaturantData] = useState(localRestaurants);
  const [city, setCity] = useState("LosAngelos");
  const [activeTab, setActiveTab] = useState("Delivery");

  const fetchRestaurantData = () => {
    const yelpurl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;

    const apiOptions = {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
    };

    return fetch(yelpurl, apiOptions)
      .then((res) => res.json())
      .then((json) =>
        setRestaturantData(
          json.businesses.filter((business) =>
            business.transactions.includes(activeTab.toLowerCase())
          )
        )
      )
      .catch((err) => {
        setRestaturantData(localRestaurants);
      });
  };

  useEffect(() => {
    fetchRestaurantData();
  }, [city, activeTab]);

  const darkTheme = useSelector((state) => state.themeReducer.isDark);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: darkTheme ? "#0e0f0f" : "#eee",
      }}
    >
      <View
        style={{
          backgroundColor: darkTheme ? "#18191A" : "white",
          padding: 15,
        }}
      >
        <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <SearchBar cityHandler={setCity} />
      </View>
      <ScrollView
        style={{ backgroundColor: darkTheme ? "#0e0f0f" : "#eee" }}
        showsVerticalScrollIndicator={false}
      >
        <Categories />
        <RestaurantItems
          restaurantData={restaurantData}
          navigation={navigation}
        />
      </ScrollView>

      <Divider color="black" width={1} />
    </SafeAreaView>
  );
}
