import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, Slider,ActivityIndicator } from "react-native";
import { TextField } from 'react-native-material-textfield';
import PasswordInputText from 'react-native-hide-show-password-input';
import { ScrollView } from "react-native-gesture-handler";

class Settings extends Component{

  state = {
    token: '',
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    birthDay: '',
    gender: '',
    delay: global.delay,
    isLoading:true,
  }

  confirmPassword = '';

  url = "https://polimi-dima-server.herokuapp.com/api";

  username = "admin";
  tokenValid = "valid/expired";

  handleArduinoUrl = (text) => {
    global.currentUrl = text;  
  }

  componentCleanUp(){
    console.log("Cleaning");
    //this.focusListener.remove();
  }

  changeDelayValue = (value) => {
    var delay = value*1000;
    global.delay=delay;
    this.setState({delay: delay});
    //alert(global.delay);
  }
  
  handlePassword = (text) => {
    this.setState({ password: text })
  }
  handleConfirmPassword = (text) => {
    this.confirmPassword = text;
  }

  logoutFunction(){
    return fetch(this.url+"/user/logout", {
      method: "post",
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.state.token
      },
    })
    .then((response) => {
      if (response.status == "200"){
        return this.props.navigation.navigate("Login");
      }
      else if (response.status == "400"){
        alert("Bad request to server");
      }
      else if (response.status == "401"){
        alert("Unauthorized");
      }
      else {
        return alert("Invalid response");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  storePassword(){
    console.log("token: " + this.state.token);
    console.log("confirm: " + this.confirmPassword + "Password: " + this.state.password);
    passwordMatch = ((this.state.password)==(this.confirmPassword));
    passwordLength = ((this.state.password).length >= 4);
    if(passwordMatch&&passwordLength){
      return fetch(this.url+"/user/me", {
        method: "put",
        headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.state.token
        },
        body: JSON.stringify({
          email: this.state.email,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          password: this.state.password,
          gender: this.state.gender,
          birthDay: this.state.birthDay.substring(0, 10)
        }),
      })
      .then((response) => {
        console.log(response);
        if (response.status == "200"){
          alert("Password Stored correctely!")
        }
        else {
          alert("Invalid response");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    } else {
      if (!passwordMatch) {alert("Password and Confirm Password must be equal");}
      if (!passwordLength) {alert("Password must be longer than 4 characters");}
    }
  }

  onFocusFunction = () => {
    const { params } = this.props.navigation.state;

    const token = params ? params.token : null;
   //const delay = params ? params.delay : null;

    this.setState({token : token});

    return fetch(this.url+"/user/me", {
      method: "get",
      headers:{
        Accept: 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    })
    .then((response) => response.json())
    .then((responseJson)=>{
      this.setState({
        birthDay: responseJson.birthDay,
        gender: responseJson.gender,
        email: responseJson.email,
        firstName: responseJson.firstName,
        lastName: responseJson.lastName,
        isLoading:false,
      });
      console.log("First Name: " + this.state.firstName);
      console.log("Last Name: " + this.state.lastName);
      console.log("Email: " + this.state.email);
      console.log("Gender: " + this.state.gender);
      console.log("Birthday: " + this.state.birthDay);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  componentDidMount(){
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.onFocusFunction();
    })
    
  }

  render(){

    if(this.state.isLoading){
      return(
          <View style={styles.ActivityIndicator}>
              <ActivityIndicator 
                size="large"
                color="red"                   
              />
          </View>
      )
  }

  else{

    return (
      <View style={styles.container}>
        <ScrollView>
        <View style={styles.headerRow}>
          <Text style={styles.airQualityHeader}>Air Quality</Text>

          <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate("ReadData",{token:this.state.token})
                      this.componentCleanUp();
                    }}
                    style={styles.homeButton}>
                    <Image
                    source={require("../assets/images/location3.png")}
                    resizeMode="contain"
                    style={styles.homelogo}
                    ></Image>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {this.props.navigation.navigate("Historical", {token: this.state.token})
            this.componentCleanUp();
          }}
            style={styles.locationButton}>
            <Image
              source={require("../assets/images/stats_logo.png")}
              resizeMode="contain"
              style={styles.locationLogo}
            ></Image>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => {this.logoutFunction()
              this.componentCleanUp();
            
            }}
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
              <Text style={{marginTop:5}}>User: {this.state.email}</Text>
              <Text style={{marginTop:5}}>First Name: {this.state.firstName}</Text>
              <Text style={{marginTop:5}}>Last Name: {this.state.lastName}</Text>
              <Text style={{marginTop:5}}>Gender: {this.state.gender}</Text>
              <Text style={{marginTop:5}}>Birthday: {this.state.birthDay}</Text>
              <Text style={{marginTop:5}}>Token status: {this.state.token}</Text>
          </View>

          <View style={styles.inputView}>
            <PasswordInputText
              value={this.state.password}
              onChangeText={this.handlePassword}/>
          </View>

          <View style={styles.inputView}>
            <PasswordInputText
              value={this.confirmPassword}
              label = "Confirm Password"
              onChangeText={this.handleConfirmPassword}/>
          </View>

          <TouchableOpacity
            onPress={() => this.storePassword()}
            style={styles.button1}>
            <Text style={styles.text}>Save New Password</Text>
          </TouchableOpacity>

          <Text style={{marginTop:35, marginLeft: 15}}>Read data from: </Text>
          <View style = {{marginTop:5, marginLeft: 15, marginRight: 15}}>
    
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
        </ScrollView>
      </View>
    );
  }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  ActivityIndicator:{
    marginLeft:'auto',
    marginRight:'auto',
    marginBottom:'auto',
    marginTop:'auto',

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
 inputView:{
   margin: 5,
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
   marginTop: -1,
 },

});

export default Settings;