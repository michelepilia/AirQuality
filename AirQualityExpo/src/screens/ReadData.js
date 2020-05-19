import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image, ScrollView } from "react-native";
import * as Progress from 'react-native-progress';
import ToggleSwitch from 'toggle-switch-react-native'
import * as Permissions from 'expo-permissions';
import DataBars from "../components/DataBars";

const micron = "\u00b5"

class ReadData extends Component {

  constructor(props){
    super(props);
    this.state = {
      data : {
        temperature: 10.0,
        humidity:10.0,
        pressure: 10.0,
        altitude: 150,
        tvocs: 10.0,
        eco2: 3750,
        pm05: 0,
        pm1: 0,
        pm25: 0,
        pm4: 0,
        pm10: 0,
        lat: 45.47,
        lng:9.22,
      },

      latitude: 45.47,
      longitude: 9.22,
      isOnStore: false,
      isOnSimulation: true,
      token: '',
      isOnStore: false,
      errorMessage: '',
    }

    this.normalizeOutput.bind(this);
    this.readDataFunction.bind(this);
    this.cutCoordString.bind(this);
    this.saveDataFunction.bind(this);
    this.arduinoDataParser.bind(this);
 
  }

  bodyToSend= {
    data:"",
  }
  
  urlSimulation = "http://192.168.1.4:3000";
  urlReal = "http://192.168.1.0:3000";
  //url = "http://192.168.1.4:3000";

  urlSaveData = "https://polimi-dima-server.herokuapp.com/api/data";
 
  normalizeOutput(value, xmin, xmax){
    return ((value-xmin)/(xmax-xmin));
  }

  readDataFunction(){
    return fetch(global.currentUrl)
    .then((response) => {
      if (response.status == "200"){
        return (response.text());
      }
      else {
        alert("Invalid response");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  cutCoordString(coord){
    var coordStr = coord.toString();
    var arrayStr = coordStr.split(".");
    arrayStr[1] = arrayStr[1].substring(0, 4);
    var res = arrayStr[0].concat(".", arrayStr[1]);
    return res;
  }

  saveDataFunction(){
    console.log(JSON.stringify(this.bodyToSend));

    return fetch(this.urlSaveData, {
      method: "post",
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.state.token,
      },
      body: JSON.stringify(this.bodyToSend),
    })
    .then((response) => response.json())
    .then((responseJson)=>console.log(responseJson))  
    .catch((error) => {
      console.error(error);
    });
  }

  geolocation = async () => {
    try{
      const {status} = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        this.setState({
          errorMessage: 'PERMISSION NOT GRANTED',
        });
      } else {
      }
    } catch {
      //console.log("line 34");
      this.errorFunction();}
  }

  errorFunction() {
    console.log("Sarti");
  }

  options = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0
  };



  componentDidMount() {

    this.geolocation();
    this.watchID = navigator.geolocation.watchPosition((position) => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    }, this.errorFunction, this.options);
    

    this.timeInterval = setInterval( () =>  {
      this.readDataFunction().then((a)=> this.arduinoDataParser(a))
      .then(()=>{
        if(this.state.isOnStore) {
          this.saveDataFunction();
        }
      });        
    }, global.delay);
    const { params } = this.props.navigation.state;
    const token = params ? params.token : null;
    this.state.token = token;

  }

  endToNavigate(link) {
    console.log("WillUnmount");
    clearInterval(this.timeInterval);
    console.log(this.state.token);
    navigator.geolocation.clearWatch(this.watchID);
    if(link=="Login"){
    return fetch(this.url+"/user/logout", {
      method: "post",
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.state.token,
      },
    })
    .then((response) => {
      if (response.status == "200"){
        return this.props.navigation.navigate(link, {token: ''});
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
  else{
    this.props.navigation.navigate(link, {token: this.state.token})
  }
  }

  
  // Parser for ArduinoData
  arduinoDataParser(body){

    let fullString = body;
    fullString+=";"+this.state.latitude+";"+this.state.longitude;
    this.bodyToSend.data=fullString;

    data = {
      temperature: 10.0,
      humidity:10.0,
      pressure: 10.0,
      altitude: 150,
      tvocs: 10.0,
      eco2: 3750,
      pm05: 0,
      pm1: 0,
      pm25: 0,
      pm4: 0,
      pm10: 0,
      lat: 45.47,
      lng:9.22,
    };

    let array = body.split(';');
    var keys = Object.keys(data);
    keys.forEach((item, i) => {
      data[item] = array[i];
      if(i==2) {
        data[item]/=100;
      }
      if(i==11){
        data[item]=this.state.latitude;
      }
      if(i==12){
        data[item]=this.state.longitude;
      }
    });
    this.setState({data:data});
    return data;
  }



  render(){

    if(this.state.isOnSimulation){
      global.currentUrl = global.urlSimulation
    }
    else {
      global.currentUrl = global.urlReal;
    }

    return (
      <View style={styles.container}>

        <View style={styles.headerRow}>
          <Text style={styles.airQuality}>Air Quality</Text>

          <TouchableOpacity
            onPress={() => {this.endToNavigate("Settings")}}
            style={styles.settingsButton}>
            <Image
              source={require("../assets/images/user-icon.png")}
              resizeMode="contain"
              style={styles.settingslogo}
            ></Image>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {this.endToNavigate("Home")}}
            style={styles.homeButton}>
            <Image
              source={require("../assets/images/home_logo.png")}
              resizeMode="contain"
              style={styles.homelogo}
            ></Image>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() =>{this.endToNavigate("Login")}}
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

        <View style={styles.toggleContainer}>
          <ToggleSwitch
            isOn={this.state.isOnStore}
            onColor="red"
            offColor="gray"
            label="Rec"
            labelStyle={styles.toggleLabel}
            size="large"
            onToggle={isOnStore => {
              this.setState({ isOnStore });
            }}
          />

          <ToggleSwitch
            isOn={this.state.isOnSimulation}
            onColor="orange"
            offColor="gray"
            label="Simulate Data"
            labelStyle={styles.toggleLabel}
            size="large"
            onToggle={isOnSimulation => {
              this.setState({ isOnSimulation });
              if(isOnSimulation){
                global.currentUrl=global.urlSimulation
              }
              else {
                global.currentUrl = global.urlReal;
              }
            }}
          />
        </View>

        <DataBars         data={this.state.data}
                          showClusterInfo = {0} 
                          isArpaStation={false}
                          read={true} 
                          />
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rect: {
    display: "flex",
    flexDirection: "column",
    width: 'auto',
    height: 530,
    backgroundColor: "rgba(230, 230, 230,1)",
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    padding: 20
  },
  scrollView:{},
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
  settingsButton: {
    width: 27,
    height: 38,
    backgroundColor: "rgba(255,255,255,1)",
    marginLeft: 163
  },
  settingslogo: {
    width: 27,
    height: 38,
    marginTop: 1
  },
  homeButton: {
    width: 27,
    height: 38,
    backgroundColor: "rgba(255,255,255,1)",
    marginLeft: 10
  },
  homelogo: {
    width: 27,
    height: 38,
    marginTop: 1
  },
  locationButton: {
    width: 27,
    height: 27,
    backgroundColor: "rgba(255,255,255,1)",
    marginLeft: 25,
    marginTop: -15
  },
  locationLogo: {
    width: 27,
    height: 27,
    marginTop: 10
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
    marginTop: 15,
    marginBottom: 5
  },
  coordTxt:{
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 15,
    display: "flex",
    flexDirection: "row"
  },
  pedex:{
    fontSize: 10,
  },
  minValue:{
    marginLeft: 0,
  },
  maxValue:{
    marginLeft: 235,
  },
  edgesContainer:{
    display: "flex",
    flexDirection: "row"
  },
  parameterLabel:{
    marginBottom: 10
  },
  toggleLabel:{ 
    color: "black", 
    fontWeight: "normal"
  },
  toggleContainer:{
    display: "flex",
    flexDirection: "row",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
  }
});

export default ReadData;

