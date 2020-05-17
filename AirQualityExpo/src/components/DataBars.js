import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image, ScrollView } from "react-native";
import * as Progress from 'react-native-progress';
import ToggleSwitch from 'toggle-switch-react-native'
import * as Permissions from 'expo-permissions';


class DataBars extends Component {

    micron = "\u00b5"

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

    normalizeOutput(value, xmin, xmax){
        return ((value-xmin)/(xmax-xmin));
    }


    render(){
        if(this.props.showClusterInfo!=-1){
            console.log(this.props.data);
        return(
            <View>
            <ScrollView style={styles.scrollView}>
                <View style={styles.parameterBar}>
                    <Text style={styles.parameterLabel}>Altitude: {this.props.data.altitude} mt.</Text>
                    <Progress.Bar progress={this.normalizeOutput(this.props.data.altitude, 
                                            this.minValues.altitude, this.maxValues.altitude)} 
                                            width={270} color="red"/>
                    <View style={styles.edgesContainer}>
                        <Text style={styles.minValue}>{this.minValues.altitude}</Text>
                        <Text style={styles.maxValue}>{this.maxValues.altitude}</Text>
                    </View>
                </View>
                <View style={styles.parameterBar}>
                    <Text style={styles.parameterLabel}>Temperature: {this.props.data.temperature}°</Text>
                    <Progress.Bar progress={this.normalizeOutput(this.props.data.temperature, 
                                            this.minValues.temperature, this.maxValues.temperature)} 
                                            width={270} color="red"/>
                    <View style={styles.edgesContainer}>
                        <Text style={styles.minValue}>{this.minValues.temperature}</Text>
                        <Text style={styles.maxValue}>{this.maxValues.temperature}</Text>
                    </View> 
                </View>
                <View style={styles.parameterBar}>
                    <Text style={styles.parameterLabel}>Humidity: {this.props.data.humidity}%</Text>
                    <Progress.Bar progress={this.normalizeOutput(this.props.data.humidity, 
                                            this.minValues.humidity, this.maxValues.humidity)} 
                                            width={270} color="red"/>
                    <View style={styles.edgesContainer}>
                        <Text style={styles.minValue}>{this.minValues.humidity}</Text>
                        <Text style={styles.maxValue}>{this.maxValues.humidity}</Text>
                    </View>
                </View>
                <View style={styles.parameterBar}>
                    <Text style={styles.parameterLabel}>Pressure: {this.props.data.pressure} hPa</Text>
                    <Progress.Bar progress={this.normalizeOutput(this.props.data.pressure, 
                                            this.minValues.pressure, this.maxValues.pressure)} 
                                            width={270} color="red"/>
                    <View style={styles.edgesContainer}>
                        <Text style={styles.minValue}>{this.minValues.pressure}</Text>
                        <Text style={styles.maxValue}>{this.maxValues.pressure}</Text>
                    </View>
                </View>
                <View style={styles.parameterBar}>
                    <Text style={styles.parameterLabel}>TVOCs: {this.props.data.tvocs} ppb</Text>
                    <Progress.Bar progress={this.normalizeOutput(this.props.data.tvocs, 
                                            this.minValues.tvocs, this.maxValues.tvocs)} 
                                            width={270} color="red"/>
                    <View style={styles.edgesContainer}>
                        <Text style={styles.minValue}>{this.minValues.tvocs}</Text>
                        <Text style={styles.maxValue}>{this.maxValues.tvocs}</Text>
                    </View>
                </View>
                <View style={styles.parameterBar}>
                    <Text style={styles.parameterLabel}>CO<Text style={styles.pedex}>2</Text>: {this.props.data.eco2} ppm</Text>
                    <Progress.Bar progress={this.normalizeOutput(this.props.data.eco2, 
                                            this.minValues.eco2, this.maxValues.eco2)} 
                                            width={270} color="red"/>
                    <View style={styles.edgesContainer}>
                        <Text style={styles.minValue}>{this.minValues.eco2}</Text>
                        <Text style={styles.maxValue}>{this.maxValues.eco2}</Text>
                    </View>
                </View>
                <View style={styles.parameterBar}>
                    <Text style={styles.parameterLabel}>PM<Text style={styles.pedex}>0.5</Text>: {this.props.data.pm05} {this.micron}m</Text>
                    <Progress.Bar progress={this.normalizeOutput(this.props.data.pm05, 
                                            this.minValues.pm05, this.maxValues.pm05)} 
                                            width={270} color="red"/>
                    <View style={styles.edgesContainer}>
                        <Text style={styles.minValue}>{this.minValues.pm05}</Text>
                        <Text style={styles.maxValue}>{this.maxValues.pm05}</Text>
                    </View>
                </View>
                <View style={styles.parameterBar}>
                    <Text style={styles.parameterLabel}>PM<Text style={styles.pedex}>1</Text>: {this.props.data.pm1} {this.micron}m</Text>
                    <Progress.Bar progress={this.normalizeOutput(this.props.data.pm1, 
                                            this.minValues.pm1, this.maxValues.pm1)} 
                                            width={270} color="red"/>
                    <View style={styles.edgesContainer}>
                        <Text style={styles.minValue}>{this.minValues.pm1}</Text>
                        <Text style={styles.maxValue}>{this.maxValues.pm1}</Text>
                    </View>
                </View>

                <View style={styles.parameterBar}>
                    <Text style={styles.parameterLabel}>PM<Text style={styles.pedex}>2.5</Text>: {this.props.data.pm25} {this.micron}m</Text>
                    <Progress.Bar progress={this.normalizeOutput(this.props.data.pm25, 
                                            this.minValues.pm25, this.maxValues.pm25)} 
                                            width={270} color="red"/>
                    <View style={styles.edgesContainer}>
                        <Text style={styles.minValue}>{this.minValues.pm25}</Text>
                        <Text style={styles.maxValue}>{this.maxValues.pm25}</Text>
                    </View>
                </View>

                <View style={styles.parameterBar}>
                    <Text style={styles.parameterLabel}>PM<Text style={styles.pedex}>4</Text>: {this.props.data.pm4} {this.micron}m</Text>
                    <Progress.Bar progress={this.normalizeOutput(this.props.data.pm4, 
                                            this.minValues.pm4, this.maxValues.pm4)} 
                                            width={270} color="red"/>
                    <View style={styles.edgesContainer}>
                        <Text style={styles.minValue}>{this.minValues.pm4}</Text>
                        <Text style={styles.maxValue}>{this.maxValues.pm4}</Text>
                    </View>
                </View>

                <View style={styles.parameterBar}>
                    <Text style={styles.parameterLabel}>PM<Text style={styles.pedex}>10</Text>: {this.props.data.pm10} {this.micron}m</Text>
                    <Progress.Bar progress={this.normalizeOutput(this.props.data.pm10, 
                                            this.minValues.pm10, this.maxValues.pm10)} 
                                            width={270} color="red"/>
                    <View style={styles.edgesContainer}>
                        <Text style={styles.minValue}>{this.minValues.pm10}</Text>
                        <Text style={styles.maxValue}>{this.maxValues.pm10}</Text>
                    </View>   
                </View>

                

                

            </ScrollView>
            </View>

        );
        }
        
        else{
            return(<View></View>);
        }
    }
}

export default DataBars;



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
    scrollView:{
        marginLeft:'auto',
        marginTop:45,
        padding:10,
        marginRight:'auto',
        backgroundColor:'rgba(255,100,50,0.1)',
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