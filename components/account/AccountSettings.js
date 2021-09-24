import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-elements";
import { useSelector } from "react-redux";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Icon } from "../home/BottomTabs";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase";

export default function AccountSettings() {
  const user = useSelector((state) => state.authReducer.user);
  const darkTheme = useSelector((state) => state.themeReducer.isDark);
  const dispatch = useDispatch();

  const logOutUser = () => {
    auth.signOut();
    dispatch({
      type: "LOGOUT_USER",
      payload: {
        user: null,
      },
    });
  };

  return (
    <View style={{ backgroundColor: darkTheme ? "#0e0f0f" : "white" }}>
      <View>
        <Avatar
          size="xlarge"
          containerStyle={{
            backgroundColor: "green",
            borderRadius: 100,
            alignSelf: "center",
            margin: 20,
          }}
          title={user.name.charAt(0).toUpperCase()}
        ></Avatar>
        <Text
          style={{
            color: darkTheme ? "white" : "black",
            fontWeight: "bold",
            fontSize: 30,
            alignSelf: "center",
          }}
        >
          {user.name}
        </Text>
        <Text
          style={{
            color: "grey",
            alignSelf: "center",
            fontSize: 16,
            margin: 10,
          }}
        >
          {user.email}
        </Text>
      </View>

      <View style={{ height: "100%" }}>
        <ScrollView>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "center",
              marginVertical: 30,
            }}
          >
            <Icon icon="bell" color="green" />
            <Text
              style={{
                color: darkTheme ? "white" : "black",
                fontSize: 20,
                marginLeft: 10,
              }}
            >
              Notification Settings
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "center",
              marginVertical: 30,
            }}
          >
            <Icon icon="user-cog" color="green" />
            <Text
              style={{
                color: darkTheme ? "white" : "black",
                fontSize: 20,
                marginLeft: 10,
              }}
            >
              Account Settings
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "center",
              marginVertical: 30,
            }}
          >
            <Icon icon="list-alt" color="green" />
            <Text
              style={{
                color: darkTheme ? "white" : "black",
                fontSize: 20,
                marginLeft: 10,
              }}
            >
              My Orders
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "center",
              marginVertical: 30,
            }}
          >
            <Icon icon="heart" color="green" />
            <Text
              style={{
                color: darkTheme ? "white" : "black",
                fontSize: 20,
                marginLeft: 10,
              }}
            >
              Wishlist
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={logOutUser}
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "center",
              marginVertical: 30,
            }}
          >
            <Icon icon="sign-out-alt" color="green" />
            <Text
              style={{
                color: darkTheme ? "white" : "black",
                fontSize: 22,
                marginLeft: 10,
              }}
            >
              LOG OUT
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}
