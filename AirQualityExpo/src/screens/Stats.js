import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import { TextField } from 'react-native-material-textfield';
import DatePicker from 'react-native-datepicker';
import { LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart} from 'react-native-chart-kit';

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

    this.today={
      year: new Date().getFullYear(),
      month: new Date().getMonth()+1,
      day: new Date().getDate(),
    }
    this.urlDate = "https://polimi-dima-server.herokuapp.com/api/data/findByDate?startDate=2020-04-15T09:00:00Z&endDate=2020-04-16T23:00:00Z";
    this.url = "https://polimi-dima-server.herokuapp.com/api/data?offset=0&limit=1";
    this.measures = [];
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
    //For the first 3 measures received do...
    for (let index = 0; index < 3; index++) {
      x[index] = body[index];
    }
    this.setState({measures: x});
    console.log(this.state.measures);
  }

  componentDidMount(){
    const { params } = this.props.navigation.state;
    const token1 = params ? params.token : null;
    this.setState({token:token1});
    console.log("MOUNTING HISTORICAL DATA COMPONENT");
    
  }

  componentDidUpdate() {
    console.log("UPDATING")
    //console.log("This.state.startDate = "+this.state.startDate);
    /*
    if(this.state.startDate!=''){
      console.log("This.state.endDate = "+this.state.endDate);
      if(this.state.endDate!='' && this.state.endDate>this.state.startDate){
        var a = "https://polimi-dima-server.herokuapp.com/api/data/findByDate?startDate="
        var b = a.concat(this.state.startDate,"T00:00:00Z&endDate=",this.state.endDate,"T23:59:59Z");
        console.log("URL: "+b);
        //this.retrieveDataByDate(b);
      }
    }*/
  }

  handleChangeDate(){

    if(this.state.startDate!=''){
      console.log("This.state.endDate = "+this.state.endDate);
      if(this.state.endDate!='' && this.state.endDate>this.state.startDate){
        var a = "https://polimi-dima-server.herokuapp.com/api/data/findByDate?startDate="
        var b = a.concat(this.state.startDate,"T00:00:00Z&endDate=",this.state.endDate,"T23:59:59Z");
        console.log("URL: "+b);
        this.retrieveDataByDate(b);
      }
    }


  }

  render(){
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
              onDateChange={(date) => {
                this.setState({endDate: date});
                this.handleChangeDate();
              }}
            />
          </View>
        </View>

        
        <View>
          
          <LineChart
            data={{
              labels: ['January', 'February', 'March', 'April'],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                  ],
                },
              ],
            }}
            width={Dimensions.get('window').width - 16} // from react-native
            height={220}
            yAxisLabel={'$'}
            chartConfig={{
              backgroundColor: '#1cc910',
              backgroundGradientFrom: '#eff3ff',
              backgroundGradientTo: '#efefef',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
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