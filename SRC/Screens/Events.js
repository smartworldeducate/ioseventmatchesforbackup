import { View, Text, StatusBar, TouchableOpacity, Image, FlatList, Modal, ActivityIndicator, ToastAndroid } from 'react-native';
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
const Events = (props) => {
//   const {user_id} = props.route.params;
  const dispatch = useDispatch();
  const activityData=useSelector((state)=>state.acitivityState);
  const [data, setData] = useState(null);
  const [loginData, setLoginData] = useState(null);
  // console.log("userid==",data?.user_id)
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
  async function getData(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        console.log('Data retrieved successfully:', value);
        const parsedData = JSON.parse(value);
        setData(parsedData);
        dispatch(pastEventHandler({"user_id":parsedData?.user_id}));
        console.log('here is splash screen data', parsedData?.user_id);
      } else {
        console.log('No data found for key:', key);
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  }
  // async function geLogintData(key) {
  //   try {
  //     const value = await AsyncStorage.getItem(key);
  //     if (value !== null) {
  //       // console.log('Data retrieved successfully:', value);
  //       const parsedData = JSON.parse(value);
  //       setLoginData(parsedData);
  //     } 
  //   } catch (error) {
  //     console.error('Error retrieving data:', error);
  //   }
  // }
  const pastEventData=useSelector((state)=>state.pastEventState);
  console.log("pastEventData==",pastEventData?.user?.response?.events);
  useEffect(() => {
    // geLogintData('loginData');
    getData('userSession');
  }, []);
  const propHandler=(item)=>{
    saveData({user_id:loginData?.user_id, event_id:item?.event_id,login_id:loginData?.login_id,is_macher:item?.is_matchmaker});
    if(item){
    //  dispatch(activityHomeHandler({"event_id":event_id,user_id:data?.login_id}));
    //  if(activityData?.user?.responseData?.response?.success===1){
      // props.navigation.navigate('HomeScreen');
    //  }else{
    //   ToastAndroid.showWithGravity(
    //     activityData?.user?.responseData?.response?.message,
    //     ToastAndroid.LONG,
    //     ToastAndroid.CENTER,
    //   );
     }
    // }else{
    //   console.log("something went wrong");
    // }
  }
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
      onPress={() => {}}
      style={[
        {
          marginHorizontal: hp(2.5),
          flex: 1,
          marginBottom: hp(2),
          height: hp(12),
          flexDirection: 'row',
          backgroundColor: '#fff',
          borderRadius: hp(1),
          // Shadow styles
          ...(Platform.OS === 'ios'
            ? {
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
              }
            : {
                elevation: 5,
              }),
        },
      ]}>
      <View style={{flex: 1, flexDirection: 'row', margin: hp(1.5)}}>
        <View style={{flex: 0.23}}>
          <Image
            style={{width: '100%', height: '100%', borderRadius: hp(1)}}
            source={{uri: item?.logo ? item?.logo : 'groupfore'}}
            resizeMode="cover"
          />
        </View>
        <View style={{flex: 0.72, marginLeft: hp(1.5)}}>
          <Text
            style={{
              color: colors.grayDescColor,
              fontSize: hp(2),
              flexWrap: 'wrap',
              fontWeight: 'bold',
              fontFamily: fontFamily.robotoBold,
            }}
            ellipsizeMode="tail"
            numberOfLines={3}>
            {item?.event_name}
          </Text>
          <View style={{flexDirection:'row'}}>
            <View style={{marginTop:hp(0.5),paddingLeft:hp(0)}}>
            <Icon
                type="regular"
                name="calendar-check"
                size={hp(2)}
                color="#cdcdcd"
              />
            </View>
         <View style={{paddingLeft:hp(1)}}>
         <Text
            style={{
              color: colors.grayDescColor,
              fontSize: hp(1.8),
              flexWrap: 'wrap',
              fontWeight: '500',
              fontFamily: fontFamily.robotoLight,
              paddingTop:hp(0.5)
            }}>
         
          {item?.start_date} - {item?.end_date}
          </Text>
         </View>
          </View>
        </View>
        <View style={{flex: 0.08, justifyContent: 'flex-end'}}>
          <Icon
            type="light"
            name="arrow-down-right"
            size={hp(3)}
            color="#832D8E"
          />
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
     <MainHeader text={'Events'} onpressBtn={() => props.navigation.goBack()}/>
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

export default Events