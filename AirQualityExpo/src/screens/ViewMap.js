import React, { Component } from "react";
import { AppRegistry, StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import MapView from 'react-native-maps';
import * as Permissions from 'expo-permissions';

class ViewMap extends Component{

  state = {
    errorMessage: '',
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
    token: ''
  }
  radius = 100;
  coordinatesSet = [{latitude:45.475,longitude:9.22}, {latitude:45.476, longitude:9.225}]
  
  arrowImg(){
    let trueImg = require("../assets/images/filledArrow.jpeg");
    let falseImg = require("../assets/images/emptyArrow.png");

    if(this.state.followUserLocation){
      return trueImg;
    }
    else{
      return falseImg;
    }
  }

  componentDidMount() {
    this.geoLocation().then(()=>{
      console.log("First log");
      this.watchID = navigator.geolocation.watchPosition((position) => {
      // Create the object to update this.state.mapRegion through the onRegionChange function
      let region = {
        latitude:       position.coords.latitude,
        longitude:      position.coords.longitude,
        latitudeDelta:  0.00922*1.5,
        longitudeDelta: 0.00421*1.5
      }
      if(this.state.followUserLocation){
        this.setState({
          mapRegion: region
        });
        this.onRegionChange(region);
      }
      
      }, this.errorFunction, this.options)}
    );

    const { params } = this.props.navigation.state;
    const token = params ? params.token : null;
    this.state.token = token;
  }

  mapDragged(){
    this.setState({
      followUserLocation: false
    });
    console.log("Map dragged, follow: " + this.state.followUserLocation);
  }

  pressFollow(){
    this.setState({
      followUserLocation: !(this.state.followUserLocation)
    });
    console.log("pressed arrow");
  }

  geoLocation = async () => {
    try{
      const {status} = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        console.log('not granted');

        this.setState({
          errorMessage: 'PERMISSION NOT GRANTED',
        });
      } else {
        console.log("granted");
      }
    } catch {
      console.log("error function");
      this.errorFunction();}
  }

  options = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0
  };

  /*componentDidMount() {
  }*/

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

  endToNavigate(link) {
    navigator.geolocation.clearWatch(this.watchID);

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
        return this.props.navigation.navigate(link, {token: this.state.token});;
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

  onMapPress(e) {
    console.log(e.nativeEvent.coordinate);
    let region = {
      latitude:       e.nativeEvent.coordinate.latitude,
      longitude:      e.nativeEvent.coordinate.longitude,
      latitudeDelta:  0.00922*1.5,
      longitudeDelta: 0.00421*1.5
    }
    //this.onRegionChange(region);
  }

  

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.title}>View Map</Text>
        
        <TouchableOpacity onPress={()=>{this.pressFollow()}} style={styles.arrowBtn}>
          <Image
            source={(this.arrowImg())}
            style={styles.arrowMapImg}>
          </Image>
        </TouchableOpacity>

        {/* https://snack.expo.io/@michelepilia/5b84d0 */}
        <MapView
          style={styles.mapImg}
          initialRegion={this.state.mapRegion}
          region = {this.state.mapRegion}
          showsUserLocation={this.state.showsUserLocation}
          followUserLocation={this.state.followUserLocation}
          onUserLocationChange={event => console.log(event.nativeEvent)}
          onPress={() => {}}
          onPanDrag={() => {this.mapDragged()}}>
          
            <MapView.Circle
              key = {'1'}
              center = {this.state.latlng}
              radius = {this.radius}
              fillColor = {'rgba(255,0,0,0.2)'}
              strokeWidth = {2}
              strokeColor = {'rgba(20,20,255,0.2)'}
            />
            <MapView.Polyline
              coordinates = {this.coordinatesSet}
              strokeColor = {'rgba(20,20,255,0.2)'}
              strokeWidth = {2}
            />
        </MapView>
        
        <View style={styles.button3Row}>
          <TouchableOpacity style={styles.button3}>
            <Text style={styles.pm104}>Var</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2}>
            <Text style={styles.pm105}>Var</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button1}>
            <Text style={styles.pm106}>Var</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.button6Row}>
          <TouchableOpacity style={styles.button6}>
            <Text style={styles.pm101}>PM 10</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button5}>
            <Text style={styles.co2}>CO2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button4}>
            <Text style={styles.pm103}>Var</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.airQuality1Row}>
          <Text style={styles.airQuality1}>Air Quality</Text>
          <TouchableOpacity
            onPress={() => {this.endToNavigate("Settings")}}
            style={styles.settingsButton}>
            <Image
              source={require("../assets/images/settings_logo.jpeg")}
              resizeMode="contain"
              style={styles.settingslogo}
            ></Image>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.endToNavigate("Home")}
            style={styles.homeButton1}
          >
            <Image
              source={require("../assets/images/home_logo.png")}
              resizeMode="contain"
              style={styles.homelogo}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.endToNavigate("Login")}
            style={styles.logoutButton1}
          >
            <Image
              source={require("../assets/images/logout.png")}
              resizeMode="contain"
              style={styles.logoutLogo}
            ></Image>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    marginTop: 71
  },
  mapImg: {
    width: 313,
    height: 403,
    marginTop: 42,
    marginLeft: 32
  },
  button3: {
    width: 100,
    height: 40,
    backgroundColor: "rgba(230, 230, 230,1)"
  },
  pm104: {
    width: 100,
    height: 40,
    color: "rgba(255,0,0,1)",
    fontSize: 15,
    fontFamily: "roboto-regular",
    lineHeight: 40,
    letterSpacing: 0,
    textAlign: "center"
  },
  button2: {
    width: 100,
    height: 40,
    backgroundColor: "rgba(230, 230, 230,1)",
    marginLeft: 7
  },
  pm105: {
    width: 100,
    height: 40,
    color: "rgba(255,0,0,1)",
    fontSize: 15,
    fontFamily: "roboto-regular",
    lineHeight: 40,
    letterSpacing: 0,
    textAlign: "center"
  },
  button1: {
    width: 100,
    height: 40,
    backgroundColor: "rgba(230, 230, 230,1)",
    marginLeft: 6
  },
  pm106: {
    height: 40,
    color: "rgba(255,0,0,1)",
    fontSize: 15,
    fontFamily: "roboto-regular",
    lineHeight: 40,
    letterSpacing: 0,
    textAlign: "center"
  },
  button3Row: {
    height: 40,
    flexDirection: "row",
    marginTop: 88,
    marginLeft: 31,
    marginRight: 31
  },
  button6: {
    width: 100,
    height: 40,
    backgroundColor: "rgba(230, 230, 230,1)",
    borderColor: "rgba(255,0,0,1)",
    borderWidth: 3
  },
  pm101: {
    width: 100,
    height: 40,
    color: "rgba(255,0,0,1)",
    fontSize: 15,
    fontFamily: "roboto-regular",
    lineHeight: 40,
    letterSpacing: 0,
    textAlign: "center"
  },
  button5: {
    width: 100,
    height: 40,
    backgroundColor: "rgba(230, 230, 230,1)",
    marginLeft: 6
  },
  co2: {
    width: 100,
    height: 40,
    color: "rgba(255,0,0,1)",
    fontSize: 15,
    fontFamily: "roboto-regular",
    lineHeight: 40,
    letterSpacing: 0,
    textAlign: "center"
  },
  button4: {
    width: 100,
    height: 40,
    backgroundColor: "rgba(230, 230, 230,1)",
    marginLeft: 7
  },
  pm103: {
    width: 100,
    height: 40,
    color: "rgba(255,0,0,1)",
    fontSize: 15,
    fontFamily: "roboto-regular",
    lineHeight: 40,
    letterSpacing: 0,
    textAlign: "center"
  },
  button6Row: {
    height: 40,
    flexDirection: "row",
    marginTop: -90,
    marginLeft: 31,
    marginRight: 31
  },
  airQuality1: {
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
  homeButton1: {
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
  logoutButton1: {
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
  airQuality1Row: {
    height: 38,
    flexDirection: "row",
    marginTop: -635,
    marginLeft: 10,
    marginRight: 17
  },
  arrowMapImg:{
    width: 50,
    height: 50,
  },
  arrowBtn:{
    width: 50,
    height: 50,
    zIndex: 2,
    top: 90,
    left: 30,
    display: "flex",
    margin: 0
  }
});

export default ViewMap;

