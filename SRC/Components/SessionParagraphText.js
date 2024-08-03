import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import Icon from 'react-native-fontawesome-pro';
const SessionParagraphText = () => {
  return (
    <View style={{flex:1}}>
    <View style={{flex:0.2,justifyContent:'center'}}>
      <Text style={{color:'gray',fontSize:hp(2.5),fontWeight:'300'}} numberOfLines={1}>Panel Discussion</Text>
      <Text style={{color:'#000',fontSize:hp(3.5),fontWeight:'600'}} numberOfLines={2}>Mastering Events: A Beginner's Guide</Text>
    </View>
    <View style={{flex:0.25,marginTop:hp(1),justifyContent:'center'}}>
        <View style={{flexDirection:'row',flex:0.44}}>
            <View style={{flex:0.15,backgroundColor:'#cdcdcd',borderRadius:hp(50),justifyContent:"center",alignItems:'center'}}>
            <Icon type="light" name="calendar-days" size={hp(3.5)} color="#832D8E" />
            </View>
            <View style={{flex:0.04}}></View>
            <View style={{flex:0.75}}>
                <Text style={{color:'#000',fontSize:hp(2.5),fontWeight:'500'}}>December 14, 2021</Text>
                <Text style={{color:'#000',fontSize:hp(1.7),fontWeight:'500'}}>Tuesday, 4:00 - 09:00 PM</Text>
            </View>
        </View>
        <View style={{flexDirection:'row',flex:0.44,marginTop:hp(1.5)}}>
            <View style={{flex:0.15,backgroundColor:'#cdcdcd',borderRadius:hp(50),justifyContent:"center",alignItems:'center'}}>
            <Icon type="light" name="location-dot" size={hp(3.5)} color="#832D8E" />
            </View>
            <View style={{flex:0.04}}></View>
            <View style={{flex:0.75}}>
                <Text style={{color:'#000',fontSize:hp(2.5),fontWeight:'500'}}>Hall # 40</Text>
                <Text style={{color:'#000',fontSize:hp(1.7),fontWeight:'500'}}>DHA, Lahore</Text>
            </View>
        </View>
      </View>
      <View style={{flex:0.15,justifyContent:'center',marginTop:hp(0),flexDirection:'row',alignItems:'center'}}>
      <TouchableOpacity  style={{flex:0.37,borderRadius:hp(5),borderWidth:2,borderColor:'#832D8E',height:hp(6),justifyContent:'center',alignItems:'center',backgroundColor:'#832D8E'}}>
        <Text style={{color:'#fff',fontSize:hp(2),fontWeight:'300'}}>Abstract</Text>
        {/* <Text style={{color:'#832D8E',fontSize:hp(1.3),fontWeight:'300'}}>8th, Nov 2022</Text> */}
      </TouchableOpacity>
      <TouchableOpacity  onPress={()=>{}}style={{flex:0.37,borderRadius:hp(5),borderWidth:2,borderColor:'#832D8E',height:hp(6),justifyContent:'center',alignItems:'center',marginHorizontal:hp(1)}}>
      <Text style={{color:'#832D8E',fontSize:hp(2),fontWeight:'600'}}>Speakers</Text>
        {/* <Text style={{color:'#832D8E',fontSize:hp(1.3),fontWeight:'300'}}>8th, Nov 2022</Text> */}
      </TouchableOpacity>
      <TouchableOpacity style={{flex:0.37,borderRadius:hp(5),borderWidth:2,borderColor:'#832D8E',height:hp(6),justifyContent:'center',alignItems:'center'}}>
      <Text style={{color:'#832D8E',fontSize:hp(2),fontWeight:'600'}}>Resources</Text>
        {/* <Text style={{color:'#832D8E',fontSize:hp(1.3),fontWeight:'300'}}>8th, Nov 2022</Text> */}
      </TouchableOpacity>
      </View>
      <View style={{flex:0.4,backgroundColor:'red',height:hp(800)}}>
      <ScrollView>
        <View>
            <Text style={{color:'#fff'}}>vffdghdfgd</Text>
        </View>
      </ScrollView>
      </View>
    </View>
  )
}

export default SessionParagraphText