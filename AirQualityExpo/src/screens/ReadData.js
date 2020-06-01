import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image, ScrollView,ActivityIndicator, Dimensions } from "react-native";
import ToggleSwitch from 'toggle-switch-react-native'
import * as Permissions from 'expo-permissions';
import DataBarsRealTime from "../components/DataBarsRealTime";
import MapView from 'react-native-maps';
import NavigationEvents from 'react-navigation';

class ReadData extends Component {

  constructor(props){
    super(props);
    global.urlSimulation = "http://192.168.1.4:3000";
    global.urlReal  = "http://192.168.1.0:3000";
    global.currentUrl = "http://192.168.1.4:3000";
    global.delay = 5000;
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
      isReadingData: false,
      correctUrl:false,

      mapRegion: {
        latitude:       45.4781291,
        longitude:      9.2277907,
        latitudeDelta:  0.00922*1.5,
        longitudeDelta: 0.00421*1.5
      },
      latlng: {
        latitude: 45.475,
        longitude: 9.22
      },
      followUserLocation: true,
      showsUserLocation: true,
      isLoading: true,

    }

    this.normalizeOutput.bind(this);
    this.readDataFunction.bind(this);
    this.cutCoordString.bind(this);
    this.saveDataFunction.bind(this);
    this.arduinoDataParser.bind(this);
    this.componentCleanUp.bind(this);
    this.onFocusFunction.bind(this);
 
  }

  bodyToSend= {
    data:"",
  }
  
  urlSimulation = "http://192.168.1.4:3000";
  urlReal = "http://192.168.1.0:3000";

  urlSaveData = "https://polimi-dima-server.herokuapp.com/api/data";
  urlUser = "https://polimi-dima-server.herokuapp.com/api";
 
  normalizeOutput(value, xmin, xmax){
    return ((value-xmin)/(xmax-xmin));
  }

  componentCleanUp(){
    console.log("Cleaning");
    //this.focusListener.remove();

  }

  readDataFunction(){
    console.log("Retrieving Arduino Data");
    return fetch(global.currentUrl)
    .then((response) => {
      console.log(response);
      if (response.status == "200"){
        this.setState({isReadingData:true, correctUrl:true});
        return (response.text());
      }
      else {
        //alert("Invalid response");
      }
    })
    .catch((error) => {
     //this.setState({correctUrl:false})
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
    //console.log(JSON.stringify(this.bodyToSend));

    return fetch(this.urlSaveData, {
      method: "post",
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.state.token,
      },
      body: JSON.stringify(this.bodyToSend),
    })
    .then((response) => {
      if (response.status != "200"){
        alert(response.status);
      }
      response.json();
    }
    )
    //.then((responseJson)=>console.log(responseJson))  
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
      this.errorFunction();}
  }

  errorFunction() {
    console.log("Error");
  }

  options = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0
  };

  errorFunction() {
    console.log("Error");
  }

  onRegionChange(region) {
    this.setState({
      mapRegion: region
    });
  }

  onLocationChange(){
    console.log("Location changed");
  }


    
onFocusFunction(){
    
    try {
      this.readDataFunction().then(()=>{

        if(this.state.correctUrl){
          this.timeInterval = setInterval( () =>  {
            this.readDataFunction().then((a)=> {this.arduinoDataParser(a)},this.errorFunction)
            .then(()=>{
              if(this.state.isOnStore) {
                this.saveDataFunction();
              }
            },this.errorFunction);        
          }, global.delay);
        }
        else{
          alert('It seems your Arduino device is not connected!');

        }
      }); 
    }     
    catch{
      this.errorFunction();
    }
    
    const { params } = this.props.navigation.state;
    const token = params ? params.token : null;
    this.state.token = token;

  
}

componentDidMount () {
  console.log("MOUNTING!");
    this.geolocation().then(()=>{
      this.watchID = navigator.geolocation.watchPosition((position) => {
      let region = {
        latitude:       position.coords.latitude,
        longitude:      position.coords.longitude,
        latitudeDelta:  0.000922*1.5,
        longitudeDelta: 0.000421*1.5
      }
      if(this.state.followUserLocation){
        this.setState({
          mapRegion: region
        });
        this.onRegionChange(region);
      }
      this.setState({isLoading:false});
      
      }, this.errorFunction, this.options)}
    );

  this.focusListener = this.props.navigation.addListener('didFocus', () => {
    this.onFocusFunction();
  })
}



  endToNavigate(link) {
    clearInterval(this.timeInterval);
    this.setState({isReadingData:false});

    console.log(this.state.token);
    navigator.geolocation.clearWatch(this.watchID);
    if(link=="Login"){
      return fetch(this.urlUser+"/user/logout", {
        method: "post",
        headers:{
          Accept: 'application/json',
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
      //alert("logout");
    }
    else{
      this.props.navigation.navigate(link, {token: this.state.token});
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
    //console.log(this.state.data);
    return data;
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
    else if(this.state.isReadingData) {
      return (
        <View style={styles.container}>
          <ScrollView>
          <View style={styles.headerRow}>
            <Text style={styles.airQuality}>Air Quality</Text>

            <TouchableOpacity
              onPress={() => {this.endToNavigate("Settings")
              this.componentCleanUp();}
            }
              style={styles.settingsButton}>
              <Image
                source={require("../assets/images/user-icon.png")}
                resizeMode="contain"
                style={styles.settingslogo}
              ></Image>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {this.endToNavigate("Historical")
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
              onPress={() =>{this.endToNavigate("Login")
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

          <Text style={styles.title}>Real Time Data</Text>
        
          <MapView
            style={styles.mapImg}
            initialRegion={this.state.mapRegion}
            region = {this.state.mapRegion}
            showsUserLocation={this.state.showsUserLocation}
            followUserLocation={this.state.followUserLocation}
          // onUserLocationChange={event => console.log(event.nativeEvent)}
            width={Dimensions.get("window").width-50}

          >

          </MapView>

          <View style={styles.toggleContainer}>
            <ToggleSwitch
              isOn={this.state.isOnStore}
              onColor="red"
              offColor="gray"
              label="Store Data"
              labelStyle={styles.toggleLabel}
              size="large"
              onToggle={isOnStore => {
                this.setState({ isOnStore });
              }}
              size="small"
            />

          </View>

          <DataBarsRealTime  data={this.state.data}/>
          
          </ScrollView>
        </View>
      );
    }
    else {
      return (
        <View style={styles.container}>
          <ScrollView>
          <View style={styles.headerRow}>
            <Text style={styles.airQuality}>Air Quality</Text>

            <TouchableOpacity
              onPress={() => {this.endToNavigate("Settings")
              this.componentCleanUp();}
            }
              style={styles.settingsButton}>
              <Image
                source={require("../assets/images/user-icon.png")}
                resizeMode="contain"
                style={styles.settingslogo}
              ></Image>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {this.endToNavigate("Historical")
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
              onPress={() =>{this.endToNavigate("Login")
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

          <Text style={styles.title}>Real Time Data</Text>
        
          <MapView
            style={styles.mapImg}
            initialRegion={this.state.mapRegion}
            region = {this.state.mapRegion}
            showsUserLocation={this.state.showsUserLocation}
            followUserLocation={this.state.followUserLocation}
          // onUserLocationChange={event => console.log(event.nativeEvent)}
            width={Dimensions.get("window").width-50}

          >

          </MapView>
          
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
    fontSize: 28,
    fontFamily: "roboto-regular",
    lineHeight: 73,
    letterSpacing: 0,
    textAlign: "center",
    width: 375,
    alignSelf: "flex-end",
    marginTop: 5
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
  mapImg: {
    height: 200,
    marginTop: 15,
    marginLeft: 'auto',
    marginRight:'auto'
  },
  settingsButton: {
    width: 27,
    height: 38,
    backgroundColor: "rgba(255,255,255,1)",
    marginLeft:Dimensions.get('window').width-220,
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
    height: 38,
    backgroundColor: "rgba(255,255,255,1)",
    marginLeft:10,
    marginTop:10,
  },
  locationLogo: {
    width: 27,
    height: 27,
  },
  logoutButton: {
    width: 27,
    height: 38,
    backgroundColor: "rgba(225,96,96,0)",
    marginLeft:10,
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
    marginLeft: 15,
    marginTop: 25,
    
  },
  ActivityIndicator:{
    marginLeft:'auto',
    marginRight:'auto',
    marginBottom:'auto',
    marginTop:'auto',

  },
});

export default ReadData;

