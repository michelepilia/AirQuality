import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, Slider } from "react-native";
import { TextField } from 'react-native-material-textfield';

class Settings extends Component{

  state = {
    token: '',
    username: 'test@pry.it',
    delay: global.delay,
  }

  username = "admin";
  tokenValid = "valid/expired";

  handleSimulationUrl = (text) => {
    global.urlSimulation= text;
  }
      
  handleArduinoUrl = (text) => {
    global.urlReal = text;  
  }

  changeDelayValue = (value) => {
    var delay = value*1000;
    global.delay=delay;
    this.setState({delay: delay});
    //alert(global.delay);
  }

  componentDidMount(){
    const { params } = this.props.navigation.state;

    const token = params ? params.token : null;
   //const delay = params ? params.delay : null;

    this.setState({token : token});
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
        <View style = {styles.mainView}>
          <Text style={{marginTop:35, marginLeft: 15}}>User Info</Text>
          <View style = {{flexDirection:"column", marginTop: 15, marginLeft: 15}}> 
              <Text style={{marginTop:5}}>User: {this.state.username}</Text>
              <Text style={{marginTop:5}}>First Name: Pry</Text>
              <Text style={{marginTop:5}}>Last Name: Punjabi</Text>
              <Text style={{marginTop:5}}>Gender: female</Text>
              <Text style={{marginTop:5}}>Birthday: 11/01/1963</Text>
              <Text style={{marginTop:5}}>Token status: {this.state.token}</Text>
          </View>
          <Text style={{marginTop:35, marginLeft: 15}}>Read data from: </Text>
          <View style = {{marginTop:5, marginLeft: 15, marginRight: 15}}>
          <TextField style = {styles.inputUrl}
                underlineColorAndroid = "transparent"
                autoCapitalize = "none"
                onChangeText = {this.handleSimulationUrl}
                formatText={this.formatText}
                placeholder = {global.urlSimulation}
                label="Simulation Server URL"/>
          <TextField style = {styles.inputUrl}
                underlineColorAndroid = "transparent"
                autoCapitalize = "none"
                onChangeText = {this.handleArduinoUrl}
                formatText={this.formatText}
                placeholder = {global.urlReal}
                label="Arduino Wi-Fi URL"/>
          </View>

          <View style = {{marginTop:20}}>
            <Text style ={{marginLeft:15}}>Read data every {this.state.delay/1000} seconds</Text>
            <Slider
              style={{width: 230, height: 40}}
              minimumValue={3}
              maximumValue={10}
              minimumTrackTintColor="rgb(255,0,0)"
              maximumTrackTintColor="rgb(255,0,0)"
              step={1}
              value = {5}
              onValueChange = {this.changeDelayValue}
              thumbTintColor = "rgb(255,10,10)"
            />

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
    height: 40,
    marginLeft: 15,
    marginRight:15,
    width:300
 }, 
 mainView: {
   backgroundColor: "rgba(255,5,5,0.05)",
   marginLeft: 20,
   marginRight: 20,
   marginTop:10
 },
});

export default Settings;