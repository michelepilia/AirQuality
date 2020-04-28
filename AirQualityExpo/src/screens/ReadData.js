import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image, ScrollView } from "react-native";
import * as Progress from 'react-native-progress';
import ToggleSwitch from 'toggle-switch-react-native'

const micron = "\u00b5"

class ReadData extends Component {

  state = {
    temperature: [10.0, -10, 45], //[value, minValue, maxValue]
    humidity: [10.0, 0, 100],
    pressure: [10.0, 980, 1035],
    altitude: [150, 0, 800], //Deciso di lasciare la media in mezzo 68 valore max ok
    tvocs: [10.0, 100, 800],
    eco2: [3750, 2500, 4500],
    pm05: [0, 0, 10],
    pm1: [0, 0, 10],
    pm25: [0, 0, 10],
    pm4: [0, 0, 10],
    pm10: [0, 0, 10],
    latitude: [45.4700000000000,0,0],
    longitude: [9.222200000000000,0,0],
    isOnStore: false,
    isOnSimulation: true,
    token: '',
  };

  urlSimulation = "http://192.168.1.4:3000";
  urlReal = "http://192.168.1.0:3000";

  url ="http://192.168.1.4:3000";
  delay = 5000;

  body1 = {
    data: "",
  }

  urlSaveData = "https://polimi-dima-server.herokuapp.com/api/data";
  
  normalizeOutput(value, xmin, xmax){
    return ((value-xmin)/(xmax-xmin));
  }

  readDataFunction(){
    return fetch(this.url)
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

  saveDataFunction(){

    return fetch(this.urlSaveData, {
      method: "post",
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.state.token,
      },
      body: JSON.stringify( this.body1 ),
    })
    .then((response) => {
      console.log("RESPONSE CODE: "+response.status);
      if (response.status == "200"){
        return (response.json());
      }
      else {
        alert("Invalid response");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }


  componentDidMount() {
    this.timeInterval = setInterval( () =>  {
      this.readDataFunction().then((a)=> {
        //console.log(a);
        this.arduinoDataParser(a);
        if(this.state.isOnStore) {
          this.saveDataFunction();
        }
      });        
    }, this.delay);
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval);
  }
  
  // Parser for ArduinoData
  arduinoDataParser = function(body){
    var string1 = body;
    string1.concat(";",global.latitudePosition,";",global.longitudePosition);
    console.log("BODY: "+ string1);
    this.body1.data = string1;

  // Object
  data = {
    temperature: [10.0, -10, 45], //[value, minValue, maxValue]
    humidity: [10.0, 0, 100],
    pressure: [10.0, 980, 1035],
    altitude: [150, 0, 800], //Deciso di lasciare la media in mezzo 68 valore max ok
    tvocs: [10.0, 100, 800],
    eco2: [3750, 2500, 4500],
    pm05: [0, 0, 10],
    pm1: [0, 0, 10],
    pm25: [0, 0, 10],
    pm4: [0, 0, 10],
    pm10: [0, 0, 10],
    latitude: [45.4700000000000, 0, 0],
    longitude: [9.2200000000000, 0, 0]
  };

  // Splitting body of the post
  let array = body.split(';');
  // Creating data object keys
  var keys = Object.keys(data);
  // Looping on keys to update the values
  keys.forEach((item, i) => {

    data[item][0] = array[i];

    if(i==2) {
      data[item][0]/=100;
    }
    if(i==11) {
      data[item][0]=global.latitudePosition;
    }
    if(i==12){
      data[item][0]=global.longitudePosition;
    }
    console.log("##VALUE: " + data[item]);
  });
  this.setState(data);

  //data.timestamp = generateTimestamp();

  return data;
}


  render(){

    const { params } = this.props.navigation.state;
    const token = params ? params.token : null;
    this.state.token = token;
    //console.log("TOKEN: "+this.state.token);

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
                this.url=this.urlSimulation
              }
              else {
                this.url = this.urlReal;
              }
              //alert(this.url);
            }}
          />
        </View>

        

        <View style={styles.rect}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.coordTxt}>
              <Text>Coordinates: {this.state.latitude}°N, {this.state.longitude}°E</Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("ViewMap")}
                style={styles.locationButton}>
                <Image
                  source={require("../assets/images/location.png")}
                  resizeMode="contain"
                  style={styles.locationLogo}
                ></Image>
              </TouchableOpacity>
            </View>

            <View style={styles.parameterBar}>
              <Text style={styles.parameterLabel}>Altitude: {this.state.altitude[0]} mt.</Text>
              <Progress.Bar progress={this.normalizeOutput(this.state.altitude[0], 
                                      this.state.altitude[1], this.state.altitude[2])} 
                                      width={270} color="red"/>
              <View style={styles.edgesContainer}>
                <Text style={styles.minValue}>{this.state.altitude[1]}</Text>
                <Text style={styles.maxValue}>{this.state.altitude[2]}</Text>
              </View>
            </View>

            <View style={styles.parameterBar}>
              <Text style={styles.parameterLabel}>Temperature: {this.state.temperature[0]}°</Text>
              <Progress.Bar progress={this.normalizeOutput(this.state.temperature[0], 
                                      this.state.temperature[1], this.state.temperature[2])} 
                                      width={270} color="red"/>
              <View style={styles.edgesContainer}>
                <Text style={styles.minValue}>{this.state.temperature[1]}</Text>
                <Text style={styles.maxValue}>{this.state.temperature[2]}</Text>
              </View> 
            </View>

            <View style={styles.parameterBar}>
              <Text style={styles.parameterLabel}>Humidity: {this.state.humidity[0]}%</Text>
              <Progress.Bar progress={this.normalizeOutput(this.state.humidity[0], 
                                      this.state.humidity[1], this.state.humidity[2])} 
                                      width={270} color="red"/>
              <View style={styles.edgesContainer}>
                <Text style={styles.minValue}>{this.state.humidity[1]}</Text>
                <Text style={styles.maxValue}>{this.state.humidity[2]}</Text>
              </View>
            </View>

            <View style={styles.parameterBar}>
              <Text style={styles.parameterLabel}>Pressure: {this.state.pressure[0]} hPa</Text>
              <Progress.Bar progress={this.normalizeOutput(this.state.pressure[0], 
                                      this.state.pressure[1], this.state.pressure[2])} 
                                      width={270} color="red"/>
              <View style={styles.edgesContainer}>
                <Text style={styles.minValue}>{this.state.pressure[1]}</Text>
                <Text style={styles.maxValue}>{this.state.pressure[2]}</Text>
              </View>
            </View>

            <View style={styles.parameterBar}>
              <Text style={styles.parameterLabel}>TVOCs: {this.state.tvocs[0]} ppb</Text>
              <Progress.Bar progress={this.normalizeOutput(this.state.tvocs[0], 
                                      this.state.tvocs[1], this.state.tvocs[2])} 
                                      width={270} color="red"/>
              <View style={styles.edgesContainer}>
                <Text style={styles.minValue}>{this.state.tvocs[1]}</Text>
                <Text style={styles.maxValue}>{this.state.tvocs[2]}</Text>
              </View>
            </View>

            <View style={styles.parameterBar}>
              <Text style={styles.parameterLabel}>CO<Text style={styles.pedex}>2</Text>: {this.state.eco2[0]} ppm</Text>
              <Progress.Bar progress={this.normalizeOutput(this.state.eco2[0], 
                                      this.state.eco2[1], this.state.eco2[2])} 
                                      width={270} color="red"/>
              <View style={styles.edgesContainer}>
                <Text style={styles.minValue}>{this.state.eco2[1]}</Text>
                <Text style={styles.maxValue}>{this.state.eco2[2]}</Text>
              </View>
            </View>

            <View style={styles.parameterBar}>
              <Text style={styles.parameterLabel}>PM<Text style={styles.pedex}>0.5</Text>: {this.state.pm05[0]} {micron}m</Text>
              <Progress.Bar progress={this.normalizeOutput(this.state.pm05[0], 
                                      this.state.pm05[1], this.state.pm05[2])} 
                                      width={270} color="red"/>
              <View style={styles.edgesContainer}>
                <Text style={styles.minValue}>{this.state.pm05[1]}</Text>
                <Text style={styles.maxValue}>{this.state.pm05[2]}</Text>
              </View>
            </View>

            <View style={styles.parameterBar}>
              <Text style={styles.parameterLabel}>PM<Text style={styles.pedex}>1</Text>: {this.state.pm1[0]} {micron}m</Text>
              <Progress.Bar progress={this.normalizeOutput(this.state.pm1[0], 
                                      this.state.pm1[1], this.state.pm1[2])} 
                                      width={270} color="red"/>
              <View style={styles.edgesContainer}>
                <Text style={styles.minValue}>{this.state.pm1[1]}</Text>
                <Text style={styles.maxValue}>{this.state.pm1[2]}</Text>
              </View>
            </View>

            <View style={styles.parameterBar}>
              <Text style={styles.parameterLabel}>PM<Text style={styles.pedex}>2.5</Text>: {this.state.pm25[0]} {micron}m</Text>
              <Progress.Bar progress={this.normalizeOutput(this.state.pm25[0], 
                                      this.state.pm25[1], this.state.pm25[2])} 
                                      width={270} color="red"/>
              <View style={styles.edgesContainer}>
                <Text style={styles.minValue}>{this.state.pm25[1]}</Text>
                <Text style={styles.maxValue}>{this.state.pm25[2]}</Text>
              </View>
            </View>

            <View style={styles.parameterBar}>
              <Text style={styles.parameterLabel}>PM<Text style={styles.pedex}>4</Text>: {this.state.pm4[0]} {micron}m</Text>
              <Progress.Bar progress={this.normalizeOutput(this.state.pm4[0], 
                                      this.state.pm4[1], this.state.pm4[2])} 
                                      width={270} color="red"/>
              <View style={styles.edgesContainer}>
                <Text style={styles.minValue}>{this.state.pm4[1]}</Text>
                <Text style={styles.maxValue}>{this.state.pm4[2]}</Text>
              </View>
            </View>

            <View style={styles.parameterBar}>
              <Text style={styles.parameterLabel}>PM<Text style={styles.pedex}>10</Text>: {this.state.pm10[0]} {micron}m</Text>
              <Progress.Bar progress={this.normalizeOutput(this.state.pm10[0], 
                                      this.state.pm10[1], this.state.pm10[2])} 
                                      width={270} color="red"/>
              <View style={styles.edgesContainer}>
                <Text style={styles.minValue}>{this.state.pm10[1]}</Text>
                <Text style={styles.maxValue}>{this.state.pm10[2]}</Text>
              </View>               
            </View>
          </ScrollView>
          </View>
        
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

