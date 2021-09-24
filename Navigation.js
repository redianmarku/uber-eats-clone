import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home";
import RestaurantDetails from "./screens/RestaurantDetails";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./redux/store";
import OrderCompleted from "./screens/OrderCompleted";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BrowseScreen from "./screens/BrowseScreen";
import GroceryScreen from "./screens/GroceryScreen";
import OrdersScreen from "./screens/OrdersScreen";
import AccountScreen from "./screens/AccountScreen";
import { Icon } from "./components/home/BottomTabs";
import { useSelector } from "react-redux";
import LoginRegisterScreen from "./screens/LoginRegisterScreen";

const store = configureStore();

const Tab = createBottomTabNavigator();

export default function RootNavigation() {
  const darkTheme = useSelector((state) => state.themeReducer.isDark);
  const loggedInUser = useSelector((state) => state.authReducer.user);
  const Stack = createStackNavigator();

  const screenStackOptions = {
    headerShown: false,
  };

  function HomeStackScreen() {
    return (
      <Stack.Navigator screenOptions={screenStackOptions}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="RestaurantDetails" component={RestaurantDetails} />
        <Stack.Screen name="OrderCompleted" component={OrderCompleted} />
        <Stack.Screen name="AccountScreen" component={AccountScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: {
            flexDirection: "row",
            height: 90,
            justifyContent: "space-between",
            backgroundColor: darkTheme ? "#0e0f0f" : "#eee",
          },
          tabBarShowLabel: false,
        })}
        initialRouteName="home"
      >
        {loggedInUser == null ? (
          <Tab.Screen
            options={{
              headerStyle: {
                backgroundColor: darkTheme ? "#18191A" : "white",
              },
              headerTitleStyle: {
                color: darkTheme ? "white" : "black",
              },
              headerTitle: "Welcome to Uber",
              tabBarIcon: (tabInfo) => {
                return (
                  <Icon
                    icon="user"
                    text="Account"
                    color={
                      tabInfo.focused ? "green" : darkTheme ? "white" : "black"
                    }
                  />
                );
              },
            }}
            name="LoginRegisterScreen"
            component={LoginRegisterScreen}
          />
        ) : (
          <>
            <Tab.Screen
              options={{
                headerShown: false,
                tabBarIcon: (tabInfo) => {
                  return (
                    <Icon
                      icon="home"
                      text="Home"
                      color={
                        tabInfo.focused
                          ? "green"
                          : darkTheme
                          ? "white"
                          : "black"
                      }
                    />
                  );
                },
              }}
              name="home"
              component={HomeStackScreen}
            />
            <Tab.Screen
              options={{
                headerShown: false,
                tabBarIcon: (tabInfo) => {
                  return (
                    <Icon
                      icon="search"
                      text="Browse"
                      color={
                        tabInfo.focused
                          ? "green"
                          : darkTheme
                          ? "white"
                          : "black"
                      }
                    />
                  );
                },
              }}
              name="Browse"
              component={BrowseScreen}
            />
            <Tab.Screen
              options={{
                headerStyle: {
                  backgroundColor: darkTheme ? "#18191A" : "white",
                },
                headerTitleStyle: {
                  color: darkTheme ? "white" : "black",
                },
                tabBarIcon: (tabInfo) => {
                  return (
                    <Icon
                      icon="shopping-bag"
                      text="Grocery"
                      color={
                        tabInfo.focused
                          ? "green"
                          : darkTheme
                          ? "white"
                          : "black"
                      }
                    />
                  );
                },
              }}
              name="Grocery"
              component={GroceryScreen}
            />
            <Tab.Screen
              options={{
                headerStyle: {
                  backgroundColor: darkTheme ? "#18191A" : "white",
                },
                headerTitleStyle: {
                  color: darkTheme ? "white" : "black",
                },
                tabBarIcon: (tabInfo) => {
                  return (
                    <Icon
                      icon="receipt"
                      text="Orders"
                      color={
                        tabInfo.focused
                          ? "green"
                          : darkTheme
                          ? "white"
                          : "black"
                      }
                    />
                  );
                },
              }}
              name="Orders"
              component={OrdersScreen}
            />
            <Tab.Screen
              options={{
                headerStyle: {
                  backgroundColor: darkTheme ? "#18191A" : "white",
                },
                headerTitleStyle: {
                  color: darkTheme ? "white" : "black",
                },
                headerTitle: loggedInUser
                  ? "Account Settings"
                  : "Welcome to Uber",
                tabBarIcon: (tabInfo) => {
                  return (
                    <Icon
                      icon="user"
                      text="Account"
                      color={
                        tabInfo.focused
                          ? "green"
                          : darkTheme
                          ? "white"
                          : "black"
                      }
                    />
                  );
                },
              }}
              name="Account"
              component={AccountScreen}
            />
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
