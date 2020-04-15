import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import MaterialRightIconTextbox from "../components/MaterialRightIconTextbox";
import MaterialStackedLabelTextbox from "../components/MaterialStackedLabelTextbox";
import { TextField } from 'react-native-material-textfield';
import PasswordInputText from 'react-native-hide-show-password-input';

class Signup extends Component {

  state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
  };

  handleUsername = (text) => {
      this.setState({ username: text })
   };

   handleEmail = (text) => {
      this.setState({ email: text })
   }
   
  formatText = (text) => {
    return text.replace(/[^+\d]/g, '');
  };

  render(){
    return (
      <View style={styles.container}>

        <View style={styles.airQuality2Row}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Login")}
            style={styles.homeButton1}>
            <Image
              source={require("../assets/images/home_logo.png")}
              resizeMode="contain"
              style={styles.homelogo}></Image>
          </TouchableOpacity>
        </View>
        <Text style={styles.airQuality1}>Air Quality</Text>

        <View style={{margin: 20}}>
          <TextField style = {styles.inputUser}
               underlineColorAndroid = "transparent"
               autoCapitalize = "none"
               onChangeText = {this.handleEmail}
               formatText={this.formatText}
               label="Email"/>
        </View>

        <View style={{margin: 20}}>
          <TextField style = {styles.inputUser}
               underlineColorAndroid = "transparent"
               autoCapitalize = "none"
               onChangeText = {this.handleUsername}
               formatText={this.formatText}
               label="Username"/>
        </View>

        <View style={{margin: 20}}>
          <PasswordInputText
            value={this.state.password}
            onChangeText={ (password) => this.setState({ password }) }/>
        </View>

        <View style={{margin: 20}}>
          <PasswordInputText
            value={this.state.confirmPassword}
            label = "Confirm Password"
            onChangeText={ (confirmPassword) => this.setState({ confirmPassword }) }/>
        </View>


        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Home")}
          style={styles.button1}>
          <Text style={styles.text}>Signup</Text>
        </TouchableOpacity>

      </View>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    marginTop: 31
  },
  materialRightIconTextbox1: {
    width: 317,
    height: 64,
    marginTop: 241,
    marginLeft: 29
  },
  materialStackedLabelTextbox1: {
    width: 317,
    height: 60,
    marginTop: -224,
    marginLeft: 29
  },
  materialRightIconTextbox2: {
    width: 317,
    height: 64,
    marginTop: 180,
    marginLeft: 29
  },
  button1: {
    width: 305,
    height: 60,
    backgroundColor: "rgba(255,0,0,1)",
    marginTop: 50,
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
  materialStackedLabelTextbox2: {
    width: 317,
    height: 60,
    marginTop: -334,
    marginLeft: 29
  },
  airQuality2: {
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
    marginLeft: 310, 
    marginTop: 10
  },
  homelogo: {
    width: 27,
    height: 38,
    marginTop: 1
  },
  airQuality2Row: {
    height: 38,
    flexDirection: "row",
    marginTop: 30,
    marginLeft: 10,
    marginRight: 21
  }
});

export default Signup;
