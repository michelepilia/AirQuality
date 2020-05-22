import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator,Dimensions } from "react-native";
import { isLoading } from "expo-font";
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import {Circle} from 'react-native-maps';
import ArduinoDataFetch from "../components/ArduinoDataFetch";
import * as Permissions from 'expo-permissions';
import DataBars from "../components/DataBars";
import DatePicker from 'react-native-datepicker';


class Historical extends Component{

    constructor(props){
        super(props);
        this.state = {
            arpaStations : [],
            isLoading : true,
            isLoadingGps:true,
            mapRegion: {
              latitude:      45.47,
              longitude:      9.22,
              latitudeDelta:  0.0922*1.5,
              longitudeDelta: 0.0421*1.5
            },
            latlng: {
              latitude: 45.475,
              longitude: 9.22
            },
            followUserLocation: true,
            showsUserLocation: true,
            data : [],
            interestedData : [],
            sensorsData: [],
            arduinoData: [],
            clusters:[],
            meanValues: [],
            showClusterInfo: -1,
            isArpaStation: false,
            showArpaInfo:-1,
            startDate: '',
            endDate: '',
            token: '',
        }

        this.today={
          year: new Date().getFullYear(),
          month: new Date().getMonth()+1,
          day: new Date().getDate(),
        }
        this.minDate = this.today;


        let a = "0";
        if(this.today.month<10){
          a = "0"+this.today.month;
        }
        else{
          a=this.today.month;
        }
        
        this.todayUrlRequest="https://polimi-dima-server.herokuapp.com/api/data/findByDate?startDate="+this.today.year+"-"+a+"-"+(this.today.day)+"T00:00:00Z&endDate="
          +this.today.year+"-"+a+"-"+this.today.day+"T23:59:59Z";

          //console.log(this.todayUrlRequest);

        this.retrieveArpaStationsData.bind(this);
        this.retrieveArpaSensorsData.bind(this);
        this.elaborateData.bind(this);
        this.alreadyInCollection.bind(this);
        this.addSensorsInfoToStation.bind(this);
        this.getViewOfSensorsByStationId.bind(this);
        this.getLastSensorsMeasurements.bind(this);
        this.elaborateArduinoData.bind(this);
        this.isInsideCluster.bind(this);
        this.computeDistance.bind(this);
        this.computeMeansForCluster.bind(this);
        this.computeMeansForAllClusters.bind(this);
        this.handleChangeDate.bind(this);
        this.elaborateMinDate.bind(this);
        this.componentCleanUp.bind(this);
        this.logoutFunction.bind(this);
    
    }

    componentCleanUp(){
      console.log("Cleaning");
      //this.focusListener.remove();
    }

    arduinoDataFetch = new ArduinoDataFetch();
    nearestClusterId = 0;
    defaultClusterRadius = 250;

    elaborateMinDate(){
      var myCurrentDate=new Date();
      var myPastDate=new Date(myCurrentDate);
      myPastDate.setDate(myPastDate.getDate() - 14);//myPastDate is now 8 days in the past
      let a=JSON.stringify(myPastDate).replace('T','-').replace("\"",'-').split('-');
      let b = a[1] + '-' +a[2]  +'-' + a[3];
      //console.log(b);
      return b;
    }

    subtractDaysFromToday(days){
      var myCurrentDate=new Date();
      var myPastDate=new Date(myCurrentDate);
      myPastDate.setDate(myPastDate.getDate() - days);//myPastDate is now 8 days in the past
      let a=JSON.stringify(myPastDate).replace('T','-').replace("\"",'-').split('-');
      let b = a[3]+'/'+a[2] + '/' +a[1]; 
      return b;
    }

    elaborateArduinoData(){
    
      let clusters = [];
      //for each received measure see wheter it is near (200 meter radius) an existing clusters, 
      //if yes -> add this measure to the CORRECT cluster
      //else -> create a new cluster with position of the new measure
      this.state.arduinoData.forEach((element)=>{
        if(this.isInsideCluster({latitude:element.latitude, longitude:element.longitude},clusters)){
          clusters[this.nearestClusterId].measures.push(element);
        }
        else{
          let newCluster = {
            position: {
              latitude: element.latitude,
              longitude: element.longitude,
            },
            id: clusters.length,
            measures: [element],
            meanValues: [],
            radius:this.defaultClusterRadius,
          };
          clusters.push(newCluster);
        }
      })
      this.setState({clusters:clusters});
      this.computeMeansForAllClusters();
    }

    isInsideCluster(position, clusters){
      let minDistance = 999999;
      let clusterId = 0;
      let isTrue = false;
      //console.log("ENTERED IN INSIDE CLUSTER FUNCTION");
      clusters.forEach((cluster)=>{
      let distance = this.computeDistance(cluster.position,position);
        //console.log("COMPUTED DISTANCE: "+distance);

        if(distance<=this.defaultClusterRadius){
          //console.log("IS INSIDE A CLUSTER: "+ clusterId);
          if(distance<=minDistance){
            minDistance = distance;
            this.nearestClusterId = clusterId;
            isTrue = true;
          }
        }
        //console.log("IS OUTSIDE A CLUSTER");
        clusterId++;
      })
      return isTrue;
      
    }

    //Haversine formula
    computeDistance(position1, position2) {
      const R = 6371e3; 
      let lat1 = position1.latitude;
      let lat2 = position2.latitude;
      let lon1 = position1.longitude;
      let lon2 = position2.longitude;
      const φ1 = lat1 * Math.PI/180;
      const φ2 = lat2 * Math.PI/180;
      const Δφ = (lat2-lat1) * Math.PI/180;
      const Δλ = (lon2-lon1) * Math.PI/180;
      const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
      const d = R * c;
      return d;
    }

    computeMeansForAllClusters(){
      let meanValues = [];
      this.state.clusters.forEach((cluster)=>{
        let meanValueToAdd = this.computeMeansForCluster(cluster);
        meanValues.push(meanValueToAdd);
      })
      this.setState({meanValues:meanValues});
      //console.log(this.state.clusters);
      //console.log(this.state.meanValues);
    }

    computeMeansForCluster(cluster){
      
      
      let meanValues = {
        altitude: 0,
        eco2: 0,
        humidity: 0,
        pm05: 0,
        pm1: 0,
        pm10: 0,
        pm25: 0,
        pm4: 0,
        pressure: 0,
        temperature: 0,
        tvocs: 0,
        clusterId: cluster.id,
      }

      cluster.measures.forEach((measure)=>{
        meanValues.altitude+=measure.altitude;
      })
      meanValues.altitude/=cluster.measures.length;

      cluster.measures.forEach((measure)=>{
        meanValues.eco2+=measure.eco2;
      })
      meanValues.eco2/=cluster.measures.length;

      cluster.measures.forEach((measure)=>{
        meanValues.humidity+=measure.humidity;
      })
      meanValues.humidity/=cluster.measures.length;

      cluster.measures.forEach((measure)=>{
        meanValues.pm05+=measure.pm05;
      })
      meanValues.pm05/=cluster.measures.length;

      cluster.measures.forEach((measure)=>{
        meanValues.pm1+=measure.pm1;
      })
      meanValues.pm1/=cluster.measures.length;

      cluster.measures.forEach((measure)=>{
        meanValues.pm10+=measure.pm10;
      })
      meanValues.pm10/=cluster.measures.length;

      cluster.measures.forEach((measure)=>{
        meanValues.pm25+=measure.pm25;
      })
      meanValues.pm25/=cluster.measures.length;

      cluster.measures.forEach((measure)=>{
        meanValues.pm4+=measure.pm4;
      })
      meanValues.pm4/=cluster.measures.length;

      cluster.measures.forEach((measure)=>{
        meanValues.pressure+=measure.pressure;
      })
      meanValues.pressure/=cluster.measures.length;

      cluster.measures.forEach((measure)=>{
        meanValues.temperature+=measure.temperature;
      })
      meanValues.temperature/=cluster.measures.length;

      cluster.measures.forEach((measure)=>{
        meanValues.tvocs+=measure.tvocs;
      })
      meanValues.tvocs/=cluster.measures.length;

      return meanValues;

    }

    retrieveArpaStationsData(url){

        return fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            //console.log(responseJson);
            this.setState({
                //isLoading: false,
                data: responseJson.filter( (station) => station.comune =="Milano").filter((station) => station.datastop==null)
            })
            this.elaborateData();
            //console.log(this.state.data);
        })
        .then(this.retrieveArpaSensorsData("https://www.dati.lombardia.it/resource/nicp-bhqi.json"))
        .catch((error) => {
            console.error(error);
        });
    }

    retrieveArpaSensorsData(url){

      return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
          //console.log(responseJson);
          this.setState({
              isLoading: false,
              sensorsData: responseJson.filter( (sensor) => sensor.stato =="VA"),
          })
          this.elaborateData();
         // console.log(this.state.sensorsData);
      })
      .catch((error) => {
          console.error(error);
      });
  }

    alreadyInCollection(consideredStationId){
        for (let index = 0; index < this.state.interestedData.length; index++) {
            if(this.state.interestedData[index].idstazione==consideredStationId){
                return true;
            }
        }
        return false;
    }

    elaborateData(){
      
      var stations = [];
      for (let index = 0; index < this.state.data.length; index++) {

        stations[index] = {
          stationId: this.state.data[index].idstazione,
          value:{
            stationName: this.state.data[index].nomestazione,
            lat: this.state.data[index].lat,
            lng: this.state.data[index].lng,
            sensorId :this.state.data[index].idsensore,
            sensorType: this.state.data[index].nometiposensore,
            unit: this.state.data[index].unitamisura,
          }
        }
      }
      var stations2 = [];
      var stations3 = [];

      stations.forEach((station) => {
        stations2.push(station.stationId);
      });
      uniqueArray = stations2.filter(function(item, pos) {
        return stations2.indexOf(item) == pos;
      })

      //console.log(uniqueArray);
      for (let index = 0; index < uniqueArray.length; index++) {
        stations3[index] = {stationId:uniqueArray[index], sensors:[]}
        
      }

      stations.forEach((station)=>{
          this.addSensorsInfoToStation(station, stations3)
      })
     // console.log(stations3);


      var group = stations.reduce((r, a) => {
        r[a.stationId] = [...r[a.stationId] || [], a];
        return r;
       }, {});
    
      this.setState({interestedData:stations3});
     // console.log("INTERESTED DATA: ")
     // console.log(this.state.interestedData[0]);
     // console.log("REAL RECEIVED DATA: ");
     // console.log(this.state.data[0]);

    }

    addSensorsInfoToStation(station, stations3){

      var indexOfStation;
      for (let index = 0; index < stations3.length; index++) {
        //console.log('StationId: '+station.stationId +" Station3Id: "+stations3[index].stationId);
        if(parseInt(stations3[index].stationId)==parseInt(station.stationId)){
          //console.log("equals");
          indexOfStation = index;
          stations3[index].sensors.push(station.value);
        }
      }
    }

    getViewOfSensorsByStationId(stationId){

      let sensorsView = this.state.data.filter((station)=>{
        return station.idstazione==stationId})
        .map((sensor) => {
        return <View key = {sensor.idsensore} style={styles.sensorItem}>
                <Text>Sensor Id: {sensor.idsensore}</Text>
                <Text>Sensor Name: {sensor.nometiposensore}</Text>
                {this.getLastSensorsMeasurements(sensor.idsensore)}
                </View>
      })
      return sensorsView;
    }

    getLastSensorsMeasurements(sensorId){

      let sensorsMeasurementsView = this.state.sensorsData.filter((sensor)=>{
        return sensor.idsensore==sensorId})
        .map((sensor) => {
        return <View key = {sensor.data} style={styles.measurementItem}>
                <Text>Time: {sensor.data}</Text>
                <Text>Value: {sensor.valore}</Text>
                </View>
      })
      return sensorsMeasurementsView;

    }

    handleChangeDate(){
      if(this.state.startDate!=''){
        console.log("This.state.endDate = "+this.state.endDate);
        if(this.state.endDate!='' && this.state.endDate>this.state.startDate){
          var a = "https://polimi-dima-server.herokuapp.com/api/data/findByDate?startDate=";
          var b = a.concat(this.state.startDate,"T00:00:00Z&endDate=",this.state.endDate,"T23:59:59Z");
          console.log("URL: "+b);
          this.arduinoDataFetch.retrieveDataByDate(b,(arduinoData)=>{this.setState({arduinoData:arduinoData})
          this.elaborateArduinoData();
          });
        }
      }  
    }

    onFocusFunction = () => {
      const { params } = this.props.navigation.state;
      const token = params ? params.token : null;
      this.setState({token:token});

      this.retrieveArpaStationsData("https://www.dati.lombardia.it/resource/ib47-atvt.json").then(()=>
      this.arduinoDataFetch.retrieveDataByDate(this.todayUrlRequest, 
        (arduinoData)=>{this.setState({arduinoData:arduinoData})
                        this.elaborateArduinoData();
      })
      )


        this.geoLocation().then(()=>{
          console.log("First log");
          this.watchID = navigator.geolocation.watchPosition((position) => {
          // Create the object to update this.state.mapRegion through the onRegionChange function
          let region = {
            latitude:       position.coords.latitude,
            longitude:      position.coords.longitude,
            latitudeDelta:  0.00922*1.5,
            longitudeDelta: 0.00421*1.5
          }
          if(this.state.followUserLocation){
            this.setState({
              mapRegion: region,
              isLoadingGps:false,
            });
            this.onRegionChange(region);
          }
          
          }, this.errorFunction, this.options)}
        )
    }
  


    componentDidMount() {
      this.focusListener = this.props.navigation.addListener('didFocus', () => {
        this.onFocusFunction();
      })
      
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


    errorFunction() {
      console.log("Error");
    }

    geoLocation = async () => {
      try{
        const {status} = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          console.log('not granted');
  
          this.setState({
            errorMessage: 'PERMISSION NOT GRANTED',
          });
        } else {
          console.log("granted");
        }
      } catch {
        console.log("error function");
        this.errorFunction();}
    }
  
    options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0
    };

    onRegionChange(region) {
      this.setState({
        mapRegion: region
      });
    }
      
    mapDragged(){
      this.setState({
        followUserLocation: false
      });
      console.log("Map dragged, follow: " + this.state.followUserLocation);
    }
  
    pressFollow(){
      this.setState({
        followUserLocation: true
      });
      console.log("Pressed arrow, followTrue");
    }

    onMapPress(e) {
      console.log(e.nativeEvent.coordinate.longitude);
      let region = {
        latitude:       e.nativeEvent.coordinate.latitude,
        longitude:      e.nativeEvent.coordinate.longitude,
        latitudeDelta:  0.00922*1.5,
        longitudeDelta: 0.00421*1.5
      }
      this.onRegionChange(region);
  }

    render() {

        if(this.state.isLoading||this.state.isLoadingGps){
            return(
                <View style={styles.ActivityIndicator}>
                    <ActivityIndicator 
                      size="large"
                      color="red"                   
                    />
                </View>
            )
        }
        else {

          //console.log(this.state.arduinoData);
          let stationsText =  this.state.interestedData.map((element) => {
            return  <View key = {element.stationId} style={styles.stationItem}>
                      <Text style={{marginTop:5, marginLeft:'auto',marginRight:'auto', fontSize:24}}>Station Name: {element.sensors[0].stationName}</Text>
                      <Text style={{marginTop:15}}>Latest measurements</Text>
                      {this.getViewOfSensorsByStationId(element.stationId)}
                    </View>
          });

          let stations = this.state.interestedData.map((station)=>{
                return  <Marker key = {station.stationId}
                            coordinate={{
                                latitude: parseFloat(station.sensors[0].lat),
                                longitude: parseFloat(station.sensors[0].lng),
                            }}
                            title={station.sensors[0].stationName}
                            description={"ARPA Station"}
                            pinColor={'blue'}
                            onPress = {()=>{
                              this.setState({isArpaStation:true});
                              this.setState({showArpaInfo:station.stationId});
                              this.setState({showClusterInfo:-1});
                              }
                            }
                        />
            });
                    
          let dataMarkers = this.state.clusters.map((cluster) => {
            return <View key={cluster.id}>
                      <Circle
                                center={
                                  cluster.position
                                }
                                radius = {this.defaultClusterRadius}
                                strokeWidth = {1}
                                strokeColor = {'rgba(255,0,0,0.2)'}
                                fillColor = {'rgba(255,100,50,0.1)'} 
                                          
                      />
                      <Marker
                        coordinate={cluster.position}
                        title={"Arduino Data"}
                        description="Arduino air quality data"   
                        onPress={()=>{
                          this.setState({showClusterInfo:cluster.id});
                          this.setState({isArpaStation:false});
                        }}
                        pinColor={'green'}
                      />
                    </View>
            
          })
          let selectedClusterMeanValues;
          let object;
          if(this.state.showClusterInfo!=-1){
            filteredValues =  this.state.meanValues.filter(
              (meanValues)=>meanValues.clusterId==this.state.showClusterInfo)
              object = filteredValues[0];
            //console.log(object);
            selectedClusterMeanValues = Object.keys(object).map(function(keyName, keyIndex) {
              return<View key={keyIndex} style={styles.meanValueItem}><Text>{keyName} : {object[keyName]}</Text></View>
            })
            selectedClusterMeanValues = <View style={styles.stationItem}>
              {selectedClusterMeanValues}
            </View>
            
          }
          else{
            selectedClusterMeanValues=<View key={1}></View>
          }

          let pastDate = this.elaborateMinDate();
        return (
            <ScrollView style={styles.container}>

                <View style={styles.headerRow}>
                <Text style={styles.airQualityHeader}>Air Quality</Text>

                <TouchableOpacity
                  onPress={() => {this.props.navigation.navigate("Settings",{token:this.state.token})
                  this.componentCleanUp();}
                }
                  style={styles.settingsButton}>
                  <Image
                    source={require("../assets/images/user-icon.png")}
                    resizeMode="contain"
                    style={styles.settingslogo}
                  ></Image>
                </TouchableOpacity>
                
                <TouchableOpacity
                    onPress={() => {this.props.navigation.navigate("ReadData",{token:this.state.token})
                    this.componentCleanUp();
                    }}
                    style={styles.homeButton}>
                    <Image
                    source={require("../assets/images/location3.png")}
                    resizeMode="contain"
                    style={styles.homelogo}
                    ></Image>
                </TouchableOpacity>
                
                <TouchableOpacity
                    onPress={() => {this.props.navigation.navigate("Login",{token:''})
                    this.componentCleanUp();
                  }                  
                  }
                    style={styles.logoutButton}
                >
                    <Image
                    source={require("../assets/images/logout.png")}
                    resizeMode="contain"
                    style={styles.logoutLogo}
                    ></Image>
                </TouchableOpacity>
                </View>
                <Text style={styles.title}>Stored Data</Text>
                <View style={{
                  marginTop:30,
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
                    minDate={(pastDate)}
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
                    onDateChange={(date) => {
                      this.setState({startDate: date});
                      this.handleChangeDate();
                    }}
                  />
                  <DatePicker
                    style={styles.dateInput}
                    date={this.state.endDate}
                    mode="date"
                    placeholder="End Date"
                    format="YYYY-MM-DD"
                    minDate={(pastDate)}
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
                    onDateChange={(date) => {
                      this.setState({endDate: date});
                      this.handleChangeDate();
                    }}
                  />
                </View>
                <MapView
                    style={styles.mapImg}
                    initialRegion={this.state.mapRegion}
                    width={Dimensions.get('window').width - 50}
                    //region = {this.state.mapRegion}
                    showsUserLocation={this.state.showsUserLocation}
                    //followUserLocation={this.state.followUserLocation}
                    //onUserLocationChange={event => console.log(event.nativeEvent)}
                    //onPress={() => {}}
                    //onMoveShouldSetResponder={() => {this.mapDragged()}}
                    >
                    {stations}
                    {dataMarkers}
                
                </MapView>
                <DataBars data = {object} 
                          showClusterInfo = {this.state.showClusterInfo} 
                          isArpaStation={this.state.isArpaStation} 
                          interestedData={this.state.interestedData} 
                          data2={this.state.data}
                          sensorsData={this.state.sensorsData}
                          showArpaInfo={this.state.showArpaInfo}
                          read={false}
                          />
                <Text style={{position:'relative',color:'rgba(255,70,10,0.8)',fontSize:12,marginLeft:'auto',marginRight:'auto',marginTop:10, marginBottom:20, width:Dimensions.get('window').width - 60}}>
                  ARPA stations displayed values are the mean of all the avaiable measures made recently, from {this.subtractDaysFromToday(2)} to today.
                  Arduino data displayed by default are taken from today measures and represent the daily mean.</Text>
            </ScrollView>
            
        );
        }
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  ActivityIndicator:{
    marginLeft:'auto',
    marginRight:'auto',
    marginBottom:'auto',
    marginTop:'auto',

  },
  mapImg: {
    height: 250,
    marginTop: 30,
    marginLeft:'auto',
    marginRight:'auto',
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
    height: 60,
    color: "rgba(255,0,0,1)",
    fontSize: 32,
    fontFamily: "roboto-regular",
    lineHeight: 73,
    letterSpacing: 0,
    textAlign: "center",
    width: 375,
    alignSelf: "flex-end",
    marginTop: 5
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
    marginLeft: 10
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
  stationItem: {
      flex: 1,
      marginTop:45,
      padding: 15,
      fontSize: 14,
      backgroundColor:'rgba(255,100,50,0.6)',
  },
  sensorItem: {
    flex: 1,
    marginTop:15,
    fontSize:10
  },
  meanValueItem:{
    flex:1,
    marginLeft:30,
    padding:2,
    fontSize:12,
  },

  measurementItem: {
    flex:1,
    marginLeft:25,

  },

  arrowMapImg:{
    width: 50,
    height: 50,
    transform: [{ rotate: '180deg'}]
  },
  settingsButton: {
    width: 27,
    height: 38,
    backgroundColor: "rgba(255,255,255,1)",
    marginLeft:Dimensions.get('window').width-220
  },
  settingslogo: {
    width: 27,
    height: 38,
    marginTop: 1
  },
});

export default Historical;