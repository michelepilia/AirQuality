import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

function ViewMap(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>View Map</Text>
      <Image
        source={require("../assets/images/maps_Milano.jpeg")}
        resizeMode="contain"
        style={styles.mapImg}
      ></Image>
      <View style={styles.button3Row}>
        <TouchableOpacity style={styles.button3}>
          <Text style={styles.pm104}>Var</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2}>
          <Text style={styles.pm105}>Var</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button1}>
          <Text style={styles.pm106}>Var</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.button6Row}>
        <TouchableOpacity style={styles.button6}>
          <Text style={styles.pm101}>PM 10</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button5}>
          <Text style={styles.co2}>CO2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button4}>
          <Text style={styles.pm103}>Var</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.airQuality1Row}>
        <Text style={styles.airQuality1}>Air Quality</Text>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Home")}
          style={styles.homeButton1}
        >
          <Image
            source={require("../assets/images/home_logo.png")}
            resizeMode="contain"
            style={styles.homelogo}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Login")}
          style={styles.logoutButton1}
        >
          <Image
            source={require("../assets/images/logout.png")}
            resizeMode="contain"
            style={styles.logoutLogo}
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
  title: {
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
  mapImg: {
    width: 313,
    height: 403,
    marginTop: 42,
    marginLeft: 32
  },
  button3: {
    width: 100,
    height: 40,
    backgroundColor: "rgba(230, 230, 230,1)"
  },
  pm104: {
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
    width: 100,
    height: 40,
    backgroundColor: "rgba(230, 230, 230,1)",
    marginLeft: 7
  },
  pm105: {
    width: 100,
    height: 40,
    color: "rgba(255,0,0,1)",
    fontSize: 15,
    fontFamily: "roboto-regular",
    lineHeight: 40,
    letterSpacing: 0,
    textAlign: "center"
  },
  button1: {
    width: 100,
    height: 40,
    backgroundColor: "rgba(230, 230, 230,1)",
    marginLeft: 6
  },
  pm106: {
    height: 40,
    color: "rgba(255,0,0,1)",
    fontSize: 15,
    fontFamily: "roboto-regular",
    lineHeight: 40,
    letterSpacing: 0,
    textAlign: "center"
  },
  button3Row: {
    height: 40,
    flexDirection: "row",
    marginTop: 88,
    marginLeft: 31,
    marginRight: 31
  },
  button6: {
    width: 100,
    height: 40,
    backgroundColor: "rgba(230, 230, 230,1)",
    borderColor: "rgba(255,0,0,1)",
    borderWidth: 3
  },
  pm101: {
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
    marginLeft: 6
  },
  co2: {
    width: 100,
    height: 40,
    color: "rgba(255,0,0,1)",
    fontSize: 15,
    fontFamily: "roboto-regular",
    lineHeight: 40,
    letterSpacing: 0,
    textAlign: "center"
  },
  button4: {
    width: 100,
    height: 40,
    backgroundColor: "rgba(230, 230, 230,1)",
    marginLeft: 7
  },
  pm103: {
    width: 100,
    height: 40,
    color: "rgba(255,0,0,1)",
    fontSize: 15,
    fontFamily: "roboto-regular",
    lineHeight: 40,
    letterSpacing: 0,
    textAlign: "center"
  },
  button6Row: {
    height: 40,
    flexDirection: "row",
    marginTop: -90,
    marginLeft: 31,
    marginRight: 31
  },
  airQuality1: {
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
    marginLeft: 193
  },
  homelogo: {
    width: 27,
    height: 38,
    marginTop: 1
  },
  logoutButton1: {
    width: 27,
    height: 38,
    backgroundColor: "rgba(225,96,96,0)",
    marginLeft: 10
  },
  logoutLogo: {
    width: 27,
    height: 38,
    marginTop: 1
  },
  airQuality1Row: {
    height: 38,
    flexDirection: "row",
    marginTop: -635,
    marginLeft: 10,
    marginRight: 17
  }
});

export default ViewMap;

