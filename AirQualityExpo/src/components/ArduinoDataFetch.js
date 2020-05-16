import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from "react-native";
import MapView from 'react-native-maps';

class ArduinoData extends Component{


    today={
        year: new Date().getFullYear(),
        month: new Date().getMonth()+1,
        day: new Date().getDate(),
        };

    data = [];
      

    
    retrieveDataByDate(url, callback){
      fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        data = responseJson;
        //console.log(data);
        callback(data);
       })
      .catch((error) => {
      console.error(error);
      callback([]);
      });
    }

  addOneMeasureToState(body){

    var string1 = body;
    string1.concat(";",this.state.latitude,";",this.state.longitude);
    this.body1.data = string1;

    data = {
      temperature: 25.0, 
      humidity: 75.0,
      pressure: 11.0,
      altitude: 144, 
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

    let array = body.split(';');
    var keys = Object.keys(data);
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
    });
    var newArray = [this.state.measures, data]
    } 

  addMeasuresToState(body) {
    var x = [];
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

  getData() {
    return this.data;
  }


}

export default ArduinoData;