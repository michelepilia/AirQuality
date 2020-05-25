import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, ImageBackground, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

class Home extends Component{

  state = {
    token: '',
  }

  url = "https://polimi-dima-server.herokuapp.com/api";
  
  constructor() {
    super();
    global.urlSimulation = "http://192.168.1.4:3000";
    global.urlReal  = "http://192.168.1.0:3000";
    global.currentUrl = "http://192.168.1.4:3000";
    global.delay = 5000;

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

  componentDidMount(){
    const { params } = this.props.navigation.state;
    const token = params ? params.token : null;
    this.setState({token : token});
  }

  render(){
    return (
      <View>

        <View style={styles.headerRow}>
          
          <TouchableOpacity
            onPress={() => this.logoutFunction()}
            style={styles.logoutButton1}>
            <Image
              source={require("../assets/images/logout.png")}
              resizeMode="contain"
              style={styles.logoutLogo}
            ></Image>
          </TouchableOpacity>

        
        </View>
        <Text style={styles.airQuality}>Air Quality</Text>
        <View style={styles.scrollView}>
          <TouchableOpacity
            onPress={() => {

              console.log(this.state.token);
              this.props.navigation.navigate("ReadData", {token: this.state.token})}
            
            }
            style={styles.rectangle}>
              
            <Text style={styles.readDataLabel}>Real Time data</Text>
            <Text style={{fontSize:12, marginTop:-30,color:"white", textAlign:'center'}}>Read real time data, received from your Arduino device</Text>

          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Historical", {token: this.state.token})
            }
            }
            style={styles.rectangle}>
            <Text style={styles.readDataLabel}>Stored Data</Text>
            <Text style={{fontSize:12, marginTop:-30, color:"white",textAlign:'center'}}>Get recently stored data from your Arduino device and ARPA stations
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Settings", {token: this.state.token})
            }
            }
            style={styles.rectangle}>
            <Text style={styles.readDataLabel}>User Info</Text>
            <Text style={{fontSize:12, color:"white", marginTop:-30,textAlign:'center'}}>Displays user information
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({


  airQuality: {
    height: 73,
    color: "rgba(255,0,0,1)",
    fontSize: 32,
    fontFamily: "roboto-regular",
    lineHeight: 73,
    letterSpacing: 0,
    textAlign: "center",
    width: 375,
    alignSelf: "flex-end",
    marginTop: 20
  },
  rectangle: {
    width: Dimensions.get('window').width-80,
    height: 100,
    backgroundColor: "rgba(255,0,0,1)",
    marginTop:15,
    alignItems:"center",
    borderRadius:5,
    borderColor:"rgba(255,20,20,0.5)",
    padding:10,
  
  },
  viewMapLabel: {
    width: 150,
    height: 90,
    color: "rgba(255,255,255,1)",
    fontSize: 30,
    fontFamily: "roboto-regular",
    lineHeight: 93,
    letterSpacing: 0,
    textAlign: "center"
  },
  realTimeDataImage:{
    opacity:0.5,
    width:130,
    height:90,
    marginLeft:'auto',
    marginRight:'auto',

  },
  readDataBtn: {
    width: 150,
    height: 90,
    backgroundColor: "rgba(255,0,0,1)",
    marginTop: 130,
    marginLeft: 35
  },
  readDataLabel: {
    color: "rgba(255,255,255,1)",
    fontSize: 20,
    fontFamily: "roboto-regular",
    lineHeight: 93,
    letterSpacing: 0,
    textAlign: "center",
    marginTop:-15,
  },
  descriptionLabel:{
    opacity:1,
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
    marginTop: 10,
    marginLeft: "auto",
    marginRight: 10,
  },
  logoutLogo: {
    width: 27,
    height: 38,
    marginTop: 30
  },
  headerRow: {
    height: 38,
    flexDirection: "row",
    marginTop: 20,
    marginLeft: 10,
    marginRight: 17
  },
  statsLogo: {
    width: 27,
    height: 38,
    marginTop: 1
  },
  scrollView:{
    flexDirection:'column',
    flexWrap:'wrap',
    marginLeft:'auto',
    marginRight:'auto',
    marginTop:80,
    marginBottom:'auto',
    backgroundColor:'rgba(255,100,50,0.3)',
    padding:20,
    width:Dimensions.get('window').width-40,
  }

});

export default Home;

