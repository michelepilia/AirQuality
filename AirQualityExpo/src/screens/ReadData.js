import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
import * as Progress from 'react-native-progress';


class ReadData extends Component {

  state = {
    temperature: [10.0, 0.5, 20], //[value, minValue, maxValue]
    humidity: 0.0,
    pressure: 0.0,
    altitude: 0.0,
    tvocs: 0.0,
    eco2: 0.0,
    pm05: 0.0,
    pm1: 0.0,
    pm25: 0.0,
    pm4: 0.0,
    pm10: 0.0,
    latitude: 0.0,
    longitude: 0.0
  };

  temperature = {
    value: 0,
    min: 0,
    max: 10
  }


  _handleGaugeChange(){
    alert("Changed");
  }

  render(){
    return (
      <View style={styles.container}>

        <View style={styles.headerRow}>
          <Text style={styles.airQuality}>Air Quality</Text>
        
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Home")}
            style={styles.homeButton}>
            <Image
              source={require("../assets/images/home_logo.png")}
              resizeMode="contain"
              style={styles.homelogo}
            ></Image>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Login")}
            style={styles.logoutButton}
          >
            <Image
              source={require("../assets/images/logout.png")}
              resizeMode="contain"
              style={styles.logoutLogo}
            ></Image>
          </TouchableOpacity>

        </View>

        <Text style={styles.title}>Read Data</Text>

        <View style={styles.rect}>
          <View>
            <Text>Temperature</Text>
            
            <Progress.Bar progress={this.state.temperature[1]} width={200} />

            <Text>Value: {this.state.temperature}</Text>
          </View>

        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  linearGauge:{
    width:"700px",
    height:"30px"
  },
  rect: {
    display: "flex",
    flexDirection: "column",
    width: 313,
    height: 403,
    backgroundColor: "rgba(230, 230, 230,1)",
    marginTop: 50,
    marginLeft: 31
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
    marginTop: 51
  },
  airQuality: {
    width: 91,
    height: 30,
    color: "rgba(255,0,0,1)",
    fontSize: 15,
    fontFamily: "roboto-regular",
    lineHeight: 30,
    letterSpacing: 0,
    marginTop: 8
  },
  homeButton: {
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
  logoutButton: {
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
  headerRow: {
    height: 38,
    flexDirection: "row",
    marginTop: 44,
    marginLeft: 10,
    marginRight: 17
  }
});

export default ReadData;

