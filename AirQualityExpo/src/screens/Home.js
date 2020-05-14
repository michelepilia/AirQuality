import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

class Home extends Component{

  state = {
    token: '',
  }

  
  constructor() {
    super();
    global.urlSimulation = "http://192.168.1.4:3000";
    global.urlReal  = "http://192.168.1.0:3000";
    global.currentUrl = "http://192.168.1.4:3000";
    global.delay = 5000;
  }

  componentDidMount(){
    const { params } = this.props.navigation.state;
    const token = params ? params.token : null;
    this.setState({token : token});
  }

  render(){
    return (
      <View style={styles.container}>

        <View style={styles.headerRow}>
          
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Login")}
            style={styles.logoutButton1}>
            <Image
              source={require("../assets/images/logout.png")}
              resizeMode="contain"
              style={styles.logoutLogo}
            ></Image>
          </TouchableOpacity>

        
        </View>
        <Text style={styles.airQuality}>Air Quality</Text>
        <ScrollView style={styles.scrollView}>
          <TouchableOpacity
            onPress={() => {

              console.log(this.state.token);
              this.props.navigation.navigate("ReadData", {token: this.state.token})}
            
            }
            style={styles.readDataBtn}>
            <Text style={styles.readDataLabel}>Read Data</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("ViewMap")}
            style={styles.viewMapBtn}>
            <Text style={styles.viewMapLabel}>View Map</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Historical", {token: this.state.token})
            }
            }
            style={styles.viewMapBtn}>
            <Text style={styles.viewMapLabel}>Historical Data</Text>
          </TouchableOpacity>
        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  airQuality: {
    height: 73,
    color: "rgba(255,0,0,1)",
    fontSize: 40,
    fontFamily: "roboto-regular",
    lineHeight: 73,
    letterSpacing: 0,
    textAlign: "center",
    width: 375,
    alignSelf: "flex-end",
    marginTop: 51
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
  statsButton: {
    width: 27,
    height: 38,
    backgroundColor: "rgba(255,255,255,1)",
    marginLeft: 163
  },
  logoutButton1: {
    width: 27,
    height: 38,
    backgroundColor: "rgba(225,96,96,0)",
    marginTop: 44,
    marginLeft: "auto",
    marginRight: 10,
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
  statsLogo: {
    width: 27,
    height: 38,
    marginTop: 1
  },
  scrollView:{
    marginBottom: 10,
  },
});

export default Home;

