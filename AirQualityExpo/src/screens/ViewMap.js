import React, { Component } from "react";
import { AppRegistry, StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import MapView from 'react-native-maps';
import * as Permissions from 'expo-permissions';

class ViewMap extends Component{

  state = {
    location: {},
    errorMessage: '',
    mapRegion: null,
    lastLat: null,
    lastLong: null,
  }


  componentWillMount() {
    this.geoLocation();
    
  }

  geoLocation = async () => {
    const {status} = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      console.log('bruschi');

      this.setState({
        errorMessage: 'PERMISSION NOT GRANTED',
      });
    }  
  }

  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition((position) => {
      // Create the object to update this.state.mapRegion through the onRegionChange function
      let region = {
        latitude:       position.coords.latitude,
        longitude:      position.coords.longitude,
        latitudeDelta:  0.00922*1.5,
        longitudeDelta: 0.00421*1.5
      }
      this.onRegionChange(region, region.latitude, region.longitude);
    });
  }

  onRegionChange(region, lastLat, lastLong) {
    this.setState({
      mapRegion: region,
      // If there are no new values set use the the current ones
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  onMapPress(e) {
    console.log(e.nativeEvent.coordinate.longitude);
    let region = {
      latitude:       e.nativeEvent.coordinate.latitude,
      longitude:      e.nativeEvent.coordinate.longitude,
      latitudeDelta:  0.00922*1.5,
      longitudeDelta: 0.00421*1.5
    }
    this.onRegionChange(region, region.latitude, region.longitude);
  }

  

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.title}>View Map</Text>
        
        {/* https://snack.expo.io/@michelepilia/5b84d0 */}
        <MapView
          style={styles.mapImg}
          initialRegion={this.state.mapRegion}
          showsUserLocation={true}
          followUserLocation={true}
          onRegionChange={this.onRegionChange.bind(this)}
          onPress={this.onMapPress.bind(this)}>
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
            onPress={() => this.props.navigation.navigate("Home")}
            style={styles.homeButton1}
          >
            <Image
              source={require("../assets/images/home_logo.png")}
              resizeMode="contain"
              style={styles.homelogo}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Login")}
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
    alignSelf: "flex-end",
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
  homeButton1: {
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
  }
});

export default ViewMap;

