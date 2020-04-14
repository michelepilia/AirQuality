import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import MaterialRightIconTextbox from "../components/MaterialRightIconTextbox";
import MaterialStackedLabelTextbox from "../components/MaterialStackedLabelTextbox";

function Signup(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.airQuality1}>Air Quality</Text>
      <MaterialRightIconTextbox
        style={styles.materialRightIconTextbox1}
      ></MaterialRightIconTextbox>
      <MaterialStackedLabelTextbox
        style={styles.materialStackedLabelTextbox1}
      ></MaterialStackedLabelTextbox>
      <MaterialRightIconTextbox
        style={styles.materialRightIconTextbox2}
      ></MaterialRightIconTextbox>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Home")}
        style={styles.button1}
      >
        <Text style={styles.text}>Signup</Text>
      </TouchableOpacity>
      <MaterialStackedLabelTextbox
        style={styles.materialStackedLabelTextbox2}
      ></MaterialStackedLabelTextbox>
      <View style={styles.airQuality2Row}>
        <Text style={styles.airQuality2}>Air Quality</Text>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Login")}
          style={styles.homeButton1}
        >
          <Image
            source={require("../assets/images/home_logo.png")}
            resizeMode="contain"
            style={styles.homelogo}
          ></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  airQuality1: {
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
  materialRightIconTextbox1: {
    width: 317,
    height: 64,
    marginTop: 241,
    marginLeft: 29
  },
  materialStackedLabelTextbox1: {
    width: 317,
    height: 60,
    marginTop: -224,
    marginLeft: 29
  },
  materialRightIconTextbox2: {
    width: 317,
    height: 64,
    marginTop: 180,
    marginLeft: 29
  },
  button1: {
    width: 305,
    height: 60,
    backgroundColor: "rgba(255,0,0,1)",
    marginTop: 50,
    marginLeft: 35
  },
  text: {
    width: 305,
    height: 60,
    color: "rgba(255,255,255,1)",
    fontSize: 30,
    fontFamily: "roboto-regular",
    lineHeight: 60,
    letterSpacing: 0,
    textAlign: "center",
    marginTop: -1
  },
  materialStackedLabelTextbox2: {
    width: 317,
    height: 60,
    marginTop: -334,
    marginLeft: 29
  },
  airQuality2: {
    width: 91,
    height: 30,
    color: "rgba(255,0,0,1)",
    fontSize: 15,
    fontFamily: "roboto-regular",
    lineHeight: 30,
    letterSpacing: 0,
    marginTop: 8
  },
  homeButton1: {
    width: 27,
    height: 38,
    backgroundColor: "rgba(255,255,255,1)",
    marginLeft: 226
  },
  homelogo: {
    width: 27,
    height: 38,
    marginTop: 1
  },
  airQuality2Row: {
    height: 38,
    flexDirection: "row",
    marginTop: -333,
    marginLeft: 10,
    marginRight: 21
  }
});

export default Signup;
