import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebase";

export default function Register(props) {
  const darkTheme = useSelector((state) => state.themeReducer.isDark);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();

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

  const signUpUser = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user
          .updateProfile({ displayName: name })
          .then(() => {
            dispatch({
              type: "LOGIN_USER",
              payload: {
                name: result.user.displayName,
                email: result.user.email,
                id: result.user.uid,
              },
            });
          })
          .catch((err) => {
            alert(err.message);
          });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          alert("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          alert("That email address is invalid!");
        }

        alert(error.message);
      });
  };

  const toggleEngine = () => {
    props.setEngine("login");
  };

  return (
    <>
      <View>
        <View
          style={{
            marginHorizontal: 30,
            margin: 10,
          }}
        >
          <TextInput
            style={styles.fieldStyle}
            onChangeText={setName}
            value={name}
            placeholder="Your Name"
            placeholderTextColor={darkTheme ? "white" : "grey"}
          />
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
            placeholder="Choose a password"
            secureTextEntry={true}
            placeholderTextColor={darkTheme ? "white" : "grey"}
          />
          <TouchableOpacity onPress={signUpUser} style={styles.buttonStyle}>
            <Text
              style={{
                fontSize: 16,
                color: "white",
                alignSelf: "center",
                fontWeight: "bold",
              }}
            >
              Register
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
              Already have an account?{" "}
            </Text>
            <TouchableOpacity onPress={toggleEngine}>
              <Text style={{ color: "green" }}>LOGIN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}
