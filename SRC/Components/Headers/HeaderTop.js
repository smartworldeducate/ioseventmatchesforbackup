import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-fontawesome-pro';
import fontFamily from '../../Styles/fontFamily';
import colors from '../../Styles/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
const HeaderTop = ({onPressIcon, onflterPress}) => {
  const navigation = useNavigation();
  const handleNavigate = (routeName, clearStack, params) => {
    navigation.navigate(routeName, params);
    if (clearStack) {
      console.log('Clear');
    }
  };
  return (
    <View style={s.container}>
      <View
        style={{
          flex: 0.1,
          justifyContent: 'center',
          paddingTop: hp(4.3),
          borderRadius: hp(50),
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            flex: 0.48,
            backgroundColor: 'red',
            marginTop: hp(1),
            backgroundColor: colors.lightBlue,
            borderRadius: hp(50),
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={onPressIcon}>
          <Icon type="solid" name="bars-sort" size={hp(2.3)} color="#fff" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 0.2,
          justifyContent: 'center',
          paddingTop: hp(5),
          paddingLeft: hp(2.5),
        }}>
        <Text
          style={{
            color: colors.blackColor,
            fontSize: hp(2.5),
            fontWeight: '600',
            fontFamily: fontFamily.robotoBold,
          }}>
          Home
        </Text>
      </View>

      <View style={{flex: 0.3, justifyContent: 'center'}}></View>

      <View style={{flex: 0.2, justifyContent: 'center', paddingTop: hp(5)}}>
        {/* <TouchableOpacity
          activeOpacity={0.8}
          style={{ alignItems: 'flex-end',position:'relative' }}
          onPress={() => { }}>
            <View style={{height:hp(2),width:wp(4),borderRadius:hp(50),backgroundColor:'red',zIndex:1,position:'absolute',top:hp(-1),right:hp(-0.7)}}>
              <View style={{justifyContent:'center',alignItems:'center',marginTop:hp(-0.3)}}>
              <Text style={{color:'#fff',fontSize:hp(2)}}>2</Text>
              </View>
              
            </View>
          <Icon type="regular" name="bell" size={hp(2.8)} color="#832D8E" />
        </TouchableOpacity> */}
      </View>

      <View style={{flex: 0.2, justifyContent: 'center', paddingTop: hp(5)}}>
        {/* <TouchableOpacity
          activeOpacity={0.8}
          style={{ alignItems: 'flex-end', marginRight: hp(1) }}
          onPress={()=>{}}>
            <Icon type="regular" name="filter" size={hp(2.8)} color="#832D8E" />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default HeaderTop;

const s = EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    // paddingTop:hp(1)
    // justifyContent: 'center',
    // height: hp(5),
    // backgroundColor:'red'
  },
});
