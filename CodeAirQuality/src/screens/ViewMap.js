import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

function ViewMap(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>View Map</Text>
      <View style={styles.kingdomsAir1Row}>
        <Text style={styles.kingdomsAir1}>Kingdom&#39;s Air</Text>
        <View style={styles.imageStack}>
          <Image
            source={require("../assets/images/home_logo.png")}
            resizeMode="contain"
            style={styles.image}
          ></Image>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Home")}
            style={styles.button}
          ></TouchableOpacity>
        </View>
      </View>
      <Image
        source={require("../assets/images/maps_Milano.jpeg")}
        resizeMode="contain"
        style={styles.image2}
      ></Image>
      <View style={styles.button1Row}>
        <TouchableOpacity style={styles.button1}>
          <Text style={styles.pm1}>PM 10</Text>
        </TouchableOpacity>
        <View style={styles.button2Stack}>
          <TouchableOpacity style={styles.button2}></TouchableOpacity>
          <Text style={styles.co1}>CO2</Text>
        </View>
        <TouchableOpacity style={styles.button3}>
          <Text style={styles.pm3}>Var</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.button4Row}>
        <TouchableOpacity style={styles.button4}>
          <Text style={styles.pm2}>Var</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button5}>
          <Text style={styles.pm5}>Var</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button6}>
          <Text style={styles.pm4}>Var</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
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
  kingdomsAir1: {
    width: 91,
    height: 30,
    color: "rgba(255,0,0,1)",
    fontSize: 15,
    fontFamily: "roboto-regular",
    lineHeight: 30,
    letterSpacing: 0,
    marginTop: 7
  },
  image: {
    top: 0,
    left: 0,
    width: 27,
    height: 38,
    position: "absolute"
  },
  button: {
    top: 0,
    left: 1,
    width: 27,
    height: 38,
    backgroundColor: "rgba(230, 230, 230,1)",
    position: "absolute",
    opacity: 0
  },
  imageStack: {
    width: 28,
    height: 38,
    marginLeft: 216
  },
  kingdomsAir1Row: {
    height: 38,
    flexDirection: "row",
    marginTop: -111,
    marginLeft: 10,
    marginRight: 30
  },
  image2: {
    width: 313,
    height: 403,
    marginTop: 115,
    marginLeft: 32
  },
  button1: {
    width: 100,
    height: 40,
    backgroundColor: "rgba(230, 230, 230,1)",
    borderColor: "rgba(255,0,0,1)",
    borderWidth: 3
  },
  pm1: {
    width: 100,
    height: 40,
    color: "rgba(255,0,0,1)",
    fontSize: 15,
    fontFamily: "roboto-regular",
    lineHeight: 40,
    letterSpacing: 0,
    textAlign: "center"
  },
  button2: {
    top: 0,
    left: 0,
    width: 100,
    height: 40,
    backgroundColor: "rgba(230, 230, 230,1)",
    position: "absolute"
  },
  co1: {
    top: 0,
    left: 1,
    width: 100,
    height: 40,
    color: "rgba(255,0,0,1)",
    position: "absolute",
    fontSize: 15,
    fontFamily: "roboto-regular",
    lineHeight: 40,
    letterSpacing: 0,
    textAlign: "center"
  },
  button2Stack: {
    width: 101,
    height: 40,
    marginLeft: 6
  },
  button3: {
    width: 100,
    height: 40,
    backgroundColor: "rgba(230, 230, 230,1)",
    marginLeft: 6
  },
  pm3: {
    width: 100,
    height: 40,
    color: "rgba(255,0,0,1)",
    fontSize: 15,
    fontFamily: "roboto-regular",
    lineHeight: 40,
    letterSpacing: 0,
    textAlign: "center"
  },
  button1Row: {
    height: 40,
    flexDirection: "row",
    marginTop: 38,
    marginLeft: 31,
    marginRight: 31
  },
  button4: {
    width: 100,
    height: 40,
    backgroundColor: "rgba(230, 230, 230,1)"
  },
  pm2: {
    width: 100,
    height: 40,
    color: "rgba(255,0,0,1)",
    fontSize: 15,
    fontFamily: "roboto-regular",
    lineHeight: 40,
    letterSpacing: 0,
    textAlign: "center"
  },
  button5: {
    width: 100,
    height: 40,
    backgroundColor: "rgba(230, 230, 230,1)",
    marginLeft: 7
  },
  pm5: {
    width: 100,
    height: 40,
    color: "rgba(255,0,0,1)",
    fontSize: 15,
    fontFamily: "roboto-regular",
    lineHeight: 40,
    letterSpacing: 0,
    textAlign: "center"
  },
  button6: {
    width: 100,
    height: 40,
    backgroundColor: "rgba(230, 230, 230,1)",
    marginLeft: 6
  },
  pm4: {
    width: 100,
    height: 40,
    color: "rgba(255,0,0,1)",
    fontSize: 15,
    fontFamily: "roboto-regular",
    lineHeight: 40,
    letterSpacing: 0,
    textAlign: "center"
  },
  button4Row: {
    height: 40,
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 31,
    marginRight: 31
  }
});

export default ViewMap;
