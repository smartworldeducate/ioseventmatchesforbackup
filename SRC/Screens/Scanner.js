import {
  View,
  Text,
  Modal,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-fontawesome-pro';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import QRCodeScanner from 'react-native-qrcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MainHeader from '../Components/Headers/MainHeader';
import {scanerPostHandler} from '../features/scanerpostdata/scanerPostSlice';
import fontFamily from '../Styles/fontFamily';
import { useFocusEffect } from '@react-navigation/native';
const Scanner = props => {
  const dispatch = useDispatch();
  const [data, setData] = useState('');
  const [close,setClose]=useState(false);
  const scanPostData = useSelector(state => state.scanPostState);
  // console.log('scanPostData===', scanPostData?.user?.response?.message);
  const [state, setState] = useState({
    scan: true,
    ScanResult: false,
    result: '',
  });
  const {scan, ScanResult, result} = state;
  const scanner = useRef(null);

  async function getData(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        const parsedData = JSON.parse(value);
        setData(parsedData);
        scanAgain();
        // console.log('user id and event_id===', parsedData);
        // {"user_id":parsedData.user_id,"event_id":parsedData.event_id,"type_id":1}
        // dispatch(
        //   getFavroitAttendeeHandler({
        //     user_id: parsedData?.event_user_id,
        //     event_id: parsedData?.event_id,
        //     admin_id: parsedData?.user_id,
        //   }),
        // );
        return parsedData;
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  }

  const closeAndNavigateHandler=()=>{
    props.navigation.goBack();
    setClose(false);

  }

  useFocusEffect(
    useCallback(() => {
      getData('userSession');
    }, [dispatch]),
  );

  useEffect(() => {
    getData('userSession');
  }, []);

  const onSuccess = async e => {
    // console.log("e data===",e?.data)
    const check = e.data.substring(0, 4);
    setState({
      result: e,
      scan: false,
      ScanResult: true,
    });
    setClose(true);
    if (check === 'http') {
      Linking.openURL(e.data).catch(err =>
        console.error('An error occured', err),
      );
    } else {
      dispatch(
        scanerPostHandler({
          user_id: data?.event_user_id,
          event_id: data?.event_id,
          admin_id: data?.user_id,
          qr_code:e?.data
        }),
      );

      setState({
        result: e.data,
        scan: false,
        ScanResult: true,
      });
      // const catData = await dispatch(
      //   getSingleTag({employee_id: localData?.EMPLOYEE_ID}),
      // );
      // await setTagData(catData?.payload?.data);
      // setVisible(false);
      // console.log('scan data', e.data);
      // setModalState(true);
    }
  };

  const activeQR = e => {
    setState({
      scan: true,
    });
  };

  const scanAgain = () => {
    setState({
      scan: true,
      ScanResult: false,
    });
    // addCode(state.result);
  };

  const handleQrcode = () => {
    // setShow(true)
    setVisible(true);
    activeQR('active qr');
  };

  const handleReset = () => {
    setState({scan: false});
    setVisible(false);
  };
  return (
    <View style={{flex: 1}}>
      <Modal
        visible={scanPostData?.isLoading}
        transparent={true}
        animationType="fade">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              width: wp(25),
              height: hp(12.5),
              backgroundColor: 'white',
              borderRadius: hp(1),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size="large" color="#cdcdcd" />
          </View>
        </View>
      </Modal>
      <Modal
        visible={close}
        transparent={true}
        animationType="fade">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
            {/* <TouchableOpacity onPress={()=>setClose(false)} style={{position:'relative',top:hp(2),left:hp(14),zIndex:7,backgroundColor:'red',borderRadius:hp(50),width:hp(3),height:hp(3),justifyContent:'center',alignItems:'center'}}>
            <Icon
                  type="light"
                  name="xmark"
                  size={hp(1.5)}
                  color="#fff"
                />
            </TouchableOpacity> */}
          <View
            style={{
              width: wp(60),
              height: hp(30),
              backgroundColor: 'white',
              borderRadius: hp(1),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              {/* <Text style={{color:'red'}}>{state?.result}</Text> */}

              <Text style={{color:'#000',fontSize: hp(2),
                    fontFamily: fontFamily.robotoMedium,
                    fontWeight: '400',}}>{scanPostData?.user?.response?.message}</Text>
            {/* <ActivityIndicator size="large" color="#cdcdcd" /> */}
            <TouchableOpacity onPress={closeAndNavigateHandler} style={{backgroundColor:'#832D8E',borderRadius:hp(50),width:hp(10),height:hp(4.5),justifyContent:'center',alignItems:'center',position:'relative',top:hp(7)}}>
            {/* <Icon
                  type="light"
                  name="xmark"
                  size={hp(1.5)}
                  color="#fff"
                /> */}
                <Text style={{
                    color: '#fff',
                    fontSize: hp(2),
                    fontFamily: fontFamily.robotoMedium,
                    fontWeight: '400',
                  }}>OK</Text>
            </TouchableOpacity>
          </View>
          
        </View>
      </Modal>
      <View style={{flex: 0.1}}>
        <MainHeader
          text={'Scanner'}
          onpressBtn={() => props.navigation.goBack()}
        />
      </View>
      <View style={{flex: 0.9}}>
        {ScanResult && (
          <>
            <View style={{flex: 1, flexDirection: 'row',margin:hp(2),justifyContent:'center',alignItems:'center'}}>
             
              {/* <TouchableOpacity
                onPress={scanAgain}
                style={{
                  flex: 0.5,
                  height: hp(7),
                  borderWidth: 1,
                  borderColor: '#cdcdcd',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: hp(1),
                  backgroundColor:'#832D8E'
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: hp(3),
                    fontFamily: fontFamily.robotoMedium,
                    fontWeight: '400',
                  }}>
                  Scan Again
                </Text>
              </TouchableOpacity> */}
            </View>
          </>
        )}

        {scan && (
          <QRCodeScanner
            cameraStyl={{height: hp(120)}}
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
                }}></View>
            }
          />
        )}
      </View>
    </View>
  );
};

export default Scanner;
