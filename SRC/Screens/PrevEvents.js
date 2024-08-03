import { View, Text, StatusBar, TouchableOpacity, Image, FlatList, Modal, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import MainHeader from '../Components/Headers/MainHeader';
import BtnThree from '../Components/BtnThree';
import { pastEventHandler} from '../features/pastevents/pastEventSlice';
import { activityHomeHandler } from '../features/eventactivityhome/hactivitySlice';
import Icon from 'react-native-fontawesome-pro';
import fontFamily from '../Styles/fontFamily';
import colors from '../Styles/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
const PrevEvents = (props) => {
  const {user_id} = props.route.params;
  const dispatch = useDispatch();
  const activityData=useSelector((state)=>state.acitivityState);
  const [data, setData] = useState(null);
  // 6502
  async function saveData(value) {
    const jsonString = JSON.stringify(value);
    try {
      await AsyncStorage.setItem("userSession", jsonString);
      console.log('Data saved successfully.');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }
  const pastEventData=useSelector((state)=>state.pastEventState);
  console.log("pastEventData==",pastEventData?.user?.response?.events);
  useEffect(() => {
    dispatch(pastEventHandler({"user_id":user_id}));
  }, []);
  const propHandler=(event_id)=>{
    saveData({user_id:user_id,event_id:event_id});
    if(event_id){
     dispatch(activityHomeHandler({"event_id":event_id}));
     if(activityData?.user?.responseData?.response?.success===1){
      props.navigation.navigate('HomeScreen');
     }
    }else{
      console.log("something went wrong");
    }
  }
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity onPress={()=>propHandler(item?.event_id)} style={[
        { 
          marginHorizontal: hp(2.5),
          flex:1,
          marginBottom: hp(2),
          height: hp(12),
          flexDirection:'row',
          backgroundColor: '#fff',
          borderRadius: hp(1),
          // Shadow styles
          ...(Platform.OS === 'ios' ? {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          } : {
            elevation: 5,
          })
        }
      ]}>
        <View style={{flex:1,flexDirection:'row',margin:hp(1.5)}}>
          <View style={{flex:0.3}}>
          <Image
            style={{ width: '100%', height: '100%',borderRadius:hp(1) }}
            source={{ uri:item?.logo ? item?.logo:'groupfore'}}
            resizeMode="cover"
          /> 
          </View>
          <View style={{flex:0.72,marginLeft:hp(1)}}>
              <Text style={{color:colors.blackColor,fontSize:hp(2),flexWrap:'wrap',fontWeight:'500',fontFamily:fontFamily.robotoLight}} ellipsizeMode='tail' numberOfLines={1}>{item?.event_name}</Text>
              <Text style={{color:colors.blackColor,fontSize:hp(2),flexWrap:'wrap',fontWeight:'500',fontFamily:fontFamily.robotoLight}}><Text style={{color:colors.blackColor,fontWeight:'500',fontFamily:fontFamily.robotoMedium}}>Start Date</Text> :{item?.start_date}</Text>
              <Text style={{color:colors.blackColor,fontSize:hp(2),flexWrap:'wrap',fontWeight:'500',fontFamily:fontFamily.robotoLight}}><Text style={{color:colors.blackColor,fontWeight:'500',fontFamily:fontFamily.robotoMedium}}>End Date</Text> :  {item?.end_date}</Text>

          </View>
          <View style={{flex:0.08,justifyContent: 'flex-end'}}>
            <Icon type='light' name="arrow-down-right" size={hp(3)} color='#832D8E' />
          </View>
        </View>
        
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex:1}}>
         <StatusBar
        barStyle={'default'}
        translucent
        backgroundColor="transparent"
      />
       <Modal
        visible={pastEventData?.isLoading}
        transparent={true}
        animationType="fade"
      >
        <View style={{flex:1,justifyContent: 'center', alignItems: 'center',backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{width:wp(25),height:hp(12.5),backgroundColor: 'white',borderRadius:hp(1),justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#cdcdcd" />
        </View>
        </View>
      </Modal>
     <View style={{flex:0.1,zIndex:1}}>
     <MainHeader text={'Previous Events'} onpressBtn={() => props.navigation.goBack()}/>
     </View>
      
      <View style={{flex:0.06,justifyContent:'space-between',alignItems:'center',flexDirection:'row',marginHorizontal:hp(2.5),marginTop:hp(-2)}}>
      </View>
      <View style={{flex:0.9}}>
      <FlatList
          data={pastEventData?.user?.response?.events}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  )
}

export default PrevEvents