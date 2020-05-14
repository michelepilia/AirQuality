import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from "react-native";
import { isLoading } from "expo-font";
import MapView from 'react-native-maps';

class Historical extends Component{

    constructor(props){
        super(props);
        /*stations = [{latitude: 8.860310253579987,longitude: 45.326401500542325}, 
                    {latitude: 8.914144599002409,longitude: 45.04007657202963}, 
                    {latitude: 10.17735680898138,longitude:45.87460210989037},
                    {latitude: 10.336240422996532,longitude: 45.51570829484459},
                    {latitude: 9.384687247651794,longitude: 46.1381409051264},
                    ]*/

        this.state = {
            arpaStations : [],
            isLoading : true,
            mapRegion: null,
            data : [],
            interestedData : [],
        }
        this.retrieveArpaStationsData.bind(this);
        this.elaborateData.bind(this);
        this.alreadyInCollection.bind(this);
    
    }
    API_ID_Key = "dbm71z0uioacgikjukdlvlhfn";
    API_Secret_Key = "secretCode2wa9uofj7avlbreliz0sto2gjyqtbdegvifhzhpastxyyllz6y";

    retrieveArpaStationsData(url){

        fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            //console.log(responseJson);
            this.setState({
                isLoading: false,
                data: responseJson.filter( (station) => station.comune =="Milano")
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
        var b = [];
        var x =[];

        //data to be added to interestedData
        var sensors = [];
        var stationToAdd = {
            id:"",
            name:"",
            sensors: sensors,
        }
/*
        console.log("LENGTH: "+this.state.data.length);
        for (let c = 0; c < this.state.data.length; c++) {
            var consideredStationId = this.state.data[c].idstazione;
            var consideredStationName = this.state.data[c].idstazione;
            var consideredSensorId = this.state.data[c].idsensore;
            
            if(!this.alreadyInCollection(consideredStationId)){
                stationToAdd = {
                    id :consideredStationId,
                    name:consideredStationName,
                    sensors: ,
                }

            }     
        }
*/
        /*for (let index = 0; index < a.length; index++) {
            x[0] = a[index].nomestazione;
            x[1] = a[index].idsensore;
            x[2] = a[index].nometiposensore;
            b[index]= {key:a[index].idstazione,value:x}
            for (let k = 0; k < this.state.interestedData.length; k++) {
                if(interestedData[k].idstazione!=b[index.idstazione]){
                    interestedData[index] = b[index];               
                }
            }

        }*/
        console.log(b);
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

            let stationsText = this.state.data.map((val,key)=>{
                return  <View key = {key} style={styles.item}>
                            <Text>Latitude: {val.lat}</Text>
                            <Text>Longitude: {val.lng}</Text>
                            <Text>Name: {val.nomestazione}</Text>
                            <Text>Id: {val.idstazione}</Text>
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
    flex: 1
}
});

export default Historical;