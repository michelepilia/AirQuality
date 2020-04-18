import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";

class Home extends Component{

  state = {
    token: '',
  }

  render(){
    const { params } = this.props.navigation.state;
    const token = params ? params.token : null;
    this.state.token = token;
    return (
      <View style={styles.container}>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Login")}
          style={styles.logoutButton1}>
          <Image
            source={require("../assets/images/logout.png")}
            resizeMode="contain"
            style={styles.logoutLogo}
          ></Image>
        </TouchableOpacity>

        <Text style={styles.airQuality}>Air Quality</Text>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("ReadData")}
          style={styles.readDataBtn}>
          <Text style={styles.readDataLabel}>Read Data</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("ViewMap")}
          style={styles.viewMapBtn}>
          <Text style={styles.viewMapLabel}>View Map</Text>
        </TouchableOpacity>

      </View>
    );
  }
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
    marginTop: 51
  },
  viewMapBtn: {
    width: 305,
    height: 93,
    backgroundColor: "rgba(255,0,0,1)",
    marginTop: 50,
    marginLeft: 35
  },
  viewMapLabel: {
    width: 305,
    height: 93,
    color: "rgba(255,255,255,1)",
    fontSize: 30,
    fontFamily: "roboto-regular",
    lineHeight: 93,
    letterSpacing: 0,
    textAlign: "center"
  },
  readDataBtn: {
    width: 305,
    height: 93,
    backgroundColor: "rgba(255,0,0,1)",
    marginTop: 130,
    marginLeft: 35
  },
  readDataLabel: {
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
    marginTop: 44,
    marginLeft: 331
  },
  logoutLogo: {
    width: 27,
    height: 38,
    marginTop: 1
  }
});

export default Home;

