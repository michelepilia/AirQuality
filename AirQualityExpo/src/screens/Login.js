import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import MaterialRightIconTextbox from "../components/MaterialRightIconTextbox";
import MaterialStackedLabelTextbox from "../components/MaterialStackedLabelTextbox";

function Login(props) {
  return (
    <View style={styles.container}>
      <View style={styles.materialRightIconTextboxStack}>
        <MaterialRightIconTextbox
          style={styles.materialRightIconTextbox}
        ></MaterialRightIconTextbox>
        <MaterialRightIconTextbox
          style={styles.materialRightIconTextbox1}
        ></MaterialRightIconTextbox>
      </View>
      <View style={styles.materialStackedLabelTextboxStack}>
        <MaterialStackedLabelTextbox
          style={styles.materialStackedLabelTextbox}
        ></MaterialStackedLabelTextbox>
        <MaterialStackedLabelTextbox
          style={styles.materialStackedLabelTextbox1}
        ></MaterialStackedLabelTextbox>
      </View>
      <Text onPress={() => props.navigation.navigate("Signup")} style={styles.newUserSignUp}>New User? Sign up</Text>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Home")}
        style={styles.button1}
      >
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.airQuality1}>Air Quality</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  materialRightIconTextbox: {
    top: 0,
    left: 0,
    width: 317,
    height: 64,
    position: "absolute"
  },
  materialRightIconTextbox1: {
    top: 0,
    left: 0,
    width: 317,
    height: 64,
    position: "absolute"
  },
  materialRightIconTextboxStack: {
    width: 317,
    height: 64,
    marginTop: 319,
    marginLeft: 29
  },
  materialStackedLabelTextbox: {
    top: 0,
    left: 0,
    width: 317,
    height: 60,
    position: "absolute"
  },
  materialStackedLabelTextbox1: {
    top: 0,
    left: 0,
    width: 317,
    height: 60,
    position: "absolute"
  },
  materialStackedLabelTextboxStack: {
    width: 317,
    height: 60,
    marginTop: -157,
    marginLeft: 29
  },
  newUserSignUp: {
    width: 132,
    height: 28,
    color: "rgba(255,0,0,1)",
    fontFamily: "roboto-regular",
    lineHeight: 28,
    textAlign: "center",
    marginTop: 118,
    marginLeft: 121,
    textDecorationLine: 'underline'
  },
  button1: {
    width: 305,
    height: 60,
    backgroundColor: "rgba(255,0,0,1)",
    marginTop: 147,
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
    marginTop: -568
  }
});

export default Login;