import { View, Text, StatusBar, TouchableOpacity, Image, FlatList, Modal, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import MainHeader from '../Components/Headers/MainHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {qrcodeHandler} from '../features/qrcode/qrSlice';
import { useDispatch, useSelector } from 'react-redux';
const Qrcode = (props) => {
  const [data, setData] = useState('');
  const dispatch = useDispatch();
  const qrcodeData = useSelector(state => state.qrState);
    // console.log("qrcodeData data===",qrcodeData?.user?.response?.detail?.qr_path);

  async function getData(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // console.log('Data retrieved successfully:', value);
        const parsedData = JSON.parse(value);
        setData(parsedData);
        // console.log('user id and event_id===', parsedData);
        // {"user_id":parsedData.user_id,"event_id":parsedData.event_id,"type_id":1}
        dispatch(
          qrcodeHandler({
            user_id: parsedData.user_id,
            event_id: parsedData.event_id,
          }),
        );
        // console.log('here is feedback screen data', parsedData);
        return parsedData;
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  }

  useEffect(() => {
    getData('userSession');
  }, []);

  return (
    <View style={{flex:1}}>
         <StatusBar
        barStyle={'default'}
        translucent
        backgroundColor="transparent"
      />
      
     <View style={{flex:0.1,zIndex:1}}>
     <MainHeader text={'Qr code'} onpressBtn={() => props.navigation.goBack()}/>
     </View>
      

      <View style={{flex:0.9}}>
      <Image
        source={{uri: qrcodeData?.user?.response?.detail?.qr_path}}
        style={{width: '100%', height: '100%'}}
        resizeMode={'contain'}
          />
      </View> 
     
    </View>
  )
}

export default Qrcode