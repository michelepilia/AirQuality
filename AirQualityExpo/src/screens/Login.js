import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import MaterialRightIconTextbox from "../components/MaterialRightIconTextbox";
import MaterialStackedLabelTextbox from "../components/MaterialStackedLabelTextbox";
import PasswordInputText from 'react-native-hide-show-password-input';
import { TextField } from 'react-native-material-textfield';

class Login extends Component{

  state = {
      username: '',
      password: ''
  };

  handleUsername = (text) => {
      this.setState({ username: text })
   }
  formatText = (text) => {
    return text.replace(/[^+\d]/g, '');
  };


  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.airQuality1}>Air Quality</Text>
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

        <Text onPress={() => this.props.navigation.navigate("Signup")} style={styles.newUserSignUp}>New User? Sign up</Text>
        
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Home")}
          style={styles.button1}>

          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    top: 100,
    flex: 1
  },
  materialRightIconTextbox: {
    top: 0,
    left: 0,
    width: 317,
    height: 64,
    position: "absolute"
  },
  materialRightIconTextbox1: {
    top: 0,
    left: 0,
    width: 317,
    height: 64,
    position: "absolute"
  },
  materialRightIconTextboxStack: {
    width: 317,
    height: 64,
    marginTop: 319,
    marginLeft: 29
  },
  materialStackedLabelTextbox: {
    top: 0,
    left: 0,
    width: 317,
    height: 60,
    position: "absolute"
  },
  materialStackedLabelTextbox1: {
    top: 0,
    left: 0,
    width: 317,
    height: 60,
    position: "absolute"
  },
  materialStackedLabelTextboxStack: {
    width: 317,
    height: 60,
    marginTop: -157,
    marginLeft: 29
  },
  newUserSignUp: {
    width: 132,
    height: 28,
    color: "rgba(255,0,0,1)",
    fontFamily: "roboto-regular",
    lineHeight: 28,
    textAlign: "center",
    marginTop: 8,
    marginLeft: 121,
    textDecorationLine: 'underline'
  },
  button1: {
    width: 305,
    height: 60,
    backgroundColor: "rgba(255,0,0,1)",
    marginTop: 47,
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
    marginTop: 0
  },
  containerInput: {
    backgroundColor: "transparent",
    borderColor: "#D9D5DC",
    borderBottomWidth: 1
  },
  labelInput: {
    color: "rgba(255,0,0,1)",
    opacity: 0.6,
    paddingTop: 16,
    fontSize: 12,
    fontFamily: "roboto-regular",
    textAlign: "left"
  },
  inputStyle: {
    flex: 1,
    color: "#000",
    alignSelf: "stretch",
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 16,
    fontFamily: "roboto-regular",
    lineHeight: 16
  },
  inputUser: {
      marginTop: -8,
      height: 40
   }
});

export default Login;