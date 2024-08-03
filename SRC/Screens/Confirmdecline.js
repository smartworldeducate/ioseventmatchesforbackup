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
  Dimensions,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Icon from 'react-native-fontawesome-pro';
import {bookUserHandler} from '../features/bookuserstatus/bookSlice';
import {getDeclineHandler} from '../features/decline/confirmDeclineSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Avatar} from 'react-native-elements';
import {Switch} from 'galio-framework';
import {BottomSheet} from '@rneui/themed';
import {Div, ThemeProvider, Radio} from 'react-native-magnus';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../Styles/colors';
import fontFamily from '../Styles/fontFamily';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {CheckBox} from '@rneui/themed';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
const Confirmdecline = props => {
  const dispatch = useDispatch();
  const [expanded, setExpended] = useState(false);
  // const [isPoll, setIsPoll] = useState(false);
  // const [selectedIndex, setIndex] = React.useState(0);
  // const [withPay, setWithPay] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedVlue, setSelectedVlue] = useState(null);
  const [selectedVlueMyRequest, setSelectedVlueMyRequest] = useState(null);
  const [activityId, setActivityId] = useState('');
  const [activityDetailId, setActivityDetailId] = useState('');
  const getDeclineData = useSelector(state => state.getDeclineState);
  const bookState = useSelector(state => state.bookState);
  // console.log("bookState===",bookState?.user);

  // console.log('bookState===', bookState?.user?.responseData?.response?.data);

  // console.log(
  //   'getDeclineData===',
  //   getDeclineData?.user?.response?.activity_detail_a_r,
  // );

  // console.log("selectedVlue===",selectedVlue);
  // console.log("resquest===",selectedVlueMyRequest);
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
          getDeclineHandler({
            user_id: parsedData?.event_user_id,
            event_id: parsedData?.event_id,
            admin_id: parsedData?.user_id,
            filter_match_status: selectedVlue,
            mine_request: selectedVlueMyRequest,
          }),
        );
        // dispatch(
        //   getDeclineHandler({
        //     user_id: 46640,
        //     event_id: 439,
        //     admin_id: 1425,
        //     filter_match_status:selectedVlue,
        //     mine_request:selectedVlue
        //   }),
        // );
        return parsedData;
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  }

  const bookUserMeetingHandler = (userId, status) => {
    // console.log('bookUserMeetingHandler userId ===', userId,status);
    dispatch(
      bookUserHandler({
        user_id: data?.event_user_id,
        event_id: data?.event_id,
        admin_id: data?.user_id,
        activity_id: activityId,
        activity_detail_id: activityDetailId,
        requested_to: userId,
        action: 'Y',
        match_status: status,
      }),
    );
    getData('userSession');
  };
  const handleRadioChange = option => {
    if (option == 'Pending') {
      setSelectedVlue(1);
      // getData('userSession');
      setIsVisible(false);
    } else if (option == 'Confirmed') {
      setSelectedVlue(2);
      // getData('userSession');
      setIsVisible(false);
    } else if (option == 'ALL') {
      setSelectedVlue('');
      setSelectedVlueMyRequest('');
      // getData('userSession');
      setIsVisible(false);
    } else if (option == 'Declined') {
      setSelectedVlue(3);
      // getData('userSession');
      setIsVisible(false);
    } else if (option == 'My Requests') {
      setSelectedVlueMyRequest(4);
      // getData('userSession');
      setIsVisible(false);
    }
    setSelectedOption(option);
  };

  useFocusEffect(
    useCallback(() => {
      getData('userSession');
    }, []),
  );
  useEffect(() => {
    getData('userSession');
  }, [selectedVlue, selectedVlueMyRequest, dispatch]);
  const renderItemCard = ({item, index}) => {
    // console.log("item Card==",item);

    const firstName = item?.first_name || '';
    const lastName = item?.last_name || '';
    // setUserId(item?.user_id);
    // Get the first letter of each name
    const firstInitial = firstName.charAt(0).toUpperCase();
    const lastInitial = lastName.charAt(0).toUpperCase();

    // Combine the initials
    const avatarInitial = `${firstInitial}${lastInitial}`;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          // flex: 0.1,
          flexDirection: 'row',
          backgroundColor: '#fff',
          height: hp(16),
          borderRadius: hp(1),
          // borderWidth: 0.5,
          // borderColor: '#cdcdcd',
          marginVertical: hp(1),
          marginHorizontal: hp(2),
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
                flex: 0.123,
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
                flex: 0.88,
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
                {item?.first_name}
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
                {item?.last_name}{' '}
                {item?.match_status === '1' &&
                  item?.mine_request === '1' &&
                  'is yet to confirm/decline the meeting request'}
                {item?.match_status === '2' &&
                  item?.mine_request === '1' &&
                  'has confirmed your meeting request'}
                {item?.match_status === '3' &&
                  item?.mine_request === '1' &&
                  'is yet to decline the meeting request'}
                {item?.match_status === '2' &&
                  item?.mine_request === '0' &&
                  'is yet to confirm/decline the meeting request'}
                {item?.match_status === '1' &&
                  item?.mine_request === '0' &&
                  'is yet to confirm/decline the meeting request'}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 0.4,
              justifyContent: 'center',
              // backgroundColor:'green'
            }}>
            <View style={{flex: 1, margin: hp(1), flexDirection: 'row'}}>
              <View style={{flex: 0.122}}></View>
              <View style={{flex: 0.9}}>
                <Text
                  style={{
                    color: '#474747',
                    fontSize: hp(1.6),
                    fontWeight: '400',
                    fontFamily: fontFamily.robotoMedium,
                  }}>
                  {/* {item?.match_status === '1' && item?.mine_request==='1' &&('is yet to confirm/decline the meeting request')}  */}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 0.28,
              flexDirection: 'row',
            }}>
            {item?.match_status === '2' && item?.mine_request === '0' && (
              <View
                style={{
                  flex: 0,
                }}></View>
            )}
            {item?.match_status === '2' && item?.mine_request === '1' && (
              <View
                style={{
                  flex: 0,
                }}></View>
            )}
            {item?.match_status === '3' && item?.mine_request === '1' && (
              <View
                style={{
                  flex: 0,
                }}></View>
            )}
            {item?.match_status === '4' && item?.mine_request === '1' && (
              <View
                style={{
                  flex: 0,
                }}></View>
            )}
            {item?.match_status === '3' && item?.mine_request === '0' && (
              <View
                style={{
                  flex: 0,
                }}></View>
            )}
            {item?.match_status === '4' && item?.mine_request === '0' && (
              <View
                style={{
                  flex: 0,
                }}></View>
            )}
            {item?.match_status === '1' && item?.mine_request === '1' && (
              <View
                style={{
                  flex: 0.4,
                }}></View>
            )}
            {item?.match_status === '1' && item?.mine_request === '0' && (
              <View
                style={{
                  flex: 0.4,
                }}></View>
            )}

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor:'red'
              }}>
              {item?.match_status === '1' && item?.mine_request === '1' && (
                <TouchableOpacity
                  style={{
                    flex: 0.5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    // backgroundColor: '#E74133',
                    borderRadius: hp(5),
                    paddingHorizontal: hp(1),
                    paddingVertical: hp(0.5),
                    marginHorizontal: hp(1),
                  }}>
                  <View
                    style={{
                      flex: 0.3,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Icon
                      type="light"
                      name="xmark"
                      size={hp(1.5)}
                      color="#fff"
                    />
                  </View>
                  <View
                    style={{
                      flex: 0.7,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: hp(1.8),
                        fontWeight: '400',
                        fontFamily: fontFamily.robotoMedium,
                      }}></Text>
                  </View>
                </TouchableOpacity>
              )}
              {item?.match_status === '1' && item?.mine_request === '1' && (
                <TouchableOpacity
                  onPress={() => bookUserMeetingHandler(item?.user_id, 4)}
                  style={{
                    flex: 0.5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    backgroundColor: '#E74133',
                    borderRadius: hp(5),
                    paddingHorizontal: hp(1),
                    paddingVertical: hp(0.5),
                    marginHorizontal: hp(1),
                  }}>
                  <View
                    style={{
                      flex: 0.3,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Icon
                      type="light"
                      name="xmark"
                      size={hp(1.5)}
                      color="#fff"
                    />
                  </View>
                  <View
                    style={{
                      flex: 0.7,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: hp(1.8),
                        fontWeight: '400',
                        fontFamily: fontFamily.robotoMedium,
                      }}>
                      Cancel
                    </Text>
                  </View>
                </TouchableOpacity>
              )}

              {item?.match_status === '2' && item?.mine_request === '1' && (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    // backgroundColor: '#E74133',
                    borderRadius: hp(5),
                    paddingHorizontal: hp(1),
                    paddingVertical: hp(0.5),
                    marginHorizontal: hp(1),
                  }}>
                  {/* <View
                  style={{
                    flex: 0.3,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    type="light"
                    name="xmark"
                    size={hp(1.5)}
                    color="#fff"
                  />
                </View> */}
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#000',
                        fontSize: hp(1.8),
                        fontWeight: '400',
                        fontFamily: fontFamily.robotoMedium,
                      }}>
                      Request is approved
                    </Text>
                  </View>
                </View>
              )}

              {item?.match_status === '2' && item?.mine_request === '1' && (
                <TouchableOpacity
                  onPress={() => bookUserMeetingHandler(item?.user_id, 4)}
                  style={{
                    flex: 0.5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    backgroundColor: '#E74133',
                    borderRadius: hp(5),
                    paddingHorizontal: hp(1),
                    paddingVertical: hp(0.5),
                    marginHorizontal: hp(1),
                  }}>
                  <View
                    style={{
                      flex: 0.3,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Icon
                      type="light"
                      name="xmark"
                      size={hp(1.5)}
                      color="#fff"
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: hp(1.8),
                        fontWeight: '400',
                        fontFamily: fontFamily.robotoMedium,
                      }}>
                      Cancel
                    </Text>
                  </View>
                </TouchableOpacity>
              )}

              {item?.match_status === '3' && item?.mine_request === '1' && (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    // backgroundColor: '#E74133',
                    borderRadius: hp(5),
                    paddingHorizontal: hp(1),
                    paddingVertical: hp(0.5),
                    marginHorizontal: hp(1),
                  }}>
                  {/* <View
                  style={{
                    flex: 0.3,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    type="light"
                    name="xmark"
                    size={hp(1.5)}
                    color="#fff"
                  />
                </View> */}
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#000',
                        fontSize: hp(1.8),
                        fontWeight: '400',
                        fontFamily: fontFamily.robotoMedium,
                      }}>
                      Requrest is declined
                    </Text>
                  </View>
                </View>
              )}

              {item?.match_status === '4' && item?.mine_request === '1' && (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    // backgroundColor: '#E74133',
                    borderRadius: hp(5),
                    paddingHorizontal: hp(1),
                    paddingVertical: hp(0.5),
                    marginHorizontal: hp(1),
                  }}>
                  {/* <View
                  style={{
                    flex: 0.3,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    type="light"
                    name="xmark"
                    size={hp(1.5)}
                    color="#fff"
                  />
                </View> */}
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#000',
                        fontSize: hp(1.8),
                        fontWeight: '400',
                        fontFamily: fontFamily.robotoMedium,
                      }}>
                      Requrest is cancelled
                    </Text>
                  </View>
                </View>
              )}

              {item?.match_status === '1' && item?.mine_request === '0' && (
                <TouchableOpacity
                  onPress={() => bookUserMeetingHandler(item?.userId, 2)}
                  style={{
                    flex: 0.5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    backgroundColor: '#29D697',
                    borderRadius: hp(5),
                    paddingHorizontal: hp(1),
                    paddingVertical: hp(0.5),
                    marginHorizontal: hp(1),
                  }}>
                  <View
                    style={{
                      flex: 0.3,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Icon
                      type="light"
                      name="check"
                      size={hp(1.5)}
                      color="#fff"
                    />
                  </View>
                  <View
                    style={{
                      flex: 0.7,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: hp(1.8),
                        fontWeight: '400',
                        fontFamily: fontFamily.robotoMedium,
                      }}>
                      Approve
                    </Text>
                  </View>
                </TouchableOpacity>
              )}

              {item?.match_status === '1' && item?.mine_request === '0' && (
                <TouchableOpacity
                  onPress={() => bookUserMeetingHandler(item?.userId, 3)}
                  style={{
                    flex: 0.5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    backgroundColor: '#E74133',
                    borderRadius: hp(5),
                    paddingHorizontal: hp(1),
                    paddingVertical: hp(0.5),
                    marginHorizontal: hp(1),
                  }}>
                  <View
                    style={{
                      flex: 0.3,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Icon
                      type="light"
                      name="xmark"
                      size={hp(1.5)}
                      color="#fff"
                    />
                  </View>
                  <View
                    style={{
                      flex: 0.7,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: hp(1.8),
                        fontWeight: '400',
                        fontFamily: fontFamily.robotoMedium,
                      }}>
                      Decline
                    </Text>
                  </View>
                </TouchableOpacity>
              )}

              {item?.match_status === '2' && item?.mine_request === '0' && (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    // backgroundColor: '#E74133',
                    borderRadius: hp(5),
                    paddingHorizontal: hp(1),
                    paddingVertical: hp(0.5),
                    marginHorizontal: hp(1),
                  }}>
                  {/* <View
                    style={{
                      flex: 0.3,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Icon
                      type="light"
                      name="check"
                      size={hp(1.5)}
                      color="#fff"
                    />
                  </View> */}
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#000',
                        fontSize: hp(1.8),
                        fontWeight: '400',
                        fontFamily: fontFamily.robotoMedium,
                      }}>
                      Request is Approved
                    </Text>
                  </View>
                </View>
              )}

              {item?.match_status === '2' && item?.mine_request === '0' && (
                <TouchableOpacity
                  onPress={() => bookUserMeetingHandler(item?.user_id, 4)}
                  style={{
                    flex: 0.5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    backgroundColor: '#E74133',
                    borderRadius: hp(5),
                    paddingHorizontal: hp(1),
                    paddingVertical: hp(0.5),
                    marginHorizontal: hp(1),
                  }}>
                  <View
                    style={{
                      flex: 0.3,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Icon
                      type="light"
                      name="xmark"
                      size={hp(1.5)}
                      color="#fff"
                    />
                  </View>
                  <View
                    style={{
                      flex: 0.7,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: hp(1.8),
                        fontWeight: '400',
                        fontFamily: fontFamily.robotoMedium,
                      }}>
                      Decline
                    </Text>
                  </View>
                </TouchableOpacity>
              )}

              {item?.match_status === '3' && item?.mine_request === '0' && (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    // backgroundColor: '#E74133',
                    borderRadius: hp(5),
                    paddingHorizontal: hp(1),
                    paddingVertical: hp(0.5),
                    marginHorizontal: hp(1),
                  }}>
                  {/* <View
                    style={{
                      flex: 0.3,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Icon
                      type="light"
                      name="check"
                      size={hp(1.5)}
                      color="#fff"
                    />
                  </View> */}
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#000',
                        fontSize: hp(1.8),
                        fontWeight: '400',
                        fontFamily: fontFamily.robotoMedium,
                      }}>
                      Requrest is declined
                    </Text>
                  </View>
                </View>
              )}
              {item?.match_status === '4' && item?.mine_request === '0' && (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    // backgroundColor: '#E74133',
                    borderRadius: hp(5),
                    paddingHorizontal: hp(1),
                    paddingVertical: hp(0.5),
                    marginHorizontal: hp(1),
                  }}>
                  {/* <View
                    style={{
                      flex: 0.3,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Icon
                      type="light"
                      name="check"
                      size={hp(1.5)}
                      color="#fff"
                    />
                  </View> */}
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#000',
                        fontSize: hp(1.8),
                        fontWeight: '400',
                        fontFamily: fontFamily.robotoMedium,
                      }}>
                      Requrest is cancelled by other user
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const renderTimeItem = ({item, index}) => {
    return (
      <View style={{}}>
        <View style={{marginVertical: hp(1), marginHorizontal: hp(2)}}>
          <Text
            style={{
              color: '#000',
              fontSize: hp(2),
              fontWeight: '400',
              fontFamily: fontFamily.robotoBold,
            }}>
            {item?.start_time} - {item?.end_time}
          </Text>
        </View>
        <FlatList
          data={item?.session_applications}
          renderItem={renderItemCard}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  };
  const renderItem = ({item, index}) => {
    setActivityId(item?.activity_id);
    setActivityDetailId(item?.activity_detail_id);
    return (
      <View
        style={{
          justifyContent: 'center',
          backgroundColor: '#FFFFFF',
          borderRadius: hp(1),
          elevation: 2,
          marginBottom: hp(2),
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
                {item?.activity_name}
              </Text>
              {/* <Text style={{color:'#000', fontSize:hp(2),fontWeight: '400',
                  fontFamily: fontFamily.robotoMedium}}>{item?.start_time} - {item?.end_time}</Text> */}
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
            <FlatList
              data={item?.activity_session}
              renderItem={renderTimeItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </CollapseBody>
        </Collapse>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <StatusBar translucent backgroundColor="transparent" />
      <Modal
        visible={getDeclineData?.isLoading}
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
          backgroundColor: 'white',
          borderTopLeftRadius: hp(3),
          borderTopRightRadius: hp(3),
          marginTop: hp(39),
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
            height: hp(7),
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#000', // colors.descBlack
              fontSize: hp(3),
              fontFamily: fontFamily.robotoMedium,
              fontWeight: '400',
            }}>
            Meeting Requests
          </Text>
        </View>

        {['ALL', 'Pending', 'Confirmed', 'Declined', 'My Requests'].map(
          (option, index) => (
            <View
              style={{
                flex: 0.1,
                flexDirection: 'row',
                marginTop: index === 0 ? hp(2) : hp(3),
              }}
              key={option}>
              <TouchableOpacity
                style={{flex: 0.12}}
                onPress={() => handleRadioChange(option)}>
                {/* <Radio
                  checked={selectedOption === option}
                  activeColor={'#0EAA24'}
                  inactiveColor={'#000'}
                  fontSize={25}
                  onChange={() => handleRadioChange(option)}
                /> */}
                <Icon
                  name="circle"
                  type={selectedOption === option ? 'solid' : 'regular'}
                  size={hp(3)}
                  color="#cdcdcd"
                />
              </TouchableOpacity>
              <View style={{flex: 0.8}}>
                <Text
                  style={{
                    color: '#000',
                    fontSize: hp(2.5),
                    fontFamily: fontFamily.robotoMedium,
                    fontWeight: '400',
                  }}>
                  {option}
                </Text>
              </View>
            </View>
          ),
        )}

        <View
          style={{
            flex: 0.2,
            flexDirection: 'row',
            marginTop: hp(3),
            marginTop: hp(6),
          }}>
          <View
            style={{
              flex: 0.475,
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
              CANCEL
            </Text>
          </View>

          <View
            style={{
              flex: 0.05,
              height: hp(6),
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />

          <View
            style={{
              flex: 0.475,
              height: hp(7),
              backgroundColor: '#832D8E',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: hp(1),
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: hp(3),
                fontFamily: fontFamily.robotoMedium,
                fontWeight: '400',
              }}>
              APPLY
            </Text>
          </View>
        </View>
      </BottomSheet>
      <View style={{flex: 0.2, justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.headerChild}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{flex: 0.15}}>
            <Icon type="solid" name="arrow-left" size={hp(3)} color="#832D8E" />
          </TouchableOpacity>
          <View style={{flex: 0.8, marginTop: hp(-0.4)}}>
            <Text style={styles.textstyle}>Confirm / Decline</Text>
          </View>
          <TouchableOpacity
            onPress={() => setIsVisible(!isVisible)}
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
      <View
        style={{flex: 0.13, marginHorizontal: hp(2.5), marginBottom: hp(1)}}>
        <View
          style={{
            flex: 1,
            marginVertical: hp(1.5),
            backgroundColor: '#E7FAEC',
            borderRadius: hp(1),
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: colors.blackColor,
              fontSize: hp(2),
              fontFamily: fontFamily.robotoMedium,
              fontStyle: 'normal',
              fontWeight: '400',
              textAlign: 'center',
            }}>
            Click on
            <Text
              style={{
                fontSize: hp(2),
                fontFamily: fontFamily.robotoMedium,
                fontStyle: 'normal',
                fontWeight: 'bold',
              }}>
              {' '}
              Expand{' '}
            </Text>
            for Meeting Request Sent or Meeting Request Received
          </Text>
        </View>
      </View>

      <View style={{flex: 0.75, marginHorizontal: hp(2.5), marginTop: hp(2)}}>
        <FlatList
          data={getDeclineData?.user?.response?.activity_detail_a_r}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default Confirmdecline;

const styles = EStyleSheet.create({
  headerChild: {
    marginTop: hp(6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: hp(2.5),
  },
  testname: {
    color: colors.blackColor,
    fontSize: '0.75rem',
    fontFamily: fontFamily.robotoMedium,
    fontStyle: 'normal',
    fontWeight: '400',
  },

  textstyle: {
    color: colors.blackColor,
    marginTop: hp(0),
    fontSize: hp(2.5),
    fontWeight: '600',
    fontFamily: fontFamily.robotoBold,
    fontStyle: 'normal',
  },
});
