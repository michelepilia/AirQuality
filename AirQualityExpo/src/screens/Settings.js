import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { TextField } from 'react-native-material-textfield';

class Settings extends Component{

  state = {
    token: '',
    simulationUrl: "text",
    arduinoUrl: "text"
  }

  username = "Bru";
  tokenValid = "undefined";

  handleSimulationUrl = (text) => {
    this.setState({ simulationUrl: text })
  }
  handleArduinoUrl = (text) => {
    this.setState({ arduinoUrl: text })
  }

  componentDidMount(){
    const { params } = this.props.navigation.state;
    const token1 = params ? params.token : null;
    this.setState({token:token1});
  }

  render(){
    return (
      <View style={styles.container}>

        <View style={styles.headerRow}>
          <Text style={styles.airQualityHeader}>Air Quality</Text>

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

        <Text style={styles.title}>Settings</Text>
        
        <View> 
            <Text>Utente: {this.username}</Text>
            <Text>Token: {this.tokenValid}</Text>
        </View>

        <View>
        <TextField style = {styles.inputUrl}
               underlineColorAndroid = "transparent"
               autoCapitalize = "none"
               onChangeText = {this.handleSimulationUrl}
               formatText={this.formatText}
               label="Simulation Server URL"/>
        <TextField style = {styles.inputUrl}
               underlineColorAndroid = "transparent"
               autoCapitalize = "none"
               onChangeText = {this.handleArduinoUrl}
               formatText={this.formatText}
               label="Arduino Wi-Fi URL"/>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  airQualityHeader: {
    width: 91,
    height: 30,
    color: "rgba(255,0,0,1)",
    fontSize: 15,
    fontFamily: "roboto-regular",
    lineHeight: 30,
    letterSpacing: 0,
    marginTop: 8
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
    marginTop: 25
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
  inputUrl: {
    marginTop: -8,
    height: 40
 }
});

export default Settings;