import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image, ScrollView } from "react-native";
import * as Progress from 'react-native-progress';

const micron = "\u00b5"

class DataBars extends Component {

    render(){
        return(
            <ScrollView>
                <View style={styles.parameterBar}>
                <Text style={styles.parameterLabel}>Altitude: {this.props.data.altitude[0]} mt.</Text>
                <Progress.Bar progress={this.normalizeOutput(this.props.data.altitude[0], 
                                        this.props.data.altitude[1], this.props.data.altitude[2])} 
                                        width={270} color="red"/>
                <View style={styles.edgesContainer}>
                    <Text style={styles.minValue}>{this.props.data.altitude[1]}</Text>
                    <Text style={styles.maxValue}>{this.props.data.altitude[2]}</Text>
                </View>
                </View>

                <View style={styles.parameterBar}>
                <Text style={styles.parameterLabel}>Temperature: {this.props.data.temperature[0]}°</Text>
                <Progress.Bar progress={this.normalizeOutput(this.props.data.temperature[0], 
                                        this.props.data.temperature[1], this.props.data.temperature[2])} 
                                        width={270} color="red"/>
                <View style={styles.edgesContainer}>
                    <Text style={styles.minValue}>{this.props.data.temperature[1]}</Text>
                    <Text style={styles.maxValue}>{this.props.data.temperature[2]}</Text>
                </View> 
                </View>

                <View style={styles.parameterBar}>
                <Text style={styles.parameterLabel}>Humidity: {this.props.data.humidity[0]}%</Text>
                <Progress.Bar progress={this.normalizeOutput(this.props.data.humidity[0], 
                                        this.props.data.humidity[1], this.props.data.humidity[2])} 
                                        width={270} color="red"/>
                <View style={styles.edgesContainer}>
                    <Text style={styles.minValue}>{this.props.data.humidity[1]}</Text>
                    <Text style={styles.maxValue}>{this.props.data.humidity[2]}</Text>
                </View>
                </View>

                <View style={styles.parameterBar}>
                <Text style={styles.parameterLabel}>Pressure: {this.props.data.pressure[0]} hPa</Text>
                <Progress.Bar progress={this.normalizeOutput(this.props.data.pressure[0], 
                                        this.props.data.pressure[1], this.props.data.pressure[2])} 
                                        width={270} color="red"/>
                <View style={styles.edgesContainer}>
                    <Text style={styles.minValue}>{this.props.data.pressure[1]}</Text>
                    <Text style={styles.maxValue}>{this.props.data.pressure[2]}</Text>
                </View>
                </View>

                <View style={styles.parameterBar}>
                <Text style={styles.parameterLabel}>TVOCs: {this.props.data.tvocs[0]} ppb</Text>
                <Progress.Bar progress={this.normalizeOutput(this.props.data.tvocs[0], 
                                        this.props.data.tvocs[1], this.props.data.tvocs[2])} 
                                        width={270} color="red"/>
                <View style={styles.edgesContainer}>
                    <Text style={styles.minValue}>{this.props.data.tvocs[1]}</Text>
                    <Text style={styles.maxValue}>{this.props.data.tvocs[2]}</Text>
                </View>
                </View>

                <View style={styles.parameterBar}>
                <Text style={styles.parameterLabel}>CO<Text style={styles.pedex}>2</Text>: {this.props.data.eco2[0]} ppm</Text>
                <Progress.Bar progress={this.normalizeOutput(this.props.data.eco2[0], 
                                        this.props.data.eco2[1], this.props.data.eco2[2])} 
                                        width={270} color="red"/>
                <View style={styles.edgesContainer}>
                    <Text style={styles.minValue}>{this.props.data.eco2[1]}</Text>
                    <Text style={styles.maxValue}>{this.props.data.eco2[2]}</Text>
                </View>
                </View>

                <View style={styles.parameterBar}>
                <Text style={styles.parameterLabel}>PM<Text style={styles.pedex}>0.5</Text>: {this.props.data.pm05[0]} {micron}m</Text>
                <Progress.Bar progress={this.normalizeOutput(this.props.data.pm05[0], 
                                        this.props.data.pm05[1], this.props.data.pm05[2])} 
                                        width={270} color="red"/>
                <View style={styles.edgesContainer}>
                    <Text style={styles.minValue}>{this.props.data.pm05[1]}</Text>
                    <Text style={styles.maxValue}>{this.props.data.pm05[2]}</Text>
                </View>
                </View>

                <View style={styles.parameterBar}>
                <Text style={styles.parameterLabel}>PM<Text style={styles.pedex}>1</Text>: {this.props.data.pm1[0]} {micron}m</Text>
                <Progress.Bar progress={this.normalizeOutput(this.props.data.pm1[0], 
                                        this.props.data.pm1[1], this.props.data.pm1[2])} 
                                        width={270} color="red"/>
                <View style={styles.edgesContainer}>
                    <Text style={styles.minValue}>{this.props.data.pm1[1]}</Text>
                    <Text style={styles.maxValue}>{this.props.data.pm1[2]}</Text>
                </View>
                </View>

                <View style={styles.parameterBar}>
                <Text style={styles.parameterLabel}>PM<Text style={styles.pedex}>2.5</Text>: {this.props.data.pm25[0]} {micron}m</Text>
                <Progress.Bar progress={this.normalizeOutput(this.props.data.pm25[0], 
                                        this.props.data.pm25[1], this.props.data.pm25[2])} 
                                        width={270} color="red"/>
                <View style={styles.edgesContainer}>
                    <Text style={styles.minValue}>{this.props.data.pm25[1]}</Text>
                    <Text style={styles.maxValue}>{this.props.data.pm25[2]}</Text>
                </View>
                </View>

                <View style={styles.parameterBar}>
                <Text style={styles.parameterLabel}>PM<Text style={styles.pedex}>4</Text>: {this.props.data.pm4[0]} {micron}m</Text>
                <Progress.Bar progress={this.normalizeOutput(this.props.data.pm4[0], 
                                        this.props.data.pm4[1], this.props.data.pm4[2])} 
                                        width={270} color="red"/>
                <View style={styles.edgesContainer}>
                    <Text style={styles.minValue}>{this.props.data.pm4[1]}</Text>
                    <Text style={styles.maxValue}>{this.props.data.pm4[2]}</Text>
                </View>
                </View>

                <View style={styles.parameterBar}>
                <Text style={styles.parameterLabel}>PM<Text style={styles.pedex}>10</Text>: {this.props.data.pm10[0]} {micron}m</Text>
                <Progress.Bar progress={this.normalizeOutput(this.props.data.pm10[0], 
                                        this.props.data.pm10[1], this.props.data.pm10[2])} 
                                        width={270} color="red"/>
                <View style={styles.edgesContainer}>
                    <Text style={styles.minValue}>{this.props.data.pm10[1]}</Text>
                    <Text style={styles.maxValue}>{this.props.data.pm10[2]}</Text>
                </View>   

                </View>
            </ScrollView>

        );
    }
}

export default  DataBars;

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