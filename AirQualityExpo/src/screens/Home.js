import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, ImageBackground } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

class Home extends Component{

  state = {
    token: '',
  }

  
  constructor() {
    super();
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
            <Text style={{fontSize:12, marginTop:-20,color:"white"}}>Read real time data, received from your Arduino device</Text>

          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Historical", {token: this.state.token})
            }
            }
            style={styles.rectangle}>
            <Text style={styles.readDataLabel}>Stored Data</Text>
            <Text style={{fontSize:12, marginTop:-20, color:"white"}}>Get recently stored data from your Arduino device and ARPA stations
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Historical", {token: this.state.token})
            }
            }
            style={styles.rectangle}>
            <Text style={styles.readDataLabel}>User Info</Text>
            <Text style={{fontSize:12, color:"white", marginTop:-20}}>Displays user information
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
    fontSize: 40,
    fontFamily: "roboto-regular",
    lineHeight: 73,
    letterSpacing: 0,
    textAlign: "center",
    width: 375,
    alignSelf: "flex-end",
    marginTop: 51
  },
  rectangle: {
    width: 170,
    height: 150,
    backgroundColor: "rgba(255,0,0,1)",
    marginLeft: 15,
    padding:15,
    marginTop:20,
  
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
    flexDirection:'row',
    flexWrap:'wrap',
    marginLeft:'auto',
    marginRight:'auto',
    marginTop:80,
    marginBottom:'auto',
  }

});

export default Home;

