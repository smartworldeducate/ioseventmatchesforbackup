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
const Schedulemeeting = props => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(false);
  const [adminData, setAdminData] = useState([]);
  const [activityData, setActivityData] = useState([]);
  // const allevntsData = useSelector(state => state.alleventsState);
  // console.log("allevntsData===",allevntsData?.user?.response?.events);
  const [data, setData] = useState({
    activity_id: '2055',
    activity_name: 'Business Matchmaker',
  });
  const meetingReportData = useSelector(state => state.meetingState);
  // const data=meetingReportData?.user?.response?.detail?.event_activities
  // console.log("meetingReportData==",meetingReportData?.user?.response);
  async function getSessionData() {
    try {
      const value = await AsyncStorage.getItem('userSession');
      const activityData = await AsyncStorage.getItem('saveActivity');
      if (value !== null) {
        console.log('Data retrieved successfully:', value);
        const parsedData = JSON.parse(value);
        const activity = JSON.parse(activityData);
        console.log('activityData:', activity?.activity[0]?.activity_id);
        setActivityData(activity?.activity);
        setData(activity?.activity[0]);
        setAdminData(parsedData);
        dispatch(
          meetingHandler({
            user_id: parsedData?.event_user_id,
            event_id: parsedData?.event_id,
            activity_id: activity?.activity[0]?.activity_id,
          }),
        );
        // getActivityData('saveActivity');
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  }
  // async function getActivityData(key) {
  //   try {
  //     const value = await AsyncStorage.getItem(key);
  //     if (value !== null) {
  //       // console.log('Data retrieved successfully:', value);
  //       const parsedData = JSON.parse(value);
  //       console.log('parsedData:', parsedData?.activity);

  //       setAdminData(parsedData?.activity);
  //       dispatch(meetingHandler({"user_id":parsedData?.event_user_id,"event_id":parsedData?.event_id,"activity_id":data?.activity_id}));

  //     }
  //   } catch (error) {
  //     console.error('Error retrieving data:', error);
  //   }
  // }
  useEffect(() => {
    getSessionData();
  }, []);

  const handleChange = item => {
    setData(item);
    setValue(false);
    // dispatch(meetingHandler({"user_id":adminData?.login_id,"event_id":adminData?.event_id,"activity_id":item?.activity_id}));
    dispatch(
      meetingHandler({
        user_id: adminData?.event_user_id,
        event_id: adminData?.event_id,
        activity_id: item?.activity_id,
      }),
    );
  };

  const colorData = ['#EBDEF0', '#D6EAF8', '#E5E8E8'];

  const renderItemActivity = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => handleChange(item)} style={styles.item}>
        <Text style={styles.textItem}>{item?.activity_name}</Text>
      </TouchableOpacity>
    );
  };

  const renderItemFlatlist = ({item, index}) => {
    const words = item?.meeting_with.split(' ');
    // Take the first letter of each word and join them together
    const avatarInitial = words.map(word => word[0].toUpperCase()).join('');
    const colorIndex = index % colorData.length;
    return (
      <TouchableOpacity
        style={{
          flex: 0.1,
          flexDirection: 'row',
          backgroundColor: colorData[colorIndex],
          height: hp(18),
          borderRadius: hp(1),
          borderWidth: 0.5,
          borderColor: '#cdcdcd',
          marginVertical: hp(1.3),
          marginHorizontal: hp(2.5),
        }}>
        <View style={{flex: 1, margin: hp(1)}}>
          <View style={{flex: 0.3, flexDirection: 'row', margin: hp(1)}}>
            <View
              style={{
                flex: 0.135,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: hp(50),
                backgroundColor: '#fff',
                height: hp(5.2),
              }}>
              <Avatar
                size="small"
                rounded
                title={avatarInitial}
                onPress={() => console.log('Works!')}
                activeOpacity={0.7}
                titleStyle={{color: 'black'}}
              />
            </View>
            <View
              style={{
                flex: 0.73,
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
                {item?.meeting_with}
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
                {item?.meeting_with_company_name}
              </Text>
            </View>
          </View>
          <View
            style={{flex: 0.37, marginTop: hp(1), justifyContent: 'center'}}>
            <View style={{flex: 1, margin: hp(1)}}>
              <View style={{flexDirection: 'row'}}>
                <Icon
                  type="regular"
                  name="clock"
                  size={hp(2)}
                  color="#555555"
                />
                <View style={{paddingLeft: hp(1), marginTop: hp(-0.3)}}>
                  <Text
                    style={{
                      color: colors.blackColor,
                      paddingLeft: hp(0),
                      fontSize: hp(1.8),
                      fontWeight: '400',
                      fontFamily: fontFamily.robotoMedium,
                    }}>
                    {item?.meeting_time}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  paddingTop: hp(0.5),
                  marginTop: hp(0.5),
                }}>
                <Icon
                  type="regular"
                  name="location-dot"
                  size={hp(2)}
                  color="#555555"
                />
                <View style={{paddingLeft: hp(1), marginTop: hp(-0.3)}}>
                  <Text
                    style={{
                      color: colors.blackColor,
                      paddingLeft: hp(0),
                      fontSize: hp(1.8),
                      fontWeight: '400',
                      fontFamily: fontFamily.robotoMedium,
                    }}>
                    {item?.table_name}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Content of the TouchableOpacity */}
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1}}>
      <StatusBar
        barStyle={'default'}
        translucent
        backgroundColor="transparent"
      />
      <Modal
        visible={meetingReportData?.isLoading}
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
      <View style={{flex: 0.15}}>
        <MainHeader
          text={'Meeting Schedule'}
          onpressBtn={() => props.navigation.goBack()}
        />
      </View>
      <View style={{flex: 0.12, marginHorizontal: hp(0)}}>
        <TouchableOpacity
          onPress={() => setValue(true)}
          style={styles.dropdown}>
          <View style={{flex: 0.9, justifyContent: 'center'}}>
            <Text style={{color: colors.grayDescColor}}>
              {data?.activity_name}
            </Text>
          </View>
          <View style={{flex: 0.1, justifyContent: 'center'}}>
            <Icon type="solid" name="caret-down" size={25} color="gray" />
          </View>
        </TouchableOpacity>
        <Modal visible={value} transparent={true} animationType="fade">
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: hp(-50),
              zIndex: 1,
            }}>
            <TouchableOpacity
              onPress={() => setValue(false)}
              style={[
                styles.modalContainer,
                Platform.OS === 'android'
                  ? styles.androidShadow
                  : styles.iosShadow,
              ]}>
              <FlatList
                data={activityData && activityData}
                renderItem={renderItemActivity}
                keyExtractor={(item, index) => index.toString()}
              />
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
      <View style={{flex: 0.75}}>
        {meetingReportData?.user?.response?.success === 0 && (
          <View
            style={{
              flex: 0.1,
              height: hp(15),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: colors.grayDescColor,
                fontSize: hp(2),
                fontStyle: 'italic',
                fontFamily: fontFamily.robotoBold,
              }}>
              No Data Available.
            </Text>
          </View>
        )}
        <FlatList
          data={meetingReportData?.user?.response?.detail?.meeting_plan}
          renderItem={renderItemFlatlist}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default Schedulemeeting;

const styles = EStyleSheet.create({
  dropdown: {
    // margin: 16,
    // flex:1,
    flexDirection: 'row',
    marginHorizontal: hp(2.5),
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    justifyContent: 'center',
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#cdcdcd',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    color: colors.grayDescColor,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: colors.grayDescColor,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

  modalContainer: {
    width: wp(90),
    height: hp(30),
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: hp(15),
    // backgroundColor:'red'
  },
  androidShadow: {
    elevation: 5, // Shadow for Android
  },
  iosShadow: {
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
  },
  // item: {
  //     flex: 1,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  // },
  // textItem: {
  //     fontSize: 16,
  //     fontWeight: 'bold',
  //     color:colors.grayDescColor
  // },
});
