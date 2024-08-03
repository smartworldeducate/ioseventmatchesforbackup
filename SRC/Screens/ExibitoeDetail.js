import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import MainHeader from '../Components/Headers/MainHeader';
import fontFamily from '../Styles/fontFamily';
import colors from '../Styles/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const ExibitoeDetail = props => {
  const [abstract,setAbsract]=useState(true);
  const [booth,setBooth]=useState(false);

  const absHandler=()=>{
    setAbsract(true);
    setBooth(false);
  }
  const boothHandler=()=>{
    setAbsract(false);
    setBooth(true);
  }

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 0.1}}>
        <MainHeader
          text={'Exibitor'}
          onpressBtn={() => props.navigation.goBack()}
        />
      </View>
      <View style={{flex: 0.02}}></View>
      <View style={{flex: 0.2, backgroundColor: 'red'}}>
        <Image
          style={{width: '100%', height: '100%'}}
          source={{uri: 'banerone'}}
          resizeMode="contain"
        />
      </View>
      <View
        style={{
          flex: 0.1,
          justifyContent: 'center',
          marginHorizontal: hp(2.5),
        }}>
        <Text style={{color:colors.blackColor, fontSize: hp(2.5), fontWeight: '500',fontFamily:fontFamily.robotoMedium}}>
          Nestle Corporation
        </Text>
      </View>

      <View
        style={{
          flex: 0.06,
          justifyContent: 'center',
          marginHorizontal: hp(2.5),
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
        onPress={absHandler}
          style={{
            flex: 0.4,
            borderColor:colors.lightBlue,
            borderWidth:1,
            backgroundColor:abstract ? colors.lightBlue:null,
            borderRadius: hp(10),
            height: hp(6.2),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color:abstract ? '#fff':'#832D8E', fontSize: hp(2), fontWeight: '400',fontFamily:fontFamily.robotoMedium}}>
            ABSTRACT
          </Text>
        </TouchableOpacity>
        <View style={{flex: 0.07}}></View>
        <TouchableOpacity
        onPress={boothHandler}
          style={{
            flex: 0.4,
            borderColor: colors.lightBlue,
            backgroundColor:booth ? colors.lightBlue:null,
            borderWidth:1,
            borderRadius: hp(10),
            height: hp(6.2),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color:booth ? '#fff':'#832D8E', fontSize: hp(2), fontWeight: '400',fontFamily:fontFamily.robotoMedium}}>
            BOOTH
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{flex: 0.45, marginHorizontal: hp(2.5)}}>
        <Text
          style={{
            color: colors.longDescColor,
            fontSize: hp(2),
            lineHeight: hp(3),
            letterSpacing: hp(0.2),
            fontWeight: '300',
            paddingVertical: hp(1),
            fontFamily:fontFamily.robotoLight
            
          }}>
          {/* Enjoy your favorite dish and a lovely your friends and family and have
          a great time. Food from local food trucks will be available for
          purchase. Enjoy your favorite dish and a lovely your friends and
          family and have a great time. Food from local food trucks will be
          available for purchase. Enjoy your favorite dish and a lovely your
          friends and family and have a great time. Food from local food trucks
          will be available for purchase. Enjoy your favorite dish and a lovely
          your friends and family and have a great time. Food from local food
          trucks will be available for purchase. */}
        </Text>
      </View>

      <View style={{flex: 0.07, backgroundColor: '#fff'}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: hp(1),
          }}>
          <View style={{flex: 0.25}}>
            <Image
              style={{width: '100%', height: '100%', paddingTop: hp(2)}}
              source={{uri: 'icon4'}}
              resizeMode="contain"
            />
          </View>
          <View style={{flex: 0.25}}>
            <Image
              style={{width: '100%', height: '100%', paddingTop: hp(2)}}
              source={{uri: 'icon3'}}
              resizeMode="contain"
            />
          </View>
          <View style={{flex: 0.25}}>
            <Image
              style={{width: '100%', height: '100%', paddingTop: hp(2)}}
              source={{uri: 'iconone'}}
              resizeMode="contain"
            />
          </View>
          <View style={{flex: 0.25}}>
            <Image
              style={{width: '100%', height: '100%', paddingTop: hp(2)}}
              source={{uri: 'icontwo'}}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ExibitoeDetail;
