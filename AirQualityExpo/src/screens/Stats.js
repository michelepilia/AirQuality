import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { TextField } from 'react-native-material-textfield';
import DatePicker from 'react-native-datepicker';

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
    this.today={
      year: new Date().getFullYear(),
      month: new Date().getMonth()+1,
      day: new Date().getDate(),
    }
    this.urlDate = "https://polimi-dima-server.herokuapp.com/api/data/findByDate?startDate=2020-04-15T09:00:00Z&endDate=2020-04-16T23:00:00Z";
    this.url = "https://polimi-dima-server.herokuapp.com/api/data?offset=0&limit=1";
   // this.startDate = this.today;
   // this.endDate = this.today;
  }

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

  retrieveDataByDate(){
    return fetch(this.urlDate)
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

  componentDidMount(){
    const { params } = this.props.navigation.state;
    const token1 = params ? params.token : null;
    this.setState({token:token1});
    console.log("MOUNTING HISTORICAL DATA COMPONENT");
    
  }

  componentDidUpdate() {
    console.log("UPDATING")
    console.log("This.state.startDate = "+this.state.startDate);
    if(this.state.startDate!=''){
      console.log("This.state.endDate = "+this.state.endDate);
      if(this.state.endDate!='' && this.state.endDate>this.state.startDate){
        this.retrieveDataByDate();
      }
    }
  }

  render(){
    console.log("rendering HISTORICAL DATA COMPONENT");

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

        </View>

        <Text style={styles.title}>Historical Data</Text>


        <View 
          style={{
          marginTop:20,
          marginLeft: 20,
          }}>
          <Text >Get data by date</Text>
          <View style={{
            marginTop:10,
            flexDirection:"row",
            marginLeft:'auto',
            marginRight:'auto',

            }}>
            <DatePicker
              style={styles.dateInput}
              date={this.state.startDate}
              mode="date"
              placeholder="Start Date"
              format="YYYY-MM-DD"
              minDate={(this.today.year - 120)+"-01-01"}
              maxDate={(this.today.year + '-' + this.today.month + '-' + this.today.day)}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 35,
                  height:30,
                  width:70
                  
                }
              }}
              onDateChange={(date) => {this.setState({startDate: date})}}
            />
            <DatePicker
              style={styles.dateInput}
              date={this.state.endDate}
              mode="date"
              placeholder="End Date"
              format="YYYY-MM-DD"
              minDate={(this.today.year - 120)+"-01-01"}
              maxDate={(this.today.year + '-' + this.today.month + '-' + this.today.day)}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 35,
                  height:30,
                  width:70
                }
              }}
              onDateChange={(date) => {this.setState({endDate: date})}}
            />

          </View>
          

        </View>


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
 }
});

export default Stats;