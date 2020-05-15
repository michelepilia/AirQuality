import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from "react-native";
import { isLoading } from "expo-font";
import MapView from 'react-native-maps';

class Historical extends Component{

    constructor(props){
        super(props);
        this.state = {
            arpaStations : [],
            isLoading : true,
            mapRegion: {
              latitude:      45.47,
              longitude:      9.22,
              latitudeDelta:  0.0922*1.5,
              longitudeDelta: 0.0421*1.5
            },
            data : [],
            interestedData : [],
        }
        this.retrieveArpaStationsData.bind(this);
        this.elaborateData.bind(this);
        this.alreadyInCollection.bind(this);
        this.addSensorsInfoToStation.bind(this);
    
    }

    retrieveArpaStationsData(url){

        fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            //console.log(responseJson);
            this.setState({
                isLoading: false,
                data: responseJson.filter( (station) => station.comune =="Milano").filter((station) => station.datastop==null)
            })
            this.elaborateData();
            //console.log(this.state.data);
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

      console.log(uniqueArray);
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
     // console.log(stations3);
    
      this.setState({interestedData:stations3});
      //console.log(this.state.interestedData);
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

    componentDidMount() {
        return this.retrieveArpaStationsData("https://www.dati.lombardia.it/resource/ib47-atvt.json");
    }

    onRegionChange(region, lastLat, lastLong) {
        this.setState({
          mapRegion: region,
          // If there are no new values set use the the current ones
          lastLat: lastLat || this.state.lastLat,
          lastLong: lastLong || this.state.lastLong
        });
      }
    
      onMapPress(e) {
        console.log(e.nativeEvent.coordinate.longitude);
        let region = {
          latitude:       e.nativeEvent.coordinate.latitude,
          longitude:      e.nativeEvent.coordinate.longitude,
          latitudeDelta:  0.00922*1.5,
          longitudeDelta: 0.00421*1.5
        }
        this.onRegionChange(region, region.latitude, region.longitude);
    }



    render() {
        if(this.state.isLoading){
            return(
                <View style={styles.container}>
                    <ActivityIndicator />
                </View>
            )
        }
        else {
          console.log(this.state.interestedData);
          let stationsText =  this.state.interestedData.map((element) => {
              return  <View key = {element.stationId} style={styles.item}>
                        
                        <Text>StationId: {element.stationId}</Text>
                        <Text>StationName: {element.sensors[0].stationName}</Text>
                        {/*element.forEach(sensor => {
                          return <Text>SensorType: {sensor.sensorType}</Text>    
                        })*/}
                      </View>
            });

            

            let stations = this.state.data.map((val,key)=>{
                return  <MapView.Marker key = {key} style={styles.item}
                            coordinate={{
                                latitude: parseFloat(val.lat),
                                longitude: parseFloat(val.lng),
                            }}
                            title={"Nome Stazione: "+val.nomestazione}
                            description={"ID stazione: "+val.idstazione + 
                            "\nTipo di sensore: "+val.nometiposensore
                            +"\nData inizio: " +val.datastart}
                        />
                        
            });

        return (
            <ScrollView style={styles.container}>

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
                <Text>Historical Data</Text>
                <MapView
                    style={styles.mapImg}
                    initialRegion={this.state.mapRegion}
                    showsUserLocation={true}
                    followUserLocation={true}
                    onRegionChange={this.onRegionChange.bind(this)}
                    onPress={this.onMapPress.bind(this)}>
                    {stations}
                </MapView>
                {stationsText}

            </ScrollView>
        );
        }
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mapImg: {
    width: 313,
    height: 403,
    marginTop: 42,
    marginLeft: 32
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
item: {
    flex: 1,
    marginTop:10
}
});

export default Historical;