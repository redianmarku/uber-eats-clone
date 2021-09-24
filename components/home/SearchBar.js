import React from "react";
import { View, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useSelector } from "react-redux";

export default function SearchBar({ cityHandler }) {
  const darkTheme = useSelector((state) => state.themeReducer.isDark);
  return (
    <View style={{ marginTop: 15, flexDirection: "row" }}>
      <GooglePlacesAutocomplete
        textInputProps={{
          placeholderTextColor: darkTheme ? "#d9d9d9" : "grey",
        }}
        placeholderTextColor="white"
        query={{ key: "AIzaSyCGNJGBJOecbrUdm-KAla_o6LAhPuBUDq8" }}
        onPress={(data, details = null) => {
          const city = data.description.split(",")[0];
          cityHandler(city);
        }}
        placeholder="Search"
        backgroundColor="black"
        styles={{
          textInputContainer: {
            backgroundColor: darkTheme ? "#525252" : "#eee",
            borderRadius: 50,
            flexDirection: "row",
            alignItems: "center",
          },
          powered: { display: "none" },
          row: {
            padding: 13,
            height: 44,
            flexDirection: "row",
            color: "white",
          },
          textInput: {
            backgroundColor: darkTheme ? "#525252" : "#eee",
            borderRadius: 20,
            fontWeight: "700",
            marginTop: 7,
            color: darkTheme ? "white" : "black",
          },
        }}
        renderLeftButton={() => (
          <View style={{ marginLeft: 10 }}>
            <Ionicons
              style={{ paddingLeft: 3, color: darkTheme ? "white" : "black" }}
              name="location-sharp"
              size={24}
            />
          </View>
        )}
        renderRightButton={() => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexDirection: "row",
              backgroundColor: darkTheme ? "grey" : "white",
              padding: 9,
              borderRadius: 30,
              marginRight: 8,
            }}
          >
            <AntDesign
              name="clockcircle"
              size={11}
              style={{
                marginRight: 6,
                color: darkTheme ? "white" : "black",
              }}
            />
            <Text>Search</Text>
          </View>
        )}
      />
    </View>
  );
}
