import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList,
    Modal,
    ActivityIndicator,
    StatusBar,
  } from 'react-native';
  import React, {useCallback, useEffect, useState} from 'react';
  import MainHeader from '../Components/Headers/MainHeader';
  import Search from '../Components/Search';
  import Icon from 'react-native-fontawesome-pro';
  import {speakerHandler} from '../features/speaker/speakerSlice';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import {Avatar} from 'react-native-elements';
  import { BottomSheet } from '@rneui/themed';
  import {
    Collapse,
    CollapseHeader,
    CollapseBody,
  } from 'accordion-collapse-react-native';
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import colors from '../Styles/colors';
  import fontFamily from '../Styles/fontFamily';
  import {useDispatch, useSelector} from 'react-redux';
  import {useFocusEffect} from '@react-navigation/native';
  import EStyleSheet from 'react-native-extended-stylesheet';
  import {getFavroitAttendeeHandler} from '../features/getFavouriteAttendee/favriotAttendeeSlice';
  import {userScheduleHandler} from '../features/userschedule/userScheduleSlice';
import { favroitStarHandler } from '../features/favroitmeeting/favroitMeetingSlice';
  const Favroitmeeting = props => {
    const dispatch = useDispatch();
    const [isVisible, setIsVisible] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [data, setData] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const favroitAttendeeData = useSelector(state => state.favroitAttendeeState);
      // console.log("favroitAttendeeData===",favroitAttendeeData?.user?.response?.data);
      const startStateFav = useSelector(state => state.favStarState);
        // console.log("startStateFav===",startStateFav?.user);
        // console.log("data===",data)
    const onPress = ({item}) => {};

    async function getData(key) {
      try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
          const parsedData = JSON.parse(value);
          setData(parsedData);
          // console.log('user id and event_id===', parsedData);
          // {"user_id":parsedData.user_id,"event_id":parsedData.event_id,"type_id":1}
          dispatch(
            getFavroitAttendeeHandler({
              user_id: parsedData?.event_user_id,
              event_id: parsedData?.event_id,
              admin_id: parsedData?.user_id,
            }),
          );
          return parsedData;
        }
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    }

    const favStarHandler=(item)=>{
      // console.log("fav fun==",item)
      dispatch(
        favroitStarHandler({
          user_id: data?.event_user_id,
          event_id: data?.event_id,
          admin_id: data?.user_id,
          fav_user_id:item?.user_id,
          fav_status:item?.fav_status ==='Y' ? 'N' :'Y'
        }),
      );
      getData('userSession');
    }
  

    // const getScheduleHandler = item => {
    //   setFname(item?.first_name);
    //   setLname(item?.last_name);
    //   setUserId(item?.user_id);
    //   dispatch(
    //     userScheduleHandler({
    //       user_id: data?.event_user_id,
    //       event_id: data?.event_id,
    //       admin_id: data?.user_id,
    //       requested_to:item?.userId
    //     }),
    //   );
    //   setIsVisible(true);
    // };

    useFocusEffect(
      useCallback(() => {
        getData('userSession');
      }, [dispatch]),
    );
    useEffect(() => {
      getData('userSession');
    }, [dispatch]);

    const filteredData = favroitAttendeeData?.user?.response?.data?.filter(item =>
      item.first_name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const renderItem = ({item, index}) => {
      const firstName = item?.first_name || '';
      const lastName = item?.last_name || '';
      // Get the first letter of each name
      const firstInitial = firstName.charAt(0).toUpperCase();
      const lastInitial = lastName.charAt(0).toUpperCase();
  
      // Combine the initials
      const avatarInitial = `${firstInitial}${lastInitial}`;
      return (
        <View
          style={{
            // flex: 0.1,
            flexDirection: 'row',
            backgroundColor: '#fff',
            height: hp(19),
            borderRadius: hp(1),
            borderWidth: 0.5,
            borderColor: '#cdcdcd',
            marginVertical: hp(1),
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
          }}>
          <View style={{flex: 1, margin: hp(1)}}>
            <View style={{flex: 0.33, flexDirection: 'row'}}>
              <View
                style={{
                  flex: 0.135,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: hp(50),
                  backgroundColor: '#EAA48B',
                }}>
                <Avatar
                  size="small"
                  rounded
                  title={avatarInitial}
                  onPress={() => console.log('Works!')}
                  activeOpacity={0.7}
                  titleStyle={{color: '#fff'}}
                />
              </View>
              <View
                style={{
                  flex: 0.5,
                  paddingLeft: hp(1),
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: colors.descBlack,
                    fontSize: hp(1.9),
                    flexWrap: 'wrap',
                    fontWeight: 'bold',
                    fontFamily: fontFamily.robotoBold,
                  }}
                  ellipsizeMode="tail"
                  numberOfLines={3}>
                  {item?.first_name} {item?.last_name}
                </Text>
                <Text
                  style={{
                    color: colors.descBlack,
                    fontSize: hp(1.7),
                    flexWrap: 'wrap',
                    fontWeight: '400',
                    fontFamily: fontFamily.robotoMedium,
                    paddingTop: hp(0),
                  }}
                  ellipsizeMode="tail"
                  numberOfLines={3}>
                  {item?.organization_name}
                </Text>
              </View>
              <View
                style={{
                  flex: 0.378,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: hp(50),
                  //   backgroundColor: 'blue',
                  flexDirection: 'row',
                }}>
                   <View
                style={{
                  flex: 0.3,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingLeft: hp(1),
                }}>
                {/* <Icon
                  type="regular"
                  name="thumbs-up"
                  size={hp(2.5)}
                  color="#888888"
                /> */}
              </View>
              <View
                style={{
                  flex: 0.3,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingLeft: hp(1),
                }}>
                {/* <Icon
                  type="regular"
                  name="envelope"
                  size={hp(2.5)}
                  color="#888888"
                /> */}
              </View>
              <TouchableOpacity
              onPress={()=>favStarHandler(item)}
                style={{
                  flex: 0.3,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  type={item?.fav_status === 'Y' ? 'solid' : 'regular'}
                  name="star"
                  size={hp(2.5)}
                  color="#832D8E"
                />
              </TouchableOpacity>
                {/* <View
                  style={{
                    flex: 0.3,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    type={item?.fav_status == 'Y' ? 'solid' : 'regular'}
                    name="star"
                    size={hp(2.5)}
                    color="#832D8E"
                  />
                </View>
                <View
                  style={{
                    flex: 0.3,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingLeft: hp(1),
                  }}>
                  <Icon
                    type="regular"
                    name="thumbs-up"
                    size={hp(2.5)}
                    color="#888888"
                  />
                </View>
                <View
                  style={{
                    flex: 0.3,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingLeft: hp(1),
                  }}>
                  <Icon
                    type="regular"
                    name="envelope"
                    size={hp(2.5)}
                    color="#888888"
                  />
                </View> */}
              </View>
            </View>
            <View
              style={{
                flex: 0.4,
                justifyContent: 'center',
                // backgroundColor:'green'
              }}>
              <View style={{flex: 1, justifyContent: 'center', margin: hp(1)}}>
                <Text
                  style={{
                    color: '#474747',
                    paddingLeft: hp(0),
                    fontSize: hp(1.6),
                    fontWeight: '400',
                    fontFamily: fontFamily.robotoMedium,
                  }}
                  numberOfLines={2}>
                  {item?.desc}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 0.27,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flex: 0.2,
                  backgroundColor: item?.city_name ? '#DDDDDD' : '#fff',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: hp(50),
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: hp(1.4),
                    fontWeight: '400',
                    fontFamily: fontFamily.robotoMedium,
                    padding: 2,
                  }}>
                  {item?.city_name}
                </Text>
              </View>
              <View
                style={{
                  flex: 0.25,
                  backgroundColor: item?.state_name ? '#DDDDDD' : '#fff',
                  marginHorizontal: 7,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: hp(50),
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: hp(1.4),
                    fontWeight: '400',
                    fontFamily: fontFamily.robotoMedium,
                    padding: 2,
                  }}>
                  {item?.state_name}
                </Text>
              </View>
              <View
                style={{
                  flex: 0.15,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: hp(50),
                }}>
                {/* <Text
                  style={{
                    color: '#832D8E',
                    fontSize: hp(1.6),
                    fontWeight: '400',
                    fontFamily: fontFamily.robotoMedium,
                    padding: 2,
                  }}>
                  +2 More
                </Text> */}
              </View>
              <View style={{flex: 0.1, backgroundColor: 'orange'}}></View>
              <TouchableOpacity
              
                style={{
                  flex: 0.3,
                  flexDirection: 'row',
                  backgroundColor: '#832D8E',
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: hp(50),
                }}>
                <View
                  style={{
                    flex: 0.2,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    type="regular"
                    name="calendar-days"
                    size={hp(2)}
                    color="#fff"
                  />
                </View>
                <View
                  style={{
                    flex: 0.8,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: hp(1.5),
                      fontWeight: '400',
                      fontFamily: fontFamily.robotoMedium,
                      paddingVertical: 0.5,
                    }}>
                    View Schedule
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    };

    return (
      <View style={{flex: 1}}>
        <StatusBar translucent backgroundColor="transparent" />
        <Modal
        visible={favroitAttendeeData?.isLoading}
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
          
        <View style={{flex: 0.1, marginTop: hp(2.5)}}>
          <View style={styles.headerChild}>
            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
              style={{flex: 0.15}}>
              <Icon type="solid" name="arrow-left" size={hp(3)} color="#832D8E" />
            </TouchableOpacity>
            <View style={{flex: 0.4, marginTop: hp(-0.5)}}>
              <Text style={styles.textstyle}>Favorites</Text>
            </View>
            <TouchableOpacity
              // onPress={() => setIsVisible(!isVisible)}
              style={{
                marginTop: hp(-1),
                flex: 0.5,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                //   backgroundColor: 'red',
              }}>
              <View
                style={{
                  flex: 0.55,
                  // backgroundColor: 'blue',
                  flexDirection: 'row',
                  height: hp(5),
                  borderRadius: hp(8),
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View style={{flex: 0.7}}></View>
                <View
                  style={{
                    flex: 0.3,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {/* <Icon
                    type="regular"
                    name="filter"
                    size={hp(3)}
                    color="#832D8E"
                  /> */}
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 0.03}}></View>
        <View style={{flex: 0.1, marginTop: hp(1)}}>
        <Search setSearchQuery={setSearchQuery} />
        </View>
  
        <View style={{flex: 0.8, marginHorizontal: hp(2.5)}}>
        <FlatList
          data={filteredData && filteredData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
        
        
      </View>
      </View>
    );
  };
  
  export default Favroitmeeting;
  
  const styles = EStyleSheet.create({
    headerChild: {
      marginTop: hp(6),
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: hp(2.5),
    },
    textstyle: {
      color: colors.blackColor,
      marginTop: hp(0),
      fontSize: hp(2.5),
      fontWeight: '600',
      fontFamily: fontFamily.robotoBold,
      fontStyle: 'normal',
    },
    testname: {
      color: colors.blackColor,
      fontSize: '0.75rem',
      fontFamily: fontFamily.robotoMedium,
      fontStyle: 'normal',
      fontWeight: '400',
    },
  });
  