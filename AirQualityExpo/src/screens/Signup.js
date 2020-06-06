import React, { Component } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Text, TouchableOpacity, Dimensions, Image, Platform } from "react-native";
import MaterialRightIconTextbox from "../components/MaterialRightIconTextbox";
import MaterialStackedLabelTextbox from "../components/MaterialStackedLabelTextbox";
import { TextField } from 'react-native-material-textfield';
import PasswordInputText from 'react-native-hide-show-password-input';
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-datepicker';
import { ScrollView } from "react-native-gesture-handler";
import RNPasswordStrengthMeter from 'react-native-password-strength-meter';
import { BarPasswordStrengthDisplay } from 'react-native-password-strength-meter';


class Signup extends Component {

  state = {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      gender: '',
      birthDay: '',
      
  };
    today = {
      year: new Date().getFullYear(),
      month: new Date().getMonth()+1,
      day: new Date().getDate(),
  }

  url = "https://polimi-dima-server.herokuapp.com/api";

  confirmPassword= '';

  handleFirstName = (text) => {
    this.setState({ firstName: text })
   };

  handleEmail = (text) => {
    this.setState({ email: text })
  }
  handleLastName = (text) => {
    this.setState({ lastName: text })
  }
  handleGender = (text) => {
    this.setState({ gender: text })
  }
  handlePassword = (text) => {
    this.setState({ password: text })
  }
  handleConfirmPassword = (text) => {
    this.confirmPassword = text;
  }
   
  formatText = (text) => {
    return text.replace(/[^+\d]/g, '');
  };

  registerFunction(){
    console.log("confirm: " + this.confirmPassword + "Password: " + this.state.password);
    passwordMatch = ((this.state.password)==(this.confirmPassword));
    passwordLength = ((this.state.password).length >= 4);
    if(passwordMatch&&passwordLength){
      return fetch(this.url+"/user/register", {
        method: "post",
        headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          password: this.state.password,
          gender: this.state.gender,
          birthDay: this.state.birthDay
        }),
      })
      .then((response) => { 
        console.log(response);
        return response.json();})
        .then((responseJson)=>{
          console.log(responseJson);
          if(responseJson.email){
            this.props.navigation.navigate("Login");
          }
          else{
            alert("The user already exists!")
          }

        })/*
        

        if (response.status == "200"){
         
          if(response.email) {
            this.props.navigation.navigate("Login");
          }
          else{ 
            alert("Already existing user")
          }
        }
        else {
          alert("Invalid response");
        }
      })*/
      .catch((error) => {
        console.error(error);
      });
    } else {
      if (!passwordMatch) {alert("Password and Confirm Password must be equal");}
      if (!passwordLength) {alert("Password must be longer than 4 characters");}
    }
  }

  /*doLogin(email, password){
    return fetch(this.url+"/user/login", {
      method: "post",
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( {email: {email}, password: {password}} ),
    })
    .then((response) => {
      if (response.status == "200"){
        return (response.json());
      }
      else {
        alert("Invalid response");
      }
    })
    .then((json)=>{
      this.props.navigation.navigate("Home", {token: json.token});
    })
    .catch((error) => {
      console.error(error);
    });
  }*/

  render(){
    return (
      <ScrollView style={styles.container}>
        <View style={{height:Dimensions.get('window').height+400}}>
          <View style={styles.airQuality2Row}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Login")}
              style={styles.homeButton1}>
              <Image
                source={require("../assets/images/logout.png")}
                resizeMode="contain"
                style={styles.homelogo}></Image>
            </TouchableOpacity>
          </View>
          <Text style={styles.airQuality1}>Air Quality</Text>
            <View style={{marginLeft:'auto', marginRight:'auto', marginTop:10,width:250}}>
              <TextField style = {styles.inputUser}
                  underlineColorAndroid = "transparent"
                  autoCapitalize = "none"
                  onChangeText = {this.handleFirstName}
                  formatText={this.formatText}
                  tintColor={'rgba(255,20,10,0.8)'}
                  label="First Name"/>
            </View>

            <View style={{marginLeft:'auto', marginRight:'auto',marginTop:5, width:250}}>
              <TextField style = {styles.inputUser}
                  underlineColorAndroid = "transparent"
                  autoCapitalize = "none"
                  onChangeText = {this.handleLastName}
                  formatText={this.formatText}
                  tintColor={'rgba(255,20,10,0.8)'}
                  label="Last Name"/>
            </View>

            <View style={{marginLeft:'auto', marginRight:'auto',marginTop:40, width:250}}>
              <Text>Gender </Text>
              <RNPickerSelect
                placeholder = {{
                  label: 'Gender',
                  value: null,
                  color: '#9EA0A4',
                }}
                onValueChange={this.handleGender}
                items={[
                    { label: 'Male', value: 'male' },
                    { label: 'Female', value: 'female' },
                    { label: 'Other', value: 'other' },
                ]}
              />
            </View>

            <View style={{marginLeft:'auto', marginRight:'auto',marginTop:20,width:250}}>
              <DatePicker
                style={styles.dateInput}
                date={this.state.birthDay}
                mode="date"
                placeholder="Birthday"
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
                    marginLeft: 36
                  }
                // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => {this.setState({birthDay: date})}}
              />
            </View>

            <View style={{marginLeft:'auto', marginRight:'auto',marginTop:20, width:250}}>
              <TextField style = {styles.inputUser}
                  underlineColorAndroid = "transparent"
                  autoCapitalize = "none"
                  onChangeText = {this.handleEmail}
                  formatText={this.formatText}
                  tintColor={'rgba(255,20,10,0.8)'}
                  label="Email"/>
            </View>


            <View style={{marginLeft:'auto', marginRight:'auto',marginTop:5, width:250}}>
              <PasswordInputText
                value={this.state.password}
                tintColor={'rgba(255,20,10,0.8)'}
                onChangeText={this.handlePassword}/>
            </View>

            <View style={{marginLeft:'auto', marginRight:'auto',marginTop:5, width:250}}>
              <PasswordInputText
                value={this.confirmPassword}
                tintColor={'rgba(255,20,10,0.8)'}
                label = "Confirm Password"
                onChangeText={this.handleConfirmPassword}/>
            </View>
            <View style={{marginLeft:'auto',marginRight:'auto',marginTop:25}}>
              <BarPasswordStrengthDisplay
                password={this.state.password}
                width={250}

              />
            </View>
            
            <TouchableOpacity
              onPress={() => this.registerFunction()}
              style={styles.button1}>
              <Text style={styles.text}>Signup</Text>
            </TouchableOpacity>
          
        </View>
      </ScrollView>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  airQuality1: {
    height: 73,
    color: "rgba(255,10,0,1)",
    fontSize: 32,
    fontFamily: "roboto-regular",
    lineHeight: 73,
    letterSpacing: 0,
    textAlign: "center",
    width: 375,
    alignSelf: "flex-end",
    marginTop: 20
  },
  materialRightIconTextbox1: {
    width: 317,
    height: 64,
    marginTop: 241,
    marginLeft: 29
  },
  materialStackedLabelTextbox1: {
    width: 317,
    height: 60,
    marginTop: -224,
    marginLeft: 29
  },
  materialRightIconTextbox2: {
    width: 317,
    height: 64,
    marginTop: 180,
    marginLeft: 29
  },
  button1: {
    width: Dimensions.get('window').width-100,
    height: 40,
    backgroundColor: "rgba(255,10,0,1)",
    marginTop: 20,
    marginLeft: 'auto',
    marginRight:'auto',
    borderRadius:5,
  },
  text: {
    height: 60,
    color: "rgba(255,255,255,1)",
    fontSize: 26,
    fontFamily: "roboto-regular",
    lineHeight: 60,
    letterSpacing: 0,
    textAlign: "center",
    marginTop: -10
  },
  materialStackedLabelTextbox2: {
    width: 317,
    height: 60,
    marginTop: -334,
    marginLeft: 29
  },
  airQuality2: {
    width: 91,
    height: 30,
    color: "rgba(255,0,0,1)",
    fontSize: 15,
    fontFamily: "roboto-regular",
    lineHeight: 30,
    letterSpacing: 0,
    marginTop: 8
  },
  homeButton1: {
    width: 27,
    height: 38,
    backgroundColor: "rgba(255,255,255,1)",
    marginLeft: Dimensions.get('window').width-60, 
    marginTop: 10
  },
  homelogo: {
    width: 27,
    height: 38,
    marginTop: 1
  },
  airQuality2Row: {
    height: 38,
    flexDirection: "row",
    marginTop: 30,
    marginLeft: 10,
    marginRight: 21
  },
  inputView:{
    marginLeft: 'auto',
    marginRight:'auto', 
    width:Dimensions.get('window').width-100,
    marginTop:50,
  },
  inputUser: {
    marginTop: -8,
    height: 40,
    width:160
 },
});

export default Signup;
