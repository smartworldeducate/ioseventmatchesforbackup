import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  ActivityIndicator,
  Alert
} from 'react-native';
import React, {useEffect, useState} from 'react';
import RNPrint from 'react-native-print';
import MainHeader from '../Components/Headers/MainHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import fontFamily from '../Styles/fontFamily';
import colors from '../Styles/colors';
const Printbadge = props => {
  const dispatch = useDispatch();
  const getPrintBadgeData = useSelector(state => state.getPrintBadgeState);
//   console.log('getPrintBadgeData===', getPrintBadgeData?.user?.response);

  const pdfUrl =getPrintBadgeData?.user?.response?.url;
  const handlePrint = async () => {
    if (!pdfUrl) {
      Alert.alert('Error', 'No PDF URL available');
      return;
    }

    try {
      await RNPrint.print({filePath: pdfUrl});
    } catch (error) {
      console.error('error', error);
      Alert.alert('Error', 'Failed to print PDF');
    }
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar
        barStyle={'default'}
        translucent
        backgroundColor="transparent"
      />

      <View style={{flex: 0.1, zIndex: 1}}>
        <MainHeader
          text={'Print Badge'}
          onpressBtn={() => props.navigation.goBack()}
        />
      </View>

      <View style={{flex: 0.6, justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            flex: 0.4,
            width: hp(40),
            justifyContent: 'center',
            alignItems: 'center',
            borderColor:'#cdcdcd',
            borderWidth:hp(0.2),
            paddingHorizontal:hp(2.5),
            borderRadius:hp(1)
            
          }}>
            <View style={{flex:0.5,justifyContent:'center',alignItems:'center'}}>
              <Text style={{
                color: colors.lightBlue,
                fontSize: hp(2),
                fontFamily: fontFamily.robotoMedium,
                fontWeight: '400',
              }}>Please click the Print button   below to print  your badge</Text>
            </View>
            <View style={{flex:0.1}}></View>
          <TouchableOpacity
            onPress={handlePrint}
            style={{
              height: hp(8),
              width: hp(30),
              borderWidth: 1,
              borderColor: '#cdcdcd',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: hp(1),
              borderColor:colors.lightBlue,
              borderWidth:hp(0.1),
              // backgroundColor: colors.lightBlue,
            }}>
            <Text
              style={{
                color: colors.lightBlue,
                fontSize: hp(3),
                fontFamily: fontFamily.robotoMedium,
                fontWeight: '400',
              }}>
              Print
            </Text>
          </TouchableOpacity>
        </View>

        {/* <View
          style={{
            flex: 0.3,
            width: hp(40),
            justifyContent: 'center',
            alignItems: 'center',
            borderColor:colors.lightBlue,
            borderWidth:hp(0.2),
            marginTop:hp(2.5),
            paddingHorizontal:hp(2.5)
          }}>
             <View style={{flex:0.5,justifyContent:'center',alignItems:'center'}}>
              <Text style={{
                color: colors.lightBlue,
                fontSize: hp(2),
                fontFamily: fontFamily.robotoMedium,
                fontWeight: '400',
              }}>Please click the Print button   below to print  your badge</Text>
            </View>
          <TouchableOpacity
            onPress={handlePrint}
            style={{
              height: hp(8),
              width: hp(30),
              borderWidth: 1,
              borderColor: '#cdcdcd',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: hp(1),
              backgroundColor: colors.lightBlue,
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: hp(3),
                fontFamily: fontFamily.robotoMedium,
                fontWeight: '400',
              }}>
              Preview
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );
};

export default Printbadge;
