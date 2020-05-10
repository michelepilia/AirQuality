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


class DisplayStats extends Component{

    render(){
        console.log("PROPS: "+this.props.dailyData);
        return(
            <View>
                <Text>Daily Report: automatically displays the daily report</Text>
                <LineChart
                    data={{
                    labels: ['0-4', '4-8', '8-12', '12-16', '16-20', "20-24"],
                    datasets: [
                        {
                        data: this.props.dailyData
                        },
                    ],
                    }}
                    width={Dimensions.get('window').width - 16} // from react-native
                    height={220}
                    yAxisLabel={'.'}
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
        );
    }




}


export default DisplayStats;