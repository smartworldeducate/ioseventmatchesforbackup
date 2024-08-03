import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  useLinkProps,
  useNavigation,
  CommonActions,
} from '@react-navigation/native';
import Icon from 'react-native-vector-icons//FontAwesome5';
import colors from '../../Styles/colors';

const HeaderSecond = ({
  timeInText,
  timeIn,
  empImg,
  empName,
  empDesignation,
}) => {
  const navigation = useNavigation();
  const handleNavigate = (routeName, clearStack, params) => {
    navigation.navigate(routeName, params);
    if (clearStack) {
      console.log('Clear');
    }
  };

  return (
    <View
      style={{
        height: hp('20'),
        marginRight: wp('12'),
        backgroundColor: colors.loginIconColor,
        borderTopEndRadius: wp('12'),
        borderBottomEndRadius: wp('12'),
      }}>
      <View style={{}}>
        <View style={{paddingTop: wp('2'), paddingLeft: wp('3')}}>
          <Text
            style={{
              fontSize: hp('1.65'),
              color: colors.whiteColor,
              lineHeight: 15,
            }}>
            {`${timeInText} `}
            <Text style={{fontSize: hp('1.65'), fontWeight: 'bold'}}>
              {timeIn}
            </Text>
          </Text>
        </View>
      </View>

      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 0.35}}>
          <View
            style={{
              height: hp('15'),
              width: wp('30'),
              marginTop: hp('3'),
              borderWidth: wp('3'),
              marginLeft: wp('-7'),
              borderColor: colors.whiteColor,
              backgroundColor: colors.loginIconColor,
              borderRadius: wp('25'),
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: hp('3'),
              }}>
              <Icon name={'laptop-code'} color={colors.whiteColor} size={30} />
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 0.6,
            flexDirection: 'column',
            marginTop: hp('-3'),
          }}>
          <View
            style={{
              flex: 0.65,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <Image
              source={{uri: empImg}}
              style={{
                height: hp('11'),
                width: wp('22'),
                borderColor: colors.whiteColor,
                borderRadius: wp('15'),
                borderWidth: wp('2'),
              }}
              resizeMode={'contain'}
            />
          </View>
          <View style={{flex: 0.25, alignItems:"flex-end"}}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                fontSize: hp('2'),
                color: colors.whiteColor,
                fontWeight: 'bold',
              }}>
              {empName}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                fontSize: hp('1.4'),
                color: colors.whiteColor,
              }}>
              {empDesignation}
            </Text>
          </View>
        </View>

        <View
          style={{
            flex: 0.1,
            flexDirection: 'column',
            marginTop: hp('-3'),
          }}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default HeaderSecond;
