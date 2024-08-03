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
import {ssearchMeetingHandler} from '../features/serchmeeting/searchMeeetingSlice';
import {userScheduleHandler} from '../features/userschedule/userScheduleSlice';
import {favroitStarHandler} from '../features/favroitmeeting/favroitMeetingSlice';
import {bookUserHandler} from '../features/bookuserstatus/bookSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Avatar} from 'react-native-elements';
import {BottomSheet} from '@rneui/themed';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../Styles/colors';
import fontFamily from '../Styles/fontFamily';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import EStyleSheet from 'react-native-extended-stylesheet';

import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
const SearchMeeting = props => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [userId, setUserId] = useState('');
  const [favStatus, setFavStatus] = useState('N');
  const searchMettingData = useSelector(state => state.searchMeetingSatte);
  // console.log("searchMettingData===",searchMettingData?.user);
  const bookState = useSelector(state => state.bookState);
  // console.log("bookState===",bookState?.user);
  const startStateFav = useSelector(state => state.favStarState);
//   console.log("startStateFav===",startStateFav?.user);
// console.log("data===",data)
  const getUserData = useSelector(state => state.userScheduleState);
  const activity_id = getUserData?.user?.response?.data?.['1453']?.activity_id;
  // console.log(
  //   'getUserData===',
  //   getUserData?.user?.response
  // );

  const onPress = ({item}) => {};
  const bookUserMeetingHandler=async(item)=>{
    // console.log("bookUserMeetingHandler  ===",item);
   await dispatch(
    bookUserHandler({
      user_id: data?.event_user_id,
      event_id: data?.event_id,
      admin_id: data?.user_id,
      activity_id:activity_id,
      activity_detail_id:item?.activity_detail_id,
      requested_to:userId,
      action:'Y',
      match_status:1
      }),
    );
    getData('userSession');
    setIsVisible(false);
  }
  async function getData(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        const parsedData = JSON.parse(value);
        setData(parsedData);
        // console.log('user id and event_id===', parsedData);
        // {"user_id":parsedData.user_id,"event_id":parsedData.event_id,"type_id":1}
        dispatch(
          ssearchMeetingHandler({
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

  const getScheduleHandler = item => {
    // console.log("getScheduleHandler item===",item)
    setFname(item?.first_name);
    setLname(item?.last_name);
    setUserId(item?.user_id);
    dispatch(
      userScheduleHandler({
        user_id: data?.event_user_id,
        event_id: data?.event_id,
        admin_id: data?.user_id,
        requested_to:item?.user_id,
      }),
    );
    setIsVisible(true);
  };

  const favStarHandler=(item)=>{
    setFavStatus(prevStatus => (prevStatus === 'Y' ? 'N' : 'Y'));
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

  useFocusEffect(
    useCallback(() => {
      getData('userSession');
    }, [dispatch]),
  );
  useEffect(() => {
    getData('userSession');
  }, [dispatch]);

  const filteredData = searchMettingData?.user?.response?.filter(item =>
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
                backgroundColor: '#DDDDDD',
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
                backgroundColor: '#DDDDDD',
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
              <Text
                style={{
                  color: '#832D8E',
                  fontSize: hp(1.6),
                  fontWeight: '400',
                  fontFamily: fontFamily.robotoMedium,
                  padding: 2,
                }}>
                +2 More
              </Text>
            </View>
            <View style={{flex: 0.1, backgroundColor: 'orange'}}></View>
            <TouchableOpacity
              onPress={() => getScheduleHandler(item)}
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

  const renderItemSchedule = ({item, index}) => {
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
          height: hp(5),
          marginHorizontal: hp(2),
          flexDirection: 'row',
        }}>
        <View style={{justifyContent: 'center', flex: 0.88}}>
          <Text style={styles.testname}>
            {item?.start_time} - {item?.end_time}
          </Text>
        </View>
        <TouchableOpacity onPress={()=>bookUserMeetingHandler(item)} style={{justifyContent: 'center'}}>
        {item?.match_status == 0
              ? <Text
              style={{
                textAlign: 'right',
                color: '#58D68D',
                fontSize: hp(1.7),
                fontWeight: '600',
                fontFamily: fontFamily.robotoBold,
              }}>REQUEST NOW</Text>
              : item?.match_status == 1
              ? <Text
              style={{
                textAlign: 'right',
                color: '#FFAE00',
                fontSize: hp(1.7),
                fontWeight: '600',
                fontFamily: fontFamily.robotoBold,
              }}>PENDING</Text>
              : item?.match_status == 2
              ? <Text
              style={{
                textAlign: 'right',
                color: '#58D68D',
                fontSize: hp(1.7),
                fontWeight: '600',
                fontFamily: fontFamily.robotoBold,
              }}>ACCEPTED</Text>
              : item?.match_status == 3
              ? <Text
              style={{
                textAlign: 'right',
                color: '#E74C3C',
                fontSize: hp(1.7),
                fontWeight: '600',
                fontFamily: fontFamily.robotoBold,
              }}>DECLINED</Text>
              : ''}
          {/* <Text
            style={{
              textAlign: 'right',
              color: '#FFAE00',
              fontSize: hp(1.7),
              fontWeight: '600',
              fontFamily: fontFamily.robotoBold,
            }}>
            {item?.match_status == 0
              ? 'REQUEST NOW'
              : item?.match_status == 1
              ? 'PENDING'
              : item?.match_status == 2
              ? 'ACCEPTED'
              : item?.match_status == 3
              ? 'DECLINED'
              : ''}
          </Text> */}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar translucent backgroundColor="transparent" />
      <Modal
        visible={searchMettingData?.isLoading || bookState?.isLoading}
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
      <BottomSheet
        isVisible={isVisible}
        style={{
          flex: 1,
          backgroundColor: '#F7F9F9',
          borderTopLeftRadius: hp(3),
          borderTopRightRadius: hp(3),
          marginTop: hp(3),
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 6},
          shadowOpacity: 0.25,
          shadowRadius: 6,
          padding: 25,
        }}>
        <TouchableOpacity
          onPress={() => setIsVisible(false)}
          style={{
            flex: 0.05,
            height: hp(2),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name="minus" size={hp(10)} color="#cdcdcd" />
        </TouchableOpacity>

        <View
          style={{
            flex: 0.1,
            height: hp(8),
            flexDirection: 'row',
            backgroundColor: '#FDEDEC',
            alignItems: 'center',
            marginTop: hp(4),
            borderRadius: hp(1),
          }}>
          <View style={{flex: 0.4, margin: hp(2)}}>
            <Text
              style={{
                color: colors.descBlack,
                fontSize: hp(2.3),
                flexWrap: 'wrap',
                fontWeight: 'bold',
                fontFamily: fontFamily.robotoBold,
              }}
              ellipsizeMode="tail"
              numberOfLines={3}>
              {fname}
            </Text>
            <Text
              style={{
                color: colors.descBlack,
                fontSize: hp(2.2),
                flexWrap: 'wrap',
                fontWeight: '400',
                fontFamily: fontFamily.robotoMedium,
                paddingTop: hp(0),
              }}
              ellipsizeMode="tail"
              numberOfLines={3}>
              {lname}
            </Text>
          </View>
          <View style={{flex: 0.6}}>
            <Text
              style={{
                color: '#666666',
                fontSize: hp(2),
                flexWrap: 'wrap',
                fontWeight: '600',
                fontFamily: fontFamily.robotoBold,
                paddingTop: hp(0),
              }}
              ellipsizeMode="tail"
              numberOfLines={3}>
             {getUserData?.user?.response?.data?.['1453']?.details[0]?.activity_type_name}
            </Text>
          </View>
        </View>

        <View
          style={{
            justifyContent: 'center',
            marginTop: hp(2),
            backgroundColor: 'white',
            borderRadius: hp(1),
            marginBottom: hp(2),
            elevation: 1, 
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 6}, 
            shadowOpacity: 0.25,
            shadowRadius: 5, 
            shadowOffset: {width: 3, height: 3},
          }}>
          <Collapse isExpanded={expanded} onToggle={e => onPress(e)}>
            <CollapseHeader
              style={{
                height: hp(6),
                marginHorizontal: hp(2),
                flexDirection: 'row',
                alignItems: 'center',
                // backgroundColor:'red'
              }}>
              <View style={{flex: 0.9}}>
                <Text
                  style={{
                    color: '#000',
                    fontSize: hp(2),
                    fontWeight: '600',
                    fontFamily: fontFamily.robotoBold,
                  }}>
                  {getUserData?.user?.response?.data?.['1453']?.activity_name}
                </Text>
              </View>
              <View style={{flex: 0.1, alignItems: 'flex-end'}}>
                <Icon
                  type="regular"
                  name="angle-down"
                  size={hp(2.5)}
                  color="#000"
                />
              </View>
            </CollapseHeader>
            <CollapseBody style={{marginHorizontal: hp(0)}}>
              <View
                style={{height: 1, flex: 1, backgroundColor: '#000'}}></View>
              <FlatList
                data={getUserData?.user?.response?.data?.['1453']?.details}
                renderItem={renderItemSchedule}
                keyExtractor={(item, index) => index.toString()}
              />
             
            </CollapseBody>
          </Collapse>
        </View>

        <View
          style={{
            flex: 0.2,
            flexDirection: 'row',
            marginTop: hp(3),
            marginTop: hp(6),
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => setIsVisible(false)}
            style={{
              flex: 0.5,
              height: hp(7),
              borderWidth: 1,
              borderColor: '#cdcdcd',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: hp(1),
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: hp(3),
                fontFamily: fontFamily.robotoMedium,
                fontWeight: '400',
              }}>
              CLOSE
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
      <View style={{flex: 0.1, marginTop: hp(2.5)}}>
        <View style={styles.headerChild}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{flex: 0.15}}>
            <Icon type="solid" name="arrow-left" size={hp(3)} color="#832D8E" />
          </TouchableOpacity>
          <View style={{flex: 0.8, marginTop: hp(-0.5)}}>
            <Text style={styles.textstyle}>Search Meeting</Text>
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
                <Icon
                  type="regular"
                  name="filter"
                  size={hp(3)}
                  color="#832D8E"
                />
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
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default SearchMeeting;

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
