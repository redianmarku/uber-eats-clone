import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Switch,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function HeaderTabs(props) {
  const dispatch = useDispatch();
  const setToggle = (prev) => {
    dispatch({
      type: "SET_DARK",
      payload: {
        isEnabled: prev,
      },
    });
  };

  // useEffect(() => {
  //   let mounted = true;
  //   if (isEnabled) {
  //     getDark().then((data) => {
  //       if (mounted) {
  //       }
  //     });
  //   } else {
  //     dispatch({
  //       type: "RESET",
  //     });
  //   }

  //   return () => {
  //     mounted = false;
  //   };
  // }, [isEnabled]);

  const darkTheme = useSelector((state) => state.themeReducer.isDark);

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <View style={{ flexDirection: "row", alignSelf: "center" }}>
        <HeaderButton
          text="Delivery"
          btnColor="yellow"
          txtColor="white"
          activeTab={props.activeTab}
          setactiveTab={props.setActiveTab}
        />
        <HeaderButton
          text="Pickup"
          btnColor="white"
          txtColor="black"
          activeTab={props.activeTab}
          setactiveTab={props.setActiveTab}
        />
      </View>
      <View style={{ left: 80, flexDirection: "row", alignItems: "center" }}>
        <Text
          style={{
            fontWeight: "bold",
            marginRight: 8,
            color: darkTheme ? "white" : "black",
          }}
        >
          Dark Mode
        </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#e3e3e3" }}
          thumbColor={darkTheme ? "#7d7d7d" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={(prev) => setToggle(prev)}
          value={darkTheme}
        />
      </View>
    </View>
  );
}

const HeaderButton = (props) => {
  const darkTheme = useSelector((state) => state.themeReducer.isDark);

  return (
    <TouchableOpacity
      style={{
        backgroundColor: darkTheme
          ? props.activeTab == props.text
            ? "white"
            : "#363636"
          : props.activeTab == props.text
          ? "black"
          : "white",
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 30,
      }}
      onPress={() => props.setactiveTab(props.text)}
    >
      <Text
        style={{
          color: darkTheme
            ? props.activeTab == props.text
              ? "black"
              : "white"
            : props.activeTab == props.text
            ? "white"
            : "black",
          fontSize: 15,
          fontWeight: "bold",
        }}
      >
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};
