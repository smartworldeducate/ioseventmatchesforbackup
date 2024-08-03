import React, {useRef} from 'react';
import Swiper from 'react-native-swiper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import fontFamily from '../Styles/fontFamily';

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ImageBackground,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import colors from '../Styles/colors';
const NextScreen = props => {
  const swiperRef = useRef(null);
  const handleSkip = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1);
    }
  };
  const handleSkip2 = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1);
    }
  };
  const handleSkip1 = () => {
    if (swiperRef.current) {
      //   swiperRef.current.scrollBy(1);
      props.navigation.navigate('SigninScreen');
    }
  };
  return (
    <View
      style={{
        flex: 1,
      }}>
      <StatusBar
        barStyle={'default'}
        translucent
        backgroundColor="transparent"
      />
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        ref={swiperRef}
        activeDot={
          <View
            style={{
              backgroundColor: 'white',
              width: 8,
              height: 8,
              borderRadius: 4,
              marginLeft: 3,
              marginRight: 3,
              marginTop: 3,
              marginBottom: 3,
            }}
          />
        }>
        <View style={styles.slide1}>
          <ImageBackground
            source={require('../assets/image/firstbaner.png')}
            style={{width: '100%', height: '100%'}}
            resizeMode={'contain'}></ImageBackground>
          <View
            style={{
              width: wp(100),
              backgroundColor: colors.lightBlue,
              height: hp(40),
              marginTop: hp(-34),
              borderTopLeftRadius: hp(4.5),
              borderTopRightRadius: hp(4.5),
              alignItems: 'center',
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: hp(4.5),
                marginHorizontal: hp(2.5),
              }}>
              <Text style={styles.text}>Explore Upcoming and Nearby</Text>
              <Text style={styles.text}>Events</Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: hp(4.5),
                marginHorizontal: hp(2.5),
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontWeight: '400',
                  fontSize: hp(2),
                  fontWeight: '400',
                  fontFamily: fontFamily.robotoBold,
                }}>
                In publishing and graphic design, Lorem is a
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontWeight: '400',
                  fontSize: hp(2),
                  fontFamily: fontFamily.robotoLight,
                }}>
                placeholder text commonly{' '}
              </Text>
            </View>
          </View>
          <View
            style={{
              height: hp(10),
              marginTop: hp(-12),
              marginHorizontal: hp(2.5),
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity onPress={handleSkip1}>
              <Text style={{color: '#fff', fontSize: hp(2.5)}}>SKIP</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSkip}>
              <Text style={{color: '#fff', fontSize: hp(2.5)}}>NEXT</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.slide2}>
          <ImageBackground
            source={require('../assets/image/banerfore.png')}
            style={{width: '100%', height: '100%'}}
            resizeMode={'contain'}></ImageBackground>
          <View
            style={{
              width: wp(100),
              backgroundColor: colors.lightBlue,
              height: hp(40),
              marginTop: hp(-34),
              borderTopLeftRadius: hp(4.5),
              borderTopRightRadius: hp(4.5),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: hp(-16),
                marginHorizontal: hp(2.5),
              }}>
              <Text style={styles.text}>Web Have Modern Events</Text>
              <Text style={styles.text}>Calendar Feature </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: hp(4.5),
                marginHorizontal: hp(2.5),
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontWeight: '400',
                  fontSize: hp(2),
                  fontFamily: fontFamily.robotoMedium,
                }}>
                In publishing and graphic design, Lorem
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontWeight: '400',
                  fontSize: hp(2),
                  fontFamily: fontFamily.robotoMedium,
                }}>
                is a placeholder text commonly
              </Text>
            </View>
          </View>
          <View
            style={{
              height: hp(10),
              marginTop: hp(-12),
              marginHorizontal: hp(2.5),
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity onPress={handleSkip1}>
              <Text style={{color: '#fff', fontSize: hp(2.5)}}>SKIP</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSkip2}>
              <Text style={{color: '#fff', fontSize: hp(2.5)}}>NEXT</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.slide3}>
          <ImageBackground
            source={require('../assets/image/bannerthree.png')}
            style={{width: '100%', height: '100%'}}
            resizeMode={'contain'}></ImageBackground>
          <View
            style={{
              width: wp(100),
              backgroundColor: colors.lightBlue,
              height: hp(40),
              marginTop: hp(-34),
              borderTopLeftRadius: hp(4.5),
              borderTopRightRadius: hp(4.5),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: hp(-16),
                marginHorizontal: hp(2.5),
              }}>
              <Text style={styles.text}>To Look Up More Events or</Text>
              <Text style={styles.text}>Activities Nearby By Map</Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: hp(4.5),
                marginHorizontal: hp(2.5),
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontWeight: '400',
                  fontSize: hp(2),
                  fontFamily: fontFamily.robotoMedium,
                }}>
                In publishing and graphic design, Lorem is a
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontWeight: '400',
                  fontSize: hp(2),
                  fontFamily: fontFamily.robotoMedium,
                }}>
                placeholder text commonly
              </Text>
            </View>
          </View>
          <View
            style={{
              height: hp(10),
              marginTop: hp(-12),
              marginHorizontal: hp(2.5),
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity onPress={handleSkip1}>
              <Text style={{color: '#fff', fontSize: hp(2.5)}}>SKIP</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSkip1}>
              <Text style={{color: '#fff', fontSize: hp(2.5)}}>NEXT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Swiper>
    </View>
  );
};

export default NextScreen;
const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    marginTop: hp(-30),
  },
  slide2: {
    flex: 1,
    marginTop: hp(-30),
  },
  slide3: {
    flex: 1,
    marginTop: hp(-30),
  },
  text: {
    color: '#fff',
    fontSize: hp(2.5),
    fontWeight: '600',
    fontFamily: fontFamily.robotoBold,
  },
});
