import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";

function Home(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.airQuality}>Air Quality</Text>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("ViewMap")}
        style={styles.button2}>
        <Text style={styles.viewMap}>View Map</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => props.navigation.navigate("ReadData")}
        style={styles.button3}>
        <Text style={styles.readData}>Read Data</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => props.navigation.navigate("Login")}
        style={styles.logoutButton1}>
        <Image
          source={require("../assets/images/logout.png")}
          resizeMode="contain"
          style={styles.logoutLogo}
        ></Image>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  airQuality: {
    height: 73,
    color: "rgba(255,0,0,1)",
    fontSize: 40,
    fontFamily: "roboto-regular",
    lineHeight: 73,
    letterSpacing: 0,
    textAlign: "center",
    width: 375,
    alignSelf: "flex-end",
    marginTop: 71
  },
  button2: {
    width: 305,
    height: 93,
    backgroundColor: "rgba(255,0,0,1)",
    marginTop: 287,
    marginLeft: 35
  },
  viewMap: {
    width: 305,
    height: 93,
    color: "rgba(255,255,255,1)",
    fontSize: 30,
    fontFamily: "roboto-regular",
    lineHeight: 93,
    letterSpacing: 0,
    textAlign: "center"
  },
  button3: {
    width: 305,
    height: 93,
    backgroundColor: "rgba(255,0,0,1)",
    marginTop: -271,
    marginLeft: 35
  },
  readData: {
    width: 305,
    height: 93,
    color: "rgba(255,255,255,1)",
    fontSize: 30,
    fontFamily: "roboto-regular",
    lineHeight: 93,
    letterSpacing: 0,
    textAlign: "center",
    marginTop: -1
  },
  logoutButton1: {
    width: 27,
    height: 38,
    backgroundColor: "rgba(225,96,96,0)",
    marginTop: -314,
    marginLeft: 331
  },
  logoutLogo: {
    width: 27,
    height: 38,
    marginTop: 1
  }
});

export default Home;

