import {
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Image,
  Platform,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {meetingHandler} from '../features/schedulemeeting/meetingSlice';
import {useDispatch, useSelector} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../Styles/colors';
import fontFamily from '../Styles/fontFamily';
import MainHeader from '../Components/Headers/MainHeader';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-fontawesome-pro';
import {Avatar} from 'react-native-elements';
const Matchmaking = props => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(false);
  const [adminData, setAdminData] = useState(null);

  return (
    <View style={{flex: 1}}>
      <StatusBar
        barStyle={'default'}
        translucent
        backgroundColor="transparent"
      />
      <View style={{flex: 0.15}}>
        <MainHeader
          text={'Matchmaking'}
          onpressBtn={() => props.navigation.goBack()}
        />
      </View>

      <View style={{flex: 0.85, marginHorizontal: hp(2)}}>
        <TouchableOpacity
         onPress={()=>props.navigation.navigate('Sechduleavailability')}
          style={[
            {
              marginBottom: hp(2),
              height: hp(11),
              flexDirection: 'row',
              backgroundColor: '#fff',
              borderRadius: hp(1.5),
            
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
          <View
            style={{
              flex: 0.2,
              borderBottomLeftRadius:hp(1),
              borderTopLeftRadius:hp(1),
              // paddingLeft:hp(1),
              // backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ImageBackground imageStyle={{borderRadius:hp('1')}} style={{height:'100%',width:'100%',borderBottomLeftRadius:hp(1),borderTopLeftRadius:hp(1)}} source={require('../Images/group1.png')} resizeMode='cover'>
              <View style={{flex:0.5,flexDirection:'row',position:'relative',top:hp(2.7)}}>
                <View style={{flex:0.4}}></View>
                <View style={{flex:0.6,backgroundColor:'#fff',justifyContent:'center',alignItems:'center',borderRadius:hp(50), ...(Platform.OS === 'ios'
              ? {
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                }
              : {
                  elevation: 5,
                }),}}>
                   <Icon
                      type="regular"
                      name="calendar-check"
                      size={hp(2)}
                      color="#EBCB80"
                    />
                </View>
              </View>
            </ImageBackground>
            </View>
          <View
            style={{flex: 0.6, justifyContent: 'center'}}>
            <Text
              style={{
                color: colors.blackColor,
                fontSize: hp(2.5),
                flexWrap: 'wrap',
                fontWeight: '600',
                fontFamily: fontFamily.robotoBold,
                textAlign:'left',
                paddingLeft:hp(3)
              }}
              ellipsizeMode="tail"
              numberOfLines={3}>
              Schedule Availability
            </Text>
          </View>
          <View
            style={{flex: 0.2, justifyContent: 'center', alignItems: 'center'}}>
            <Icon
              type="regular"
              name="arrow-right"
              size={hp(2)}
              color="#cdcdcd"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={()=>props.navigation.navigate('SearchMeeting')}
          style={[
            {
              marginBottom: hp(2),
              height: hp(11),
              flexDirection: 'row',
              backgroundColor: '#fff',
              borderRadius: hp(1.5),
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
          <View
            style={{
              flex: 0.2,
              // backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ImageBackground imageStyle={{borderRadius:hp('1')}} style={{height:'100%',width:'100%',borderBottomLeftRadius:hp(5),borderTopLeftRadius:hp(1)}} source={require('../Images/Group2.png')} >
              <View style={{flex:0.5,flexDirection:'row',position:'relative',top:hp(2.7)}}>
                <View style={{flex:0.4}}></View>
                <View style={{flex:0.6,backgroundColor:'#fff',justifyContent:'center',alignItems:'center',borderRadius:hp(50), ...(Platform.OS === 'ios'
              ? {
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                }
              : {
                  elevation: 5,
                }),}}>
                   <Icon
                      type="regular"
                      name="magnifying-glass"
                      size={hp(2)}
                      color="#EE4015"
                    />
                </View>
              </View>
            </ImageBackground>
            </View>
          <View
            style={{flex: 0.6, justifyContent: 'center', }}>
            <Text
              style={{
                color: colors.blackColor,
                fontSize: hp(2.5),
                flexWrap: 'wrap',
                fontWeight: '600',
                fontFamily: fontFamily.robotoBold,
                textAlign:'left',
                paddingLeft:hp(3)
              }}
              ellipsizeMode="tail"
              numberOfLines={3}>
              Search Meetings
            </Text>
          </View>
          <View
            style={{flex: 0.2, justifyContent: 'center', alignItems: 'center'}}>
            <Icon
              type="regular"
              name="arrow-right"
              size={hp(2)}
              color="#cdcdcd"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
         onPress={()=>props.navigation.navigate('Confirmdecline')}
          style={[
            {
              marginBottom: hp(2),
              height: hp(11),
              flexDirection: 'row',
              backgroundColor: '#fff',
              borderRadius: hp(1.5),
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
          <View
            style={{
              flex: 0.2,
              // backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ImageBackground imageStyle={{borderRadius:hp('1')}} style={{height:'100%',width:'100%',borderBottomLeftRadius:hp(5),borderTopLeftRadius:hp(1)}} source={require('../Images/Group3.png')} >
              <View style={{flex:0.5,flexDirection:'row',position:'relative',top:hp(2.7)}}>
                <View style={{flex:0.4}}></View>
                <View style={{flex:0.6,backgroundColor:'#fff',justifyContent:'center',alignItems:'center',borderRadius:hp(50), ...(Platform.OS === 'ios'
              ? {
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                }
              : {
                  elevation: 5,
                }),}}>
                   <Icon
                      type="regular"
                      name="check-double"
                      size={hp(2)}
                      color="#188FD7"
                    />
                </View>
              </View>
            </ImageBackground>
            </View>
          <View
            style={{flex: 0.6, justifyContent: 'center', }}>
            <Text
              style={{
                color: colors.blackColor,
                fontSize: hp(2.5),
                flexWrap: 'wrap',
                fontWeight: '600',
                fontFamily: fontFamily.robotoBold,
                textAlign:'left',
                paddingLeft:hp(3)
              }}
              ellipsizeMode="tail"
              numberOfLines={3}>
              Confirm / Decline
            </Text>
          </View>
          <View
            style={{flex: 0.2, justifyContent: 'center', alignItems: 'center'}}>
            <Icon
              type="regular"
              name="arrow-right"
              size={hp(2)}
              color="#cdcdcd"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={()=>props.navigation.navigate('Favroitmeeting')}
          style={[
            {
              marginBottom: hp(2),
              height: hp(11),
              flexDirection: 'row',
              backgroundColor: '#fff',
              borderRadius: hp(1.5),
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
          <View
            style={{
              flex: 0.2,
              // backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ImageBackground imageStyle={{borderRadius:hp('1')}} style={{height:'100%',width:'100%',borderBottomLeftRadius:hp(5),borderTopLeftRadius:hp(1)}} source={require('../Images/Group4.png')} >
              <View style={{flex:0.5,flexDirection:'row',position:'relative',top:hp(2.7)}}>
                <View style={{flex:0.4}}></View>
                <View style={{flex:0.6,backgroundColor:'#fff',justifyContent:'center',alignItems:'center',borderRadius:hp(50), ...(Platform.OS === 'ios'
              ? {
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                }
              : {
                  elevation: 5,
                }),}}>
                   <Icon
                      type="regular"
                      name="star"
                      size={hp(2)}
                      color="#44CD38"
                    />
                </View>
              </View>
            </ImageBackground>
            </View>
          <View
            style={{flex: 0.6, justifyContent: 'center', }}>
            <Text
              style={{
                color: colors.blackColor,
                fontSize: hp(2.5),
                flexWrap: 'wrap',
                fontWeight: '600',
                fontFamily: fontFamily.robotoBold,
                textAlign:'left',
                paddingLeft:hp(3)
              }}
              ellipsizeMode="tail"
              numberOfLines={3}>
              Favorites
            </Text>
          </View>
          <View
            style={{flex: 0.2, justifyContent: 'center', alignItems: 'center'}}>
            <Icon
              type="regular"
              name="arrow-right"
              size={hp(2)}
              color="#cdcdcd"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={()=>props.navigation.navigate('Shortlist')}
          style={[
            {
              marginBottom: hp(2),
              height: hp(11),
              flexDirection: 'row',
              backgroundColor: '#fff',
              borderRadius: hp(1.5),
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
          <View
            style={{
              flex: 0.2,
              // backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ImageBackground imageStyle={{borderRadius:hp('1')}} style={{height:'100%',width:'100%',borderBottomLeftRadius:hp(5),borderTopLeftRadius:hp(1)}} source={require('../Images/Group5.png')} >
              <View style={{flex:0.5,flexDirection:'row',position:'relative',top:hp(2.7)}}>
                <View style={{flex:0.4}}></View>
                <View style={{flex:0.6,backgroundColor:'#fff',justifyContent:'center',alignItems:'center',borderRadius:hp(50), ...(Platform.OS === 'ios'
              ? {
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                }
              : {
                  elevation: 5,
                }),}}>
                   <Icon
                      type="regular"
                      name="list"
                      size={hp(2)}
                      color="#44CD38"
                    />
                </View>
              </View>
            </ImageBackground>
            </View>
          <View
            style={{flex: 0.6, justifyContent: 'center', }}>
            <Text
              style={{
                color: colors.blackColor,
                fontSize: hp(2.5),
                flexWrap: 'wrap',
                fontWeight: '600',
                fontFamily: fontFamily.robotoBold,
                textAlign:'left',
                paddingLeft:hp(3)
              }}
              ellipsizeMode="tail"
              numberOfLines={3}>
              Shortlist for Matchmaker
            </Text>
          </View>
          <View
            style={{flex: 0.2, justifyContent: 'center', alignItems: 'center'}}>
            <Icon
              type="regular"
              name="arrow-right"
              size={hp(2)}
              color="#cdcdcd"
            />
          </View>
        </TouchableOpacity>
        
       
        
      </View>
    </View>
  );
};

export default Matchmaking;

const styles = EStyleSheet.create({});
