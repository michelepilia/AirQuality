import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

function Home(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}></Text>
      <Text style={styles.kingdomsAir}>Kingdom&#39;s Air</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.readData}>Read Data</Text>
      </TouchableOpacity>
      <View style={styles.button2Stack}>
        <TouchableOpacity style={styles.button2}></TouchableOpacity>
        <Text style={styles.viewMap}>View Map</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    color: "#121212",
    fontSize: 24,
    fontFamily: "roboto-regular",
    textAlign: "center",
    marginTop: 346,
    marginLeft: 45
  },
  kingdomsAir: {
    height: 73,
    color: "rgba(255,0,0,1)",
    fontSize: 40,
    fontFamily: "roboto-regular",
    lineHeight: 73,
    letterSpacing: 0,
    textAlign: "center",
    width: 375,
    alignSelf: "flex-end",
    marginTop: -275
  },
  button: {
    width: 305,
    height: 93,
    backgroundColor: "rgba(255,0,0,1)",
    marginTop: 109,
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
    textAlign: "center"
  },
  button2: {
    top: 1,
    left: 0,
    width: 305,
    height: 93,
    backgroundColor: "rgba(255,0,0,1)",
    position: "absolute"
  },
  viewMap: {
    top: 0,
    left: 0,
    width: 305,
    height: 93,
    color: "rgba(255,255,255,1)",
    position: "absolute",
    fontSize: 30,
    fontFamily: "roboto-regular",
    lineHeight: 93,
    letterSpacing: 0,
    textAlign: "center"
  },
  button2Stack: {
    width: 305,
    height: 94,
    marginTop: 84,
    marginLeft: 35
  }
});

export default Home;
