import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

function ReadData(props) {
  return (
    <View style={styles.container}>
      <View style={styles.textStackStack}>
        <View style={styles.textStack}>
          <Text style={styles.text}>Read Data</Text>
          <Image
            source={require("../assets/images/home_logo.png")}
            resizeMode="contain"
            style={styles.image1}
          ></Image>
        </View>
        <Text style={styles.kingdomsAir}>Kingdom&#39;s Air</Text>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Home")}
          style={styles.button7}
        ></TouchableOpacity>
      </View>
      <View style={styles.rect}>
        <View style={styles.pm10AltissimoStack}>
          <Text style={styles.pm10Altissimo}>PM 10: Altissimo</Text>
          <TouchableOpacity style={styles.button8}></TouchableOpacity>
          <Text style={styles.storeData}>Store Data</Text>
        </View>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.pm107}>PM 10</Text>
        </TouchableOpacity>
        <View style={styles.button2Stack}>
          <TouchableOpacity style={styles.button2}></TouchableOpacity>
          <Text style={styles.co2}>CO2</Text>
        </View>
        <TouchableOpacity style={styles.button3}>
          <Text style={styles.pm104}>Var</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.button4Row}>
        <TouchableOpacity style={styles.button4}>
          <Text style={styles.pm103}>Var</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button5}>
          <Text style={styles.pm106}>Var</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button6}>
          <Text style={styles.pm105}>Var</Text>
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
    top: 37,
    height: 73,
    color: "rgba(255,0,0,1)",
    position: "absolute",
    right: 0,
    fontSize: 40,
    fontFamily: "roboto-regular",
    lineHeight: 73,
    letterSpacing: 0,
    textAlign: "center",
    width: 375
  },
  image1: {
    top: 0,
    left: 317,
    width: 27,
    height: 38,
    position: "absolute"
  },
  textStack: {
    top: 1,
    left: 0,
    width: 375,
    height: 110,
    position: "absolute"
  },
  kingdomsAir: {
    top: 8,
    left: 10,
    width: 91,
    height: 30,
    color: "rgba(255,0,0,1)",
    position: "absolute",
    fontSize: 15,
    fontFamily: "roboto-regular",
    lineHeight: 30,
    letterSpacing: 0
  },
  button7: {
    top: 0,
    left: 317,
    width: 27,
    height: 38,
    backgroundColor: "rgba(230, 230, 230,1)",
    position: "absolute",
    opacity: 0
  },
  textStackStack: {
    width: 375,
    height: 111,
    marginTop: 32
  },
  rect: {
    width: 313,
    height: 403,
    backgroundColor: "rgba(230, 230, 230,1)",
    marginTop: 43,
    marginLeft: 31
  },
  pm10Altissimo: {
    top: 0,
    left: 0,
    width: 313,
    height: 403,
    color: "rgba(255,0,0,1)",
    position: "absolute",
    fontSize: 30,
    fontFamily: "roboto-regular",
    lineHeight: 200,
    letterSpacing: 0,
    textAlign: "center"
  },
  button8: {
    top: 202,
    left: 44,
    width: 219,
    height: 66,
    backgroundColor: "rgba(255,0,0,1)",
    position: "absolute"
  },
  storeData: {
    top: 201,
    left: 44,
    width: 219,
    height: 66,
    color: "rgba(255,255,255,1)",
    position: "absolute",
    fontSize: 30,
    fontFamily: "roboto-regular",
    lineHeight: 66,
    letterSpacing: 0,
    textAlign: "center"
  },
  pm10AltissimoStack: {
    width: 313,
    height: 403
  },
  button: {
    width: 100,
    height: 40,
    backgroundColor: "rgba(230, 230, 230,1)",
    borderColor: "rgba(255,0,0,1)",
    borderWidth: 3
  },
  pm107: {
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
  co2: {
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
  buttonRow: {
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
  button5: {
    width: 100,
    height: 40,
    backgroundColor: "rgba(230, 230, 230,1)",
    marginLeft: 7
  },
  pm106: {
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
  button4Row: {
    height: 40,
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 31,
    marginRight: 31
  }
});

export default ReadData;
