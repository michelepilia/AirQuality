import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image, ScrollView,Dimensions } from "react-native";
import * as Progress from 'react-native-progress';


class DataBarsRealTime extends Component {

    micron = "\u00b5"
    cube = "\u33a5"

    constructor(props){
        super(props);
    }

    maxValues = {
        altitude:800,
        temperature:45,
        humidity:100,
        pressure:1035,
        tvocs:800,
        eco2:4500,
        pm05:10,
        pm1:10,
        pm25:10,
        pm10:10,
        pm4:10

    }

    minValues = {
        altitude:0,
        temperature:-10,
        humidity:0,
        pressure:980,
        tvocs:100,
        eco2:2500,
        pm05:0,
        pm1:0,
        pm25:0,
        pm10:0,
        pm4:0
    }

    cifreDecimali = 2;

    width = Dimensions.get('window').width - 50;
    barsWidth= this.width-35;

    normalizeOutput(value, xmin, xmax){
        return ((value-xmin)/(xmax-xmin));
    }


  render(){
    return(
        <View>
        <ScrollView style={styles.scrollView} width={this.width}>
            <View style={styles.parameterBar}>
                <Text style={styles.parameterLabel}>Altitude [mt]: {this.props.data.altitude}</Text>
                <Progress.Bar progress={this.normalizeOutput(this.props.data.altitude, 
                                        this.minValues.altitude, this.maxValues.altitude)} 
                                        width={this.barsWidth} color="red"/>
                <View style={styles.edgesContainer}>
                    <Text style={styles.minValue}>{this.minValues.altitude}</Text>
                    <Text style={styles.maxValue}>{this.maxValues.altitude}</Text>
                </View>
            </View>
            <View style={styles.parameterBar}>
                <Text style={styles.parameterLabel}>Temperature [°C]: {this.props.data.temperature}</Text>
                <Progress.Bar progress={this.normalizeOutput(this.props.data.temperature, 
                                        this.minValues.temperature, this.maxValues.temperature)} 
                                        width={this.barsWidth} color="red"/>
                <View style={styles.edgesContainer}>
                    <Text style={styles.minValue}>{this.minValues.temperature}</Text>
                    <Text style={styles.maxValue}>{this.maxValues.temperature}</Text>
                </View> 
            </View>
            <View style={styles.parameterBar}>
                <Text style={styles.parameterLabel}>Humidity [%]: {(this.props.data.humidity)}</Text>
                <Progress.Bar progress={this.normalizeOutput(this.props.data.humidity, 
                                        this.minValues.humidity, this.maxValues.humidity)} 
                                        width={this.barsWidth} color="red"/>
                <View style={styles.edgesContainer}>
                    <Text style={styles.minValue}>{this.minValues.humidity}</Text>
                    <Text style={styles.maxValue}>{this.maxValues.humidity}</Text>
                </View>
            </View>
            <View style={styles.parameterBar}>
                <Text style={styles.parameterLabel}>Pressure [hPa]: {this.props.data.pressure/100}</Text>
                <Progress.Bar progress={this.normalizeOutput(this.props.data.pressure, 
                                        this.minValues.pressure, this.maxValues.pressure)} 
                                        width={this.barsWidth} color="red"/>
                <View style={styles.edgesContainer}>
                    <Text style={styles.minValue}>{this.minValues.pressure}</Text>
                    <Text style={styles.mediumMaxValue}>{this.maxValues.pressure}</Text>
                </View>
            </View>
            <View style={styles.parameterBar}>
                <Text style={styles.parameterLabel}>TVOCs [ppb]: {this.props.data.tvocs}</Text>
                <Progress.Bar progress={this.normalizeOutput(this.props.data.tvocs, 
                                        this.minValues.tvocs, this.maxValues.tvocs)} 
                                        width={this.barsWidth} color="red"/>
                <View style={styles.edgesContainer}>
                    <Text style={styles.minValue}>{this.minValues.tvocs}</Text>
                    <Text style={styles.mediumMaxValue}>{this.maxValues.tvocs}</Text>
                </View>
            </View>
            <View style={styles.parameterBar}>
                <Text style={styles.parameterLabel}>CO<Text style={styles.pedex}>2</Text> [ppm]: {this.props.data.eco2}</Text>
                <Progress.Bar progress={this.normalizeOutput(this.props.data.eco2, 
                                        this.minValues.eco2, this.maxValues.eco2)} 
                                        width={this.barsWidth} color="red"/>
                <View style={styles.edgesContainer}>
                    <Text style={styles.minValue}>{this.minValues.eco2}</Text>
                    <Text style={styles.largeMaxValue}>{this.maxValues.eco2}</Text>
                </View>
            </View>
            <View style={styles.parameterBar}>
                <Text style={styles.parameterLabel}>PM<Text style={styles.pedex}>0.5</Text> [{this.micron}g/{this.cube}]: {this.props.data.pm05}</Text>
                <Progress.Bar progress={this.normalizeOutput(this.props.data.pm05, 
                                        this.minValues.pm05, this.maxValues.pm05)} 
                                        width={this.barsWidth} color="red"/>
                <View style={styles.edgesContainer}>
                    <Text style={styles.minValue}>{this.minValues.pm05}</Text>
                    <Text style={styles.maxValue}>{this.maxValues.pm05}</Text>
                </View>
            </View>
            <View style={styles.parameterBar}>
                <Text style={styles.parameterLabel}>PM<Text style={styles.pedex}>1</Text> [{this.micron}g/{this.cube}]: {this.props.data.pm1}</Text>
                <Progress.Bar progress={this.normalizeOutput(this.props.data.pm1, 
                                        this.minValues.pm1, this.maxValues.pm1)} 
                                        width={this.barsWidth} color="red"/>
                <View style={styles.edgesContainer}>
                    <Text style={styles.minValue}>{this.minValues.pm1}</Text>
                    <Text style={styles.maxValue}>{this.maxValues.pm1}</Text>
                </View>
            </View>

            <View style={styles.parameterBar}>
                <Text style={styles.parameterLabel}>PM<Text style={styles.pedex}>2.5</Text> [{this.micron}g/{this.cube}]: {this.props.data.pm25}</Text>
                <Progress.Bar progress={this.normalizeOutput(this.props.data.pm25, 
                                        this.minValues.pm25, this.maxValues.pm25)} 
                                        width={this.barsWidth} color="red"/>
                <View style={styles.edgesContainer}>
                    <Text style={styles.minValue}>{this.minValues.pm25}</Text>
                    <Text style={styles.maxValue}>{this.maxValues.pm25}</Text>
                </View>
            </View>

            <View style={styles.parameterBar}>
                <Text style={styles.parameterLabel}>PM<Text style={styles.pedex}>4</Text> [{this.micron}g/{this.cube}]: {this.props.data.pm4}</Text>
                <Progress.Bar progress={this.normalizeOutput(this.props.data.pm4, 
                                        this.minValues.pm4, this.maxValues.pm4)} 
                                        width={this.barsWidth} color="red"/>
                <View style={styles.edgesContainer}>
                    <Text style={styles.minValue}>{this.minValues.pm4}</Text>
                    <Text style={styles.maxValue}>{this.maxValues.pm4}</Text>
                </View>
            </View>

            <View style={styles.parameterBar}>
                <Text style={styles.parameterLabel}>PM<Text style={styles.pedex}>10</Text> [{this.micron}g/{this.cube}]: {this.props.data.pm10}</Text>
                <Progress.Bar progress={this.normalizeOutput(this.props.data.pm10, 
                                        this.minValues.pm10, this.maxValues.pm10)} 
                                        width={this.barsWidth} color="red"/>
                <View style={styles.edgesContainer}>
                    <Text style={styles.minValue}>{this.minValues.pm10}</Text>
                    <Text style={styles.maxValue}>{this.maxValues.pm10}</Text>
                </View>   
            </View>          
        </ScrollView>
        </View>

      );
  }
}

export default DataBarsRealTime;



const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    rect: {
      display: "flex",
      flexDirection: "column",
      width: 'auto',
      height: 530,
      backgroundColor: "rgba(255,100,50,0.2)",
      marginTop: 20,
      marginLeft: 30,
      marginRight: 30,
      padding: 20
    },
    scrollView:{
        marginLeft:'auto',
        marginTop:20,
        padding:10,
        marginRight:'auto',
        backgroundColor:'rgba(255,100,50,0.2)',
        marginBottom:20,
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
      marginRight: 10,
      marginLeft:'auto',
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
      marginBottom: 5,
      marginLeft:'auto',
      marginRight:'auto',
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
    apex:{
      fontSize:10,
      lineHeight:5,
    },
    minValue:{
      marginLeft: 0,
    },
    maxValue:{
      marginLeft:'auto',
      textAlign:'right',
      marginRight:5,
    },
    mediumMaxValue:{
      marginLeft:245,
    },
    largeMaxValue:{
      marginLeft:235,
    },
    edgesContainer:{
      display: "flex",
      flexDirection: "row",
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
    },
    sensorItem: {
      flex: 1,
      marginTop:15,
      fontSize:13
    },
    stationItem: {
      flex: 1,
      marginTop:30,
      padding: 15,
      fontSize: 14,
      backgroundColor:'rgba(255,100,50,0.6)',
  },
  measurementItem: {
    flex:1,
    marginLeft:25,
    padding:2,
    marginTop:5,

  },
  });