import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-web";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase";

export default function Login({ navigation, ...props }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const darkTheme = useSelector((state) => state.themeReducer.isDark);

  const styles = StyleSheet.create({
    fieldStyle: {
      fontSize: 16,
      padding: 13,
      marginVertical: 5,
      color: darkTheme ? "white" : "black",
      borderBottomColor: darkTheme ? "white" : "black",
      borderBottomWidth: 1,
    },
    buttonStyle: {
      marginTop: 20,
      backgroundColor: "green",
      borderWidth: 0,
      padding: 15,
      borderRadius: 10,
    },
  });

  const loginUser = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        dispatch({
          type: "LOGIN_USER",
          payload: {
            name: result.user.displayName,
            email: result.user.email,
            id: result.user.uid,
          },
        });
      })
      .catch((error) => {
        if (error.code === "auth/invalid-password") {
          alert("Invalid password!");
        }
        if (error.code === "auth/invalid-email") {
          alert("That email address is invalid!");
        }
        alert(error.message);
      });
  };

  const toggleEngine = () => {
    props.setEngine("register");
  };

  return (
    <View
      style={{
        marginHorizontal: 30,
        margin: 10,
      }}
    >
      <TextInput
        style={styles.fieldStyle}
        onChangeText={setEmail}
        value={email}
        placeholder="Email Address"
        placeholderTextColor={darkTheme ? "white" : "grey"}
      />
      <TextInput
        style={styles.fieldStyle}
        onChangeText={setPassword}
        value={password}
        placeholder="Your password"
        secureTextEntry={true}
        placeholderTextColor={darkTheme ? "white" : "grey"}
      />
      <TouchableOpacity onPress={loginUser} style={styles.buttonStyle}>
        <Text
          style={{
            fontSize: 16,
            color: "white",
            alignSelf: "center",
            fontWeight: "bold",
          }}
        >
          Login
        </Text>
      </TouchableOpacity>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          alignSelf: "center",
          marginTop: 15,
        }}
      >
        <Text style={{ color: darkTheme ? "white" : "black" }}>
          Dont have an account?{" "}
        </Text>
        <TouchableOpacity onPress={toggleEngine}>
          <Text style={{ color: "green" }}>REGISTER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
