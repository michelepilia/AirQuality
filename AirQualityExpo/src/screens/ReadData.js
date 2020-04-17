import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
import * as Progress from 'react-native-progress';

const micron = "\u00b5";

class ReadData extends Component {

  state = {
    temperature: [10.0, 0.5, 20], //[value, minValue, maxValue]
    humidity: [10.0, 0.5, 20],
    pressure: [10.0, 0.5, 20],
    altitude: [150, 0, 680], //Deciso di lasciare la media in mezzo
    tvocs: [10.0, 0.5, 20],
    eco2: [10.0, 0.5, 20],
    pm05: [10.0, 0.5, 20],
    pm1: [10.0, 0.5, 20],
    pm25: [10.0, 0.5, 20],
    pm4: [10.0, 0.5, 20],
    pm10: [10.0, 0.5, 20],
    latitude: 45.47,
    longitude: 9.22
  };
  //	x′ = (x − xmin) / (xmax − xmin)


  
  normalizeOutput(value, xmin, xmax){
    return ((value-xmin)/(xmax-xmin));
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

          <View style={styles.parameterTxt}>
            <Text>Coordinates: {this.state.latitude}°N, {this.state.longitude}°E</Text>
          </View>

          <View style={styles.parameterBar}>
            <Text>Altitude: {this.state.altitude[0]} mt.</Text>
            <Progress.Bar progress={this.normalizeOutput(this.state.altitude[0], 
                                    this.state.altitude[1], this.state.altitude[2])} 
                                    width={200} />
          </View>

          <View style={styles.parameterBar}>
            <Text>Temperature: {this.state.temperature[0]}°</Text>
            <Progress.Bar progress={this.normalizeOutput(this.state.temperature[0], 
                                    this.state.temperature[1], this.state.temperature[2])} 
                                    width={200} />
          </View>

          <View style={styles.parameterBar}>
            <Text>Humidity: {this.state.humidity[0]}%</Text>
            <Progress.Bar progress={this.normalizeOutput(this.state.humidity[0], 
                                    this.state.humidity[1], this.state.humidity[2])} 
                                    width={200} />
          </View>

          <View style={styles.parameterBar}>
            <Text>Pressure: {this.state.pressure[0]} Pa</Text>
            <Progress.Bar progress={this.normalizeOutput(this.state.pressure[0], 
                                    this.state.pressure[1], this.state.pressure[2])} 
                                    width={200} />
          </View>

          <View style={styles.parameterBar}>
            <Text>TVOCs: {this.state.tvocs[0]} ppb</Text>
            <Progress.Bar progress={this.normalizeOutput(this.state.tvocs[0], 
                                    this.state.tvocs[1], this.state.tvocs[2])} 
                                    width={200} />
          </View>

          <View style={styles.parameterBar}>
            <Text>CO<Text style={styles.pedex}>2</Text>: {this.state.eco2[0]} ppm</Text>
            <Progress.Bar progress={this.normalizeOutput(this.state.eco2[0], 
                                    this.state.eco2[1], this.state.eco2[2])} 
                                    width={200} />
          </View>

          <View style={styles.parameterBar}>
            <Text>PM<Text style={styles.pedex}>0.5</Text>: {this.state.pm05[0]} {micron}m</Text>
            <Progress.Bar progress={this.normalizeOutput(this.state.pm05[0], 
                                    this.state.pm05[1], this.state.pm05[2])} 
                                    width={200} />
            
          </View>

          <View style={styles.parameterBar}>
            <Text>PM<Text style={styles.pedex}>1</Text>: {this.state.pm1[0]} {micron}m</Text>
            <Progress.Bar progress={this.normalizeOutput(this.state.pm1[0], 
                                    this.state.pm1[1], this.state.pm1[2])} 
                                    width={200} />
          </View>

          <View style={styles.parameterBar}>
            <Text>PM<Text style={styles.pedex}>2.5</Text>: {this.state.pm25[0]} {micron}m</Text>
            <Progress.Bar progress={this.normalizeOutput(this.state.pm25[0], 
                                    this.state.pm25[1], this.state.pm25[2])} 
                                    width={200} />
          </View>

          <View style={styles.parameterBar}>
            <Text>PM<Text style={styles.pedex}>4</Text>: {this.state.pm4[0]} {micron}m</Text>
            <Progress.Bar progress={this.normalizeOutput(this.state.pm4[0], 
                                    this.state.pm4[1], this.state.pm4[2])} 
                                    width={200} />
          </View>

          <View style={styles.parameterBar}>
            <Text>PM<Text style={styles.pedex}>10</Text>: {this.state.pm10[0]} {micron}m</Text>
            <Progress.Bar progress={this.normalizeOutput(this.state.pm10[0], 
                                    this.state.pm10[1], this.state.pm10[2])} 
                                    width={200} />
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
    alignItems: "center",
    width: 'auto',
    height: 'auto',
    backgroundColor: "rgba(230, 230, 230,1)",
    marginTop: 50,
    marginLeft: 30,
    marginRight: 30,
    padding: 20
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
    marginTop: 20
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
  },
  parameterBar:{
    marginTop: 5,
    marginBottom: 5
  },
  parameterTxt:{
    marginTop: 5,
    marginBottom: 5
  },
  pedex:{
    fontSize: 10,
  }
});

export default ReadData;

