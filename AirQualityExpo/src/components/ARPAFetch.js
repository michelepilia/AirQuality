import React, { Component } from "react";


class ARPAFetch extends Component{
 
    retrieveData(callback){
        fetch(this.url)
        .then((response) => {
        console.log("RESPONSE CODE: "+response.status);
        if (response.status == "200"){
            response.json();
            let stations = [];
            callback(stations);
        }
        else {
            alert("Invalid response");
        }
        }) 
        .then((response) => console.log(response))
        .catch((error) => {
            console.error(error);
            callback([]);
        });
    }
}

export default ARPAFetch;