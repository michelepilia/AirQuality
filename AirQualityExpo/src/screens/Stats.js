import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import DailyPath from "./DailyPath";
import DisplayStats from "./DisplayStats";

class Stats extends Component{

  constructor(props) {

    super(props);
    this.state = {
      token: '',
      startDate: '',
      endDate: '',
    }
    this.retrieveDataByDate = this.retrieveDataByDate.bind(this);
    this.retrieveData = this.retrieveData.bind(this);
    this.addOneMeasureToState = this.addOneMeasureToState.bind(this);
    this.addMeasuresToState = this.addMeasuresToState.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.getDailyDataByHourMean = this.getDailyDataByHourMean.bind(this);

    this.today={
      year: new Date().getFullYear(),
      month: new Date().getMonth()+1,
      day: new Date().getDate(),
    }
    this.urlDate = "https://polimi-dima-server.herokuapp.com/api/data/findByDate?startDate=2020-04-15T09:00:00Z&endDate=2020-04-16T23:00:00Z";
    this.url = "https://polimi-dima-server.herokuapp.com/api/data?offset=0&limit=1";
    this.measures = [];
  }


  coordinatesSet = [{latitude:45.475,longitude:9.22}, {latitude:45.476, longitude:9.225},{latitude:45.474, longitude:9.222}]

  
  retrieveData(){
    return fetch(this.url)
    .then((response) => {
      console.log("RESPONSE CODE: "+response.status);
      if (response.status == "200"){
        return (response.json());
      }
      else {
        alert("Invalid response");
      }
    })
    .then((response) => console.log(response))
    .catch((error) => {
      console.error(error);
    });
  }

  retrieveDataByDate(url){
    return fetch(url)
    .then((response) => {
      console.log("RESPONSE CODE: "+response.status);
      if (response.status == "200"){
        return ((response.json()));
      }
      else {
        alert("Invalid response from server");
      }
    })
    .then((response) => {
      //console.log(response);
      this.addMeasuresToState(response);
    })
    .catch((error) => {
      console.error(error);
    });

  }

  addOneMeasureToState(body){

    //alert("reading data: delay is = " +global.delay);
    var string1 = body;
    string1.concat(";",this.state.latitude,";",this.state.longitude);
    //console.log("BODY: "+ string1);
    this.body1.data = string1;

    // Object
    data = {
      temperature: 25.0, 
      humidity: 75.0,
      pressure: 11.0,
      altitude: 144, //Deciso di lasciare la media in mezzo 68 valore max ok
      tvocs: 9.0,
      eco2: 3350,
      pm05: 12,
      pm1: 1,
      pm25: 2,
      pm4: 5,
      pm10: 2,
      latitude: 45.41,
      longitude: 9.20,
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
        data[item][0]=this.state.latitude;
      }
      if(i==12){
        data[item][0]=this.state.longitude;
      }
      //console.log("##VALUE: " + data[item]);
    });
    var newArray = [this.state.measures, data]

    this.setState({measures:newArray});

    //return data;
  } 

  addMeasuresToState(body) {
    var x = [];
    //For the first 6 measures received do...
    for (let index = 0; index < 5; index++) {
      x[index] = body[index];
    }
    this.setState({measures: x});
    console.log(this.state.measures);
  }

  /*returns mean ny hours of daily co2 @todo: add the mean functionality*/ 
  getDailyDataByHourMean(){
    var a = [];
    if(this.state.measures==null){
      return [0,0,0,0,0,0];
    }
    for (let index = 0; index < 5; index++) {
      a[index] = this.state.measures[index].eco2;
    }
    return a;
  }

  componentDidMount(){
    const { params } = this.props.navigation.state;
    const token1 = params ? params.token : null;
    this.setState({token:token1});
    console.log("MOUNTING HISTORICAL DATA COMPONENT");
    var a = "https://polimi-dima-server.herokuapp.com/api/data/findByDate?startDate="
    var l = (this.today.year + '-' + this.today.month + '-' + this.today.day);
    var b = a.concat("2020-04-15","T00:00:00Z&endDate=","2020-04-15","T23:59:59Z");

    console.log("URL: "+b);
    this.retrieveDataByDate(b);
    
  }

  componentDidUpdate() {
    console.log("UPDATING");
  }

  handleChangeDate(){
    if(this.state.startDate!=''){   
        this.retrieveDataByDate(b);
      }
    }
  

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.headerRow}>
          <Text style={styles.airQualityHeader}>Air Quality</Text>

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
          <TouchableOpacity style={styles.button3}
            onPress={() => this.props.navigation.navigate("WeeklyReport")}>
            <Text style={styles.pm104}>Weekly report</Text>
            
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Daily Report</Text>
        <ScrollView>
            <DailyPath coordinatesSet = {this.coordinatesSet}/>
            <DisplayStats dailyData = {this.getDailyDataByHourMean()}/>
       </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
  retrieveDataBtn: {
    width: 80,
    height: 30,
    backgroundColor: "rgba(255,0,0,1)",
    marginLeft:10
  },
  viewMapLabel: {
    color: "rgba(255,255,255,1)",
    fontFamily: "roboto-regular",
    letterSpacing: 0,
    textAlign: "center",
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
    height: 40
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
button3: {
  width: 100,
  height: 40,
  backgroundColor: "rgba(230, 230, 230,1)"
},
});

export default Stats;