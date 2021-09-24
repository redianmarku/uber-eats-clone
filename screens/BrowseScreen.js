import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { localRestaurants } from "../components/home/RestaurantItems";
import SearchBar from "../components/home/SearchBar";
import { YELP_API_KEY } from "./Home";
import LottieView from "lottie-react-native";

let { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function BrowseScreen({ navigation }) {
  const darkTheme = useSelector((state) => state.themeReducer.isDark);
  const [city, setCity] = useState("LosAngeles");
  const [restaurantData, setRestaturantData] = useState(localRestaurants);
  const [loading, setLoading] = useState(false);

  const fetchRestaurantData = () => {
    setLoading(true);
    const yelpurl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;

    const apiOptions = {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
    };

    return fetch(yelpurl, apiOptions)
      .then((res) => res.json())
      .then((json) => setRestaturantData(json.businesses))
      .catch((err) => {
        setRestaturantData(localRestaurants);
      })
      .then(() => {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
  };

  useEffect(() => {
    fetchRestaurantData();
  }, [city]);

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
        <SearchBar cityHandler={setCity} />
      </View>

      {loading ? (
        <LottieView
          style={{
            height: 350,
            position: "absolute",
            top: 100,
            right: 15,
          }}
          source={require("../assets/animations/loading.json")}
          autoPlay
          speed={2}
        />
      ) : (
        <Galery
          loading={loading}
          navigation={navigation}
          images={restaurantData}
        />
      )}
    </SafeAreaView>
  );
}

const Galery = (props) => {
  const renderImages = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 999,
        }}
      >
        {props.loading ? (
          <LottieView
            style={{
              height: 350,
              position: "absolute",
              top: 100,
              right: 15,
            }}
            source={require("../assets/animations/scanner.json")}
            autoPlay
            speed={4}
          />
        ) : (
          <TouchableOpacity
            style={{}}
            onPress={() =>
              props.navigation.navigate("RestaurantDetails", {
                name: item.name,
                image: item.image_url,
                price: item.price,
                reviews: item.review_count,
                rating: item.rating,
                categories: item.categories,
              })
            }
          >
            <Image
              style={{
                height: screenWidth / 3,
                width: screenWidth / 3,
              }}
              source={{ uri: item.image_url }}
            />
            <Text
              style={{
                color: "white",
                position: "absolute",
                textAlign: "center",
                fontWeight: "bold",
                backgroundColor: "rgba(0,0,0,0.3)",
                padding: 20,
                width: screenWidth / 3,
                height: screenWidth / 3,
                paddingVertical: 55,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  return (
    <View>
      <FlatList
        data={props.images}
        renderItem={renderImages}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
