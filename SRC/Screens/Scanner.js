import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, Modal, ActivityIndicator, TouchableOpacity, Alert, Linking } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Icon from 'react-native-fontawesome-pro';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MainHeader from '../Components/Headers/MainHeader';
import { scanerPostHandler } from '../features/scanerpostdata/scanerPostSlice';
import fontFamily from '../Styles/fontFamily';

const Scanner = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState('');
  const [modelView, setModelView] = useState(false);
  const scanPostData = useSelector((state) => state.scanPostState);
  // console.log("scanpost data===", scanPostData);
  const [state, setState] = useState({
    scan: true,
    ScanResult: false,
    result: '',
  });
  const { scan, ScanResult, result } = state;
  const scanner = useRef(null);

  // Request camera permission
  const requestCameraPermission = async () => {
    const result = await request(PERMISSIONS.IOS.CAMERA);

    switch (result) {
      case RESULTS.GRANTED:
        console.log('Camera permission granted');
        break;
      case RESULTS.DENIED:
        console.log('Camera permission denied but requestable');
        Alert.alert(
          'Permission Required',
          'Camera access is required to scan QR codes. Please enable camera permission in the app settings.',
          [{ text: 'OK', onPress: () => props.navigation.goBack() }]
        );
        break;
      case RESULTS.BLOCKED:
        console.log('Camera permission is blocked and not requestable');
        Alert.alert(
          'Permission Blocked',
          'Camera access is blocked. Please enable camera permission in the app settings.',
          [{ text: 'OK', onPress: () => props.navigation.goBack() }]
        );
        break;
      case RESULTS.UNAVAILABLE:
        console.log('Camera permission is unavailable on this device');
        Alert.alert(
          'Not Available',
          'Camera is not available on this device.',
          [{ text: 'OK', onPress: () => props.navigation.goBack() }]
        );
        break;
    }
  };

  // Fetch data from AsyncStorage
  async function getData(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        const parsedData = JSON.parse(value);
        setData(parsedData);
        scanAgain();
        return parsedData;
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  }

  // Request permission and load data when screen is focused
  useFocusEffect(
    useCallback(() => {
      requestCameraPermission();
      getData('userSession');
    }, [dispatch])
  );

  // Load data on component mount
  useEffect(() => {
    getData('userSession');
  }, []);

  // Handle QR code scan success
  const onSuccess = async (e) => {
    const check = e.data.substring(0, 4);
    setState({
      result: e,
      scan: false,
      ScanResult: true,
    });

    if (check === 'http') {
      Linking.openURL(e.data).catch((err) =>
        console.error('An error occurred', err)
      );
    } else {
      dispatch(
        scanerPostHandler({
          user_id: data?.event_user_id,
          event_id: data?.event_id,
          admin_id: data?.user_id,
          qr_code: e?.data,
        })
      );

      setState({
        result: e.data,
        scan: false,
        ScanResult: true,
      });
      setModelView(true);

    }
  };

  const closeAndNavigateHandler = () => {
    props.navigation.goBack();
    setModelView(false);
  };

  const activeQR = (e) => {
    setState({
      scan: true,
    });
  };

  const scanAgain = () => {
    setState({
      scan: true,
      ScanResult: false,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Loading Indicator */}
      <Modal
        visible={scanPostData?.isLoading}
        transparent={true}
        animationType="fade"
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <View
            style={{
              width: wp(25),
              height: hp(12.5),
              backgroundColor: 'white',
              borderRadius: hp(1),
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ActivityIndicator size="large" color="#cdcdcd" />
          </View>
        </View>
      </Modal>

      {/* QR Scan Result Modal */}
      {modelView &&  <Modal
        visible={modelView}
        transparent={true}
        animationType="fade"
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <View
            style={{
              width: wp(60),
              height: hp(30),
              backgroundColor: 'white',
              borderRadius: hp(1),
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: '#000',
                fontSize: hp(2),
                fontFamily: fontFamily.robotoMedium,
                fontWeight: '400',
              }}
            >
              {scanPostData?.user?.response?.message}
            </Text>
            <TouchableOpacity
              onPress={closeAndNavigateHandler}
              style={{
                backgroundColor: '#832D8E',
                borderRadius: hp(50),
                width: hp(10),
                height: hp(4.5),
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                top: hp(7),
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: hp(2),
                  fontFamily: fontFamily.robotoMedium,
                  fontWeight: '400',
                }}
              >
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>}
     

      {/* Header */}
      <View style={{ flex: 0.1 }}>
        <MainHeader
          text={'Scanner'}
          onpressBtn={() => props.navigation.goBack()}
        />
      </View>

      {/* QR Code Scanner */}
      <View style={{ flex: 0.9 }}>
      {modelView && (
         <View
         style={{
           flex: 1,
           justifyContent: 'center',
           alignItems: 'center',
          //  backgroundColor: 'rgba(0, 0, 0, 0.5)',
         }}
       >
         <View
           style={{
             width: wp(60),
             height: hp(30),
             backgroundColor: 'white',
             borderRadius: hp(1),
             justifyContent: 'center',
             alignItems: 'center',
           }}
         >
           <Text
             style={{
               color: '#000',
               fontSize: hp(2),
               fontFamily: fontFamily.robotoMedium,
               fontWeight: '400',
             }}
           >
             {scanPostData?.user?.response?.message}
           </Text>
           <TouchableOpacity
             onPress={closeAndNavigateHandler}
             style={{
               backgroundColor: '#832D8E',
               borderRadius: hp(50),
               width: hp(10),
               height: hp(4.5),
               justifyContent: 'center',
               alignItems: 'center',
               position: 'relative',
               top: hp(7),
             }}
           >
             <Text
               style={{
                 color: '#fff',
                 fontSize: hp(2),
                 fontFamily: fontFamily.robotoMedium,
                 fontWeight: '400',
               }}
             >
               OK
             </Text>
           </TouchableOpacity>
         </View>
       </View>
      )}
        {ScanResult && (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              margin: hp(2),
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* Optional scan again button can be added here */}
          </View>
        )}

        {scan && (
          <QRCodeScanner
            cameraStyl={{ height: hp(120) }}
            reactivate={true}
            showMarker={true}
            ref={scanner}
            onRead={onSuccess}
            bottomContent={
              <View
                style={{
                  paddingTop: hp(8),
                  flexDirection: 'row',
                  marginTop: hp(8),
                }}
              ></View>
            }
          />
        )}
      </View>
      {/* {modelView && (
         <View
         style={{
           flex: 1,
           justifyContent: 'center',
           alignItems: 'center',
           backgroundColor: 'rgba(0, 0, 0, 0.5)',
         }}
       >
         <View
           style={{
             width: wp(60),
             height: hp(30),
             backgroundColor: 'white',
             borderRadius: hp(1),
             justifyContent: 'center',
             alignItems: 'center',
           }}
         >
           <Text
             style={{
               color: '#000',
               fontSize: hp(2),
               fontFamily: fontFamily.robotoMedium,
               fontWeight: '400',
             }}
           >
             {scanPostData?.user?.response?.message}
           </Text>
           <TouchableOpacity
             onPress={closeAndNavigateHandler}
             style={{
               backgroundColor: '#832D8E',
               borderRadius: hp(50),
               width: hp(10),
               height: hp(4.5),
               justifyContent: 'center',
               alignItems: 'center',
               position: 'relative',
               top: hp(7),
             }}
           >
             <Text
               style={{
                 color: '#fff',
                 fontSize: hp(2),
                 fontFamily: fontFamily.robotoMedium,
                 fontWeight: '400',
               }}
             >
               OK
             </Text>
           </TouchableOpacity>
         </View>
       </View>
      )} */}
    </View>
  );
};

export default Scanner;
