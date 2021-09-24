import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export const Icon = (props) => {
  return (
    <>
      <FontAwesome5
        name={props.icon}
        size={25}
        style={{
          margin: 3,
          alignSelf: "center",
          marginLeft: 1,
          color: props.color,
        }}
      />
      <Text style={{ color: props.color }}>{props.text}</Text>
    </>
  );
};
