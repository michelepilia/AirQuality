import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image, ScrollView,Dimensions } from "react-native";
import * as Progress from 'react-native-progress';
import ToggleSwitch from 'toggle-switch-react-native'
import * as Permissions from 'expo-permissions';


class DataBars extends Component {

    micron = "\u00b5"
    cube = "\u33a5"

    constructor(props){
        super(props);
       // console.log(this.props.sensorsData);
        if(!this.props.read){
        this.okSensors = [];
        this.props.sensorsData.forEach(element => {
          this.okSensors.push(parseInt(element.idsensore));
        });
        console.log(this.okSensors[0]);
        console.log(this.okSensors[1]);
      }

    }

    maxValues = {
        altitude:800,
        temperature:45,
        humidity:100,
        pressure:1035,
        tvocs:800,
        eco2:450,
        pm05:10,
        pm1:50,
        pm25:40,
        pm10:50,
        pm4:10

    }

    minValues = {
        altitude:0,
        temperature:-10,
        humidity:0,
        pressure:980,
        tvocs:100,
        eco2:150,
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
    getViewOfSensorsByStationId(stationId){
      //console.log(this.okSensors);

      let sensorsView = this.props.data2.filter((station)=>{
        return station.idstazione==stationId})
        .filter((sensor)=>{
          console.log(this.okSensors.includes(parseInt(sensor.idsensore)));
          return this.okSensors.includes(parseInt(sensor.idsensore));
        })
        .map((sensor) => {
          //console.log(sensor);
          let mean = this.computeMeanForSensor(sensor.idsensore);
          if(sensor.nometiposensore=="Ozono"){
            return <View key={sensor.idsensore}style={styles.parameterBar}>
                  <Text style={styles.parameterLabel}>{"Ozone"} [{sensor.unitamisura}]: {Number((mean).toFixed(this.cifreDecimali))}</Text>
                  <Progress.Bar progress={this.normalizeOutput(mean, 
                                          0, 120)} 
                                          width={this.barsWidth} color="red"/>
                  <View style={styles.edgesContainer}>
                      <Text style={styles.minValue}>{0}</Text>
                      <Text style={styles.maxValue}>{120}</Text>
                  </View>
              </View>
          }
          else if(sensor.nometiposensore=="Biossido di Zolfo") {
            return <View key={sensor.idsensore}style={styles.parameterBar}>
                  <Text style={styles.parameterLabel}>{"Sulfur Dioxide"} [{sensor.unitamisura}]: {Number((mean).toFixed(this.cifreDecimali))}</Text>
                  <Progress.Bar progress={this.normalizeOutput(mean, 
                                          0, 125)} 
                                          width={this.barsWidth} color="red"/>
                  <View style={styles.edgesContainer}>
                      <Text style={styles.minValue}>{0}</Text>
                      <Text style={styles.maxValue}>{125}</Text>
                  </View>
              </View>
          }
          else if(sensor.nometiposensore=="Biossido di Azoto") {
            return <View key={sensor.idsensore}style={styles.parameterBar}>
                  <Text style={styles.parameterLabel}>{"Nitrogen Dioxide"} [{sensor.unitamisura}]: {Number((mean).toFixed(this.cifreDecimali))}</Text>
                  <Progress.Bar progress={this.normalizeOutput(mean, 
                                          0, 200)} 
                                          width={this.barsWidth} color="red"/>
                  <View style={styles.edgesContainer}>
                      <Text style={styles.minValue}>{0}</Text>
                      <Text style={styles.maxValue}>{200}</Text>
                  </View>
              </View>
          }
          else if(sensor.nometiposensore=="Ossidi di Azoto") {
            return <View key={sensor.idsensore}style={styles.parameterBar}>
                  <Text style={styles.parameterLabel}>{"Nitrogen Oxides"} [{sensor.unitamisura}]: {Number((mean).toFixed(this.cifreDecimali))}</Text>
                  <Progress.Bar progress={this.normalizeOutput(mean, 
                                          0, 200)} 
                                          width={this.barsWidth} color="red"/>
                  <View style={styles.edgesContainer}>
                      <Text style={styles.minValue}>{0}</Text>
                      <Text style={styles.maxValue}>{200}</Text>
                  </View>
              </View>
          }
          else if(sensor.nometiposensore=="Monossido di Carbonio") {
            return <View key={sensor.idsensore}style={styles.parameterBar}>
                  <Text style={styles.parameterLabel}>{"Carbon monoxide"} [{sensor.unitamisura}]: {Number((mean).toFixed(this.cifreDecimali))}</Text>
                  <Progress.Bar progress={this.normalizeOutput(mean, 
                                          0, 10)} 
                                          width={this.barsWidth} color="red"/>
                  <View style={styles.edgesContainer}>
                      <Text style={styles.minValue}>{0}</Text>
                      <Text style={styles.maxValue}>{10}</Text>
                  </View>
              </View>
          }
          else if(sensor.nometiposensore=="Particelle sospese PM2.5") {
            return <View key={sensor.idsensore}style={styles.parameterBar}>
                  <Text style={styles.parameterLabel}>PM<Text style={styles.pedex}>2.5</Text> [{sensor.unitamisura}]: {Number((mean).toFixed(this.cifreDecimali))}</Text>
                  <Progress.Bar progress={this.normalizeOutput(mean, 
                                          0, 40)} 
                                          width={this.barsWidth} color="red"/>
                  <View style={styles.edgesContainer}>
                      <Text style={styles.minValue}>{0}</Text>
                      <Text style={styles.maxValue}>{40}</Text>
                  </View>
              </View>
          }
          else if(sensor.nometiposensore=="PM10 (SM2005)") {
            return <View key={sensor.idsensore}style={styles.parameterBar}>
                  <Text style={styles.parameterLabel}>PM<Text style={styles.pedex}>10</Text>  [{sensor.unitamisura}]: {Number((mean).toFixed(this.cifreDecimali))}</Text>
                  <Progress.Bar progress={this.normalizeOutput(mean, 
                                          0, 50)} 
                                          width={this.barsWidth} color="red"/>
                  <View style={styles.edgesContainer}>
                      <Text style={styles.minValue}>{0}</Text>
                      <Text style={styles.maxValue}>{50}</Text>
                  </View>
              </View>
          }
          else if(sensor.nometiposensore=="Ammoniaca") {
            return <View key={sensor.idsensore}style={styles.parameterBar}>
                  <Text style={styles.parameterLabel}>{"Ammonia"}  [{sensor.unitamisura}]: {Number((mean).toFixed(this.cifreDecimali))}</Text>
                  <Progress.Bar progress={this.normalizeOutput(mean, 
                                          0, 200)} 
                                          width={this.barsWidth} color="red"/>
                  <View style={styles.edgesContainer}>
                      <Text style={styles.minValue}>{0}</Text>
                      <Text style={styles.maxValue}>{200}</Text>
                  </View>
              </View>
          }
          else if(sensor.nometiposensore=="Benzene") {
            return <View key={sensor.idsensore}style={styles.parameterBar}>
                  <Text style={styles.parameterLabel}>{"Ammonia"}  [{sensor.unitamisura}]: {Number((mean).toFixed(this.cifreDecimali))}</Text>
                  <Progress.Bar progress={this.normalizeOutput(mean, 
                                          0, 5)} 
                                          width={this.barsWidth} color="red"/>
                  <View style={styles.edgesContainer}>
                      <Text style={styles.minValue}>{0}</Text>
                      <Text style={styles.maxValue}>{5}</Text>
                  </View>
              </View>
          }
          else if(sensor.nometiposensore=="BlackCarbon") {
            return <View key={sensor.idsensore}style={styles.parameterBar}>
                  <Text style={styles.parameterLabel}>{"Black Carbon"}  [{sensor.unitamisura}]: {Number((mean).toFixed(this.cifreDecimali))}</Text>
                  <Progress.Bar progress={this.normalizeOutput(mean, 
                                          0, 10)} 
                                          width={this.barsWidth} color="red"/>
                  <View style={styles.edgesContainer}>
                      <Text style={styles.minValue}>{0}</Text>
                      <Text style={styles.maxValue}>{10}</Text>
                  </View>
              </View>
          }

          else {
          return <View key={sensor.idsensore}style={styles.parameterBar}>
                  <Text style={styles.parameterLabel}>{sensor.nometiposensore} [{sensor.unitamisura}]: {Number((mean).toFixed(this.cifreDecimali))}</Text>
                  <Progress.Bar progress={this.normalizeOutput(mean, 
                                          0, 50)} 
                                          width={this.barsWidth} color="red"/>
                  <View style={styles.edgesContainer}>
                      <Text style={styles.minValue}>{0}</Text>
                      <Text style={styles.maxValue}>{80}</Text>
                  </View>
              </View>
          }
      })
      
      return sensorsView;
    }

    computeMeanForSensor(sensorId){
      let sum = 0;
      let correctSensorMeasures = this.props.sensorsData.filter((sensor)=>{return sensor.idsensore==sensorId});
      console.log("AAAAA#####");
      console.log(correctSensorMeasures);
      for (let index = 0; index < correctSensorMeasures.length; index++) {
        sum+=parseFloat(correctSensorMeasures[index].valore);
      }
      console.log(sum);
      console.log(correctSensorMeasures.length);
      return sum/correctSensorMeasures.length;
    }

    getLastSensorsMeasurements(sensorId){
      let b = this.props.data2.filter((sensor)=>sensor.idsensore==sensorId);
      let x = b.unitamisura;
      //console.log(b[0].unitamisura);
      let max ='0000-01-01T00:00:00Z';
      //maxData = max;
      
      let sensorsMeasurementsView = this.props.sensorsData.filter((sensor)=>{
        return sensor.idsensore==sensorId})
        .map((sensor) => {
        let time = JSON.stringify(sensor.data).replace("\"","-").replace('T','-').replace('Z','-');
        let a = time.substring(0,17);
        let a1=a.split('-');
        //console.log(a1);
        return <View key = {sensor.data} style={styles.measurementItem}>
                <Text>Time: {a1[3]+"/"+a1[2]+"/"+a1[1]+" "+a1[4]}</Text>
                <Text>Value <Text style={{fontSize:10}}>{[b[0].unitamisura]}</Text>: {sensor.valore}</Text>
                
                </View>
      })

      return sensorsMeasurementsView;

    }


  render(){
    //console.log(this.props.interestedData);
    if(this.props.showClusterInfo!=-1){
      return(
          <View>
          <ScrollView style={styles.scrollView} width={this.width}>
              <View style={styles.parameterBar}>
                  <Text style={styles.parameterLabel}>Altitude [mt]: {Number((this.props.data.altitude).toFixed(this.cifreDecimali))}</Text>
                  <Progress.Bar progress={this.normalizeOutput(this.props.data.altitude, 
                                          this.minValues.altitude, this.maxValues.altitude)} 
                                          width={this.barsWidth} color="red"/>
                  <View style={styles.edgesContainer}>
                      <Text style={styles.minValue}>{this.minValues.altitude}</Text>
                      <Text style={styles.maxValue}>{this.maxValues.altitude}</Text>
                  </View>
              </View>
              <View style={styles.parameterBar}>
                  <Text style={styles.parameterLabel}>Temperature [°C]: {Number((this.props.data.temperature).toFixed(this.cifreDecimali))}</Text>
                  <Progress.Bar progress={this.normalizeOutput(this.props.data.temperature, 
                                          this.minValues.temperature, this.maxValues.temperature)} 
                                          width={this.barsWidth} color="red"/>
                  <View style={styles.edgesContainer}>
                      <Text style={styles.minValue}>{this.minValues.temperature}</Text>
                      <Text style={styles.maxValue}>{this.maxValues.temperature}</Text>
                  </View> 
              </View>
              <View style={styles.parameterBar}>
                  <Text style={styles.parameterLabel}>Humidity [%]: {Number((this.props.data.humidity).toFixed(this.cifreDecimali))}</Text>
                  <Progress.Bar progress={this.normalizeOutput(this.props.data.humidity, 
                                          this.minValues.humidity, this.maxValues.humidity)} 
                                          width={this.barsWidth} color="red"/>
                  <View style={styles.edgesContainer}>
                      <Text style={styles.minValue}>{this.minValues.humidity}</Text>
                      <Text style={styles.maxValue}>{this.maxValues.humidity}</Text>
                  </View>
              </View>
              <View style={styles.parameterBar}>
                  <Text style={styles.parameterLabel}>Pressure [hPa]: {Number((this.props.data.pressure/100).toFixed(this.cifreDecimali))}</Text>
                  <Progress.Bar progress={this.normalizeOutput(this.props.data.pressure, 
                                          this.minValues.pressure, this.maxValues.pressure)} 
                                          width={this.barsWidth} color="red"/>
                  <View style={styles.edgesContainer}>
                      <Text style={styles.minValue}>{this.minValues.pressure}</Text>
                      <Text style={styles.maxValue}>{this.maxValues.pressure}</Text>
                  </View>
              </View>
              <View style={styles.parameterBar}>
                  <Text style={styles.parameterLabel}>TVOCs [ppb]: {Number((this.props.data.tvocs).toFixed(this.cifreDecimali))}</Text>
                  <Progress.Bar progress={this.normalizeOutput(this.props.data.tvocs, 
                                          this.minValues.tvocs, this.maxValues.tvocs)} 
                                          width={this.barsWidth} color="red"/>
                  <View style={styles.edgesContainer}>
                      <Text style={styles.minValue}>{this.minValues.tvocs}</Text>
                      <Text style={styles.maxValue}>{this.maxValues.tvocs}</Text>
                  </View>
              </View>
              <View style={styles.parameterBar}>
                  <Text style={styles.parameterLabel}>CO<Text style={styles.pedex}>2</Text> [ppm]: {Number((this.props.data.eco2).toFixed(this.cifreDecimali))}</Text>
                  <Progress.Bar progress={this.normalizeOutput(this.props.data.eco2, 
                                          this.minValues.eco2, this.maxValues.eco2)} 
                                          width={this.barsWidth} color="red"/>
                  <View style={styles.edgesContainer}>
                      <Text style={styles.minValue}>{this.minValues.eco2}</Text>
                      <Text style={styles.maxValue}>{this.maxValues.eco2}</Text>
                  </View>
              </View>
              <View style={styles.parameterBar}>
                  <Text style={styles.parameterLabel}>PM<Text style={styles.pedex}>0.5</Text> [{this.micron}g/{this.cube}]: {Number((this.props.data.pm05).toFixed(this.cifreDecimali))}</Text>
                  <Progress.Bar progress={this.normalizeOutput(this.props.data.pm05, 
                                          this.minValues.pm05, this.maxValues.pm05)} 
                                          width={this.barsWidth} color="red"/>
                  <View style={styles.edgesContainer}>
                      <Text style={styles.minValue}>{this.minValues.pm05}</Text>
                      <Text style={styles.maxValue}>{this.maxValues.pm05}</Text>
                  </View>
              </View>
              <View style={styles.parameterBar}>
                  <Text style={styles.parameterLabel}>PM<Text style={styles.pedex}>1</Text> [{this.micron}g/{this.cube}]: {Number((this.props.data.pm1).toFixed(this.cifreDecimali))}</Text>
                  <Progress.Bar progress={this.normalizeOutput(this.props.data.pm1, 
                                          this.minValues.pm1, this.maxValues.pm1)} 
                                          width={this.barsWidth} color="red"/>
                  <View style={styles.edgesContainer}>
                      <Text style={styles.minValue}>{this.minValues.pm1}</Text>
                      <Text style={styles.maxValue}>{this.maxValues.pm1}</Text>
                  </View>
              </View>

              <View style={styles.parameterBar}>
                  <Text style={styles.parameterLabel}>PM<Text style={styles.pedex}>2.5</Text> [{this.micron}g/{this.cube}]: {Number((this.props.data.pm25).toFixed(this.cifreDecimali))}</Text>
                  <Progress.Bar progress={this.normalizeOutput(this.props.data.pm25, 
                                          this.minValues.pm25, this.maxValues.pm25)} 
                                          width={this.barsWidth} color="red"/>
                  <View style={styles.edgesContainer}>
                      <Text style={styles.minValue}>{this.minValues.pm25}</Text>
                      <Text style={styles.maxValue}>{this.maxValues.pm25}</Text>
                  </View>
              </View>

              <View style={styles.parameterBar}>
                  <Text style={styles.parameterLabel}>PM<Text style={styles.pedex}>4</Text> [{this.micron}g/{this.cube}]: {Number((this.props.data.pm4).toFixed(this.cifreDecimali))}</Text>
                  <Progress.Bar progress={this.normalizeOutput(this.props.data.pm4, 
                                          this.minValues.pm4, this.maxValues.pm4)} 
                                          width={this.barsWidth} color="red"/>
                  <View style={styles.edgesContainer}>
                      <Text style={styles.minValue}>{this.minValues.pm4}</Text>
                      <Text style={styles.maxValue}>{this.maxValues.pm4}</Text>
                  </View>
              </View>

              <View style={styles.parameterBar}>
                  <Text style={styles.parameterLabel}>PM<Text style={styles.pedex}>10</Text> [{this.micron}g/{this.cube}]: {Number((this.props.data.pm10).toFixed(this.cifreDecimali))}</Text>
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
    else if(this.props.isArpaStation){
      //console.log("HEY SARTIZS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      let stationsText =  this.props.interestedData.filter((element)=>element.stationId==this.props.showArpaInfo).map((element) => {
        return  <View key = {element.stationId} style={styles.stationItem}>
                  <Text style={{marginTop:5, marginLeft:'auto',marginRight:'auto', fontSize:24}}>{element.sensors[0].stationName}</Text>
                  {this.getViewOfSensorsByStationId(element.stationId)}
                </View>
      });
      return(stationsText);
    }
    else {
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
      fontSize: 28,
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
      backgroundColor:'rgba(255,100,50,0.2)',
      marginBottom:20,
      marginLeft:'auto',
      marginRight:'auto',
      width:this.width,
  },
  measurementItem: {
    flex:1,
    marginLeft:25,
    padding:2,
    marginTop:5,

  },
  });