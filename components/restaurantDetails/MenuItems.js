import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { Divider } from "react-native-elements/dist/divider/Divider";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const styles = StyleSheet.create({
  menuItemStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
});

export default function MenuItems({
  restaurantName,
  food,
  hideCheckbox,
  marginLeft,
}) {
  const dispatch = useDispatch();
  const selectItem = (item, checkboxValue) =>
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        ...item,
        restaurantName: restaurantName,
        checkboxValue: checkboxValue,
      },
    });

  const darkTheme = useSelector((state) => state.themeReducer.isDark);

  const cartItems = useSelector(
    (state) => state.cartReducer.selectedItems.items
  );

  const isFoodInCart = (food, cartItems) =>
    Boolean(cartItems.find((item) => item.title == food.title));

  return (
    <ScrollView
      style={{ backgroundColor: darkTheme ? "#0e0f0f" : "#eee" }}
      showsVerticalScrollIndicator={false}
    >
      {food.map((food, index) => (
        <View
          style={darkTheme ? { backgroundColor: "#0e0f0f" } : ""}
          key={index}
        >
          <View style={styles.menuItemStyle}>
            {hideCheckbox ? (
              <></>
            ) : (
              <BouncyCheckbox
                iconStyle={{
                  borderColor: "lightgrey",
                  borderRadius: 3,
                }}
                fillColor="green"
                onPress={(checkboxValue) => selectItem(food, checkboxValue)}
                isChecked={isFoodInCart(food, cartItems)}
              />
            )}

            <FoodInfo food={food} />
            <FoodImage food={food} marginLeft={marginLeft ? marginLeft : 0} />
          </View>
          <Divider
            width={0.5}
            orientation="vertical"
            style={{ marginHorizontal: 20 }}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const FoodInfo = (props) => {
  const darkTheme = useSelector((state) => state.themeReducer.isDark);
  return (
    <View style={{ width: 240, justifyContent: "space-evenly" }}>
      <Text
        style={{
          fontSize: 19,
          fontWeight: "600",
          color: darkTheme ? "white" : "black",
        }}
      >
        {props.food.title}
      </Text>
      <Text style={{ color: darkTheme ? "white" : "black" }}>
        {props.food.description}
      </Text>
      <Text style={{ color: darkTheme ? "white" : "black", fontWeight: "800" }}>
        {props.food.price}
      </Text>
    </View>
  );
};

const FoodImage = ({ marginLeft, ...props }) => (
  <Image
    source={{ uri: props.food.image }}
    style={{ width: 100, height: 100, borderRadius: 8, marginLeft: marginLeft }}
  />
);
