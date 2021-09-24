import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import OrderItem from "./OrderItem";
import firebase from "../../firebase";
import { NavigationContainer } from "@react-navigation/native";
import LottieView from "lottie-react-native";

export default function ViewCart({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { items, restaurantName } = useSelector(
    (state) => state.cartReducer.selectedItems
  );
  const darkTheme = useSelector((state) => state.themeReducer.isDark);
  const total = items
    .map((item) => Number(item.price.replace("$", "")))
    .reduce((prev, curr) => prev + curr, 0);

  const totalUSD = total.toLocaleString("en", {
    style: "currency",
    currency: "USD",
  });

  const addOrderToFirebase = () => {
    setLoading(true);
    const db = firebase.firestore();
    db.collection("orders")
      .add({
        items: items,
        restaurantName: restaurantName,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setTimeout(() => {
          setLoading(false);
          navigation.navigate("OrderCompleted");
        }, 1500);
      });
  };

  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "rgba(0,0,0,0.7)",
    },
    modalCheckoutContainer: {
      backgroundColor: darkTheme ? "#0e0f0f" : "white",
      padding: 16,
      height: 500,
      borderWidth: 1,
    },
    restaurantName: {
      textAlign: "center",
      fontWeight: "600",
      fontSize: 18,
      marginBottom: 10,
      color: darkTheme ? "white" : "black",
    },
    subtotalContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 15,
      color: darkTheme ? "white" : "black",
    },
    subtotalText: {
      textAlign: "left",
      fontWeight: "600",
      fontSize: 15,
      marginBottom: 10,
      color: darkTheme ? "white" : "black",
    },
  });

  const checkoutModalContent = () => {
    return (
      <>
        <View style={styles.modalContainer}>
          <View style={styles.modalCheckoutContainer}>
            <Text style={styles.restaurantName}>{restaurantName}</Text>
            {items.map((item, index) => (
              <OrderItem key={index} item={item} />
            ))}
            <View style={styles.subtotalContainer}>
              <Text style={styles.subtotalText}>Subtotal</Text>
              <Text style={{ color: darkTheme ? "white" : "black" }}>
                {totalUSD}
              </Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableOpacity
                style={{
                  marginTop: 20,
                  backgroundColor: darkTheme ? "#eee" : "black",
                  alignItems: "center",
                  padding: 13,
                  borderRadius: 30,
                  width: 300,
                  position: "relative",
                }}
                onPress={() => {
                  addOrderToFirebase();
                  setModalVisible(false);
                }}
              >
                <Text
                  style={{ color: darkTheme ? "black" : "white", fontSize: 20 }}
                >
                  Checkout
                </Text>
                <Text
                  style={{
                    position: "absolute",
                    right: 20,
                    color: darkTheme ? "black" : "white",
                    fontSize: 15,
                    top: 16,
                  }}
                >
                  {total ? totalUSD : ""}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    );
  };
  return (
    <>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible}
      >
        {checkoutModalContent()}
      </Modal>
      {total ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            position: "absolute",
            bottom: 160,
            zIndex: 999,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <TouchableOpacity
              style={{
                marginTop: 20,
                backgroundColor: "black",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "flex-end",
                padding: 15,
                padding: 13,
                borderRadius: 30,
                width: 300,
                position: "relative",
                backgroundColor: darkTheme ? "#eee" : "black",
                bottom: 140,
              }}
              onPress={() => setModalVisible(true)}
            >
              <Text
                style={{
                  color: darkTheme ? "black" : "white",
                  fontSize: 20,
                  marginRight: 20,
                  fontWeight: "bold",
                }}
              >
                View Cart
              </Text>
              <Text
                style={{ color: darkTheme ? "black" : "white", fontSize: 20 }}
              >
                {totalUSD}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <></>
      )}
      {loading ? (
        <View
          style={{
            backgroundColor: "black",
            position: "absolute",
            opacity: 0.6,
            possition: "absolute",
            justifyContent: "center",
            alignSelf: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <LottieView
            style={{
              height: 350,
              position: "absolute",
              top: 100,
              right: 15,
            }}
            source={require("../../assets/animations/scanner.json")}
            autoPlay
            speed={3}
          />
        </View>
      ) : (
        <></>
      )}
    </>
  );
}
