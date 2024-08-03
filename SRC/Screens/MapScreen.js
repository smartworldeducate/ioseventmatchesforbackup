import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview';
import MainHeader from '../Components/Headers/MainHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const MapScreen = (props) => {
  return (
    <View style={{flex:1}}>
      <View style={{flex: 0.1,marginBottom:hp(2)}}>
        <MainHeader
          text={'Event Location'}
          onpressBtn={() => props.navigation.goBack()}
        />
      </View>
      {/* <View style={{flex:0.1}}></View> */}
      <View style={{flex:0.8}}>
      <WebView
        source={{ uri: 'https://www.google.com/maps/place/Duke+Energy+Convention+Center/@39.1011708,-84.5201692,17z/data=!3m1!4b1!4m5!3m4!1s0x8841b15182ab2e21:0x467f84c386e33f58!8m2!3d39.1011667!4d-84.5179805' }}
        
      />
      </View>
      
    </View>
  )
}

export default MapScreen

