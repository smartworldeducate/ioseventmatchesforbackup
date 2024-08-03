import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  Modal,
} from 'react-native';
import React, {useEffect, useCallback} from 'react';
import MainHeader from '../Components/Headers/MainHeader';
import colors from '../Styles/colors';
import fontFamily from '../Styles/fontFamily';
import Icon from 'react-native-fontawesome-pro';
import {adminListHandler} from '../features/adminlist/adminSlice';
import {useFocusEffect} from '@react-navigation/native';
import {
  activityHomeHandler,
  resetState,
} from '../features/eventactivityhome/hactivitySlice';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
const Admins = props => {
  const adminList = useSelector(state => state.adminListState);
  console.log('adminlist==', adminList?.isLoading);
  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      dispatch(adminListHandler());
      dispatch(resetState());
    }, []),
  );
  useEffect(() => {
    dispatch(adminListHandler());
  }, []);

  const colorData = ['#EBDEF0', '#D6EAF8', '#E5E8E8'];
  const renderItem = ({item, index}) => {
    // Calculate the index of the color to use
    const colorIndex = index % colorData.length;

    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('AllEvents', {user_id: item?.user_id})
        }
        style={{
          flex: 0.1,
          flexDirection: 'row',
          backgroundColor: colorData[colorIndex],
          height: hp(25),
          borderRadius: hp(1),
          borderWidth: 0.5,
          borderColor: '#cdcdcd',
          marginVertical: hp(1.3),
          marginHorizontal: hp(2.5),
        }}>
        <View style={{flex: 1, margin: hp(2)}}>
          <View style={{flex: 0.63, flexDirection: 'row'}}>
            <View
              style={{
                flex: 0.31,
                borderRadius: hp(50),
                borderWidth: 1,
                borderColor: '#fff',
              }}>
              <Image
                style={{width: '100%', height: '100%', borderRadius: hp(50)}}
                source={{uri: item?.image}}
                resizeMode="center"
              />
            </View>
            <View style={{flex: 0.4}}></View>
            <View
              style={{
                flex: 0.29,
                justifyContent: 'center',
                marginTop: hp(0.8),
              }}>
              <View
                style={{
                  flex: 1,
                  margin: hp(3),
                  borderRadius: hp(50),
                  borderWidth: 1,
                  borderColor: colors.descBlack,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  type="light"
                  name="arrow-up-right"
                  size={hp(3)}
                  color="#000"
                />
              </View>
            </View>
          </View>
          <View style={{flex: 0.37, marginTop: hp(1)}}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text
                style={{
                  color: colors.blackColor,
                  paddingLeft: hp(0),
                  fontSize: hp(2.8),
                  fontWeight: 'bold',
                  fontFamily: fontFamily.robotoBold,
                }}>
                {item?.company_name}
              </Text>
              <Text
                style={{
                  color: colors.grayDescColor,
                  paddingLeft: hp(0),
                  fontSize: hp(1.4),
                  fontWeight: '300',
                  fontFamily: fontFamily.robotoMedium,
                }}>
                {item?.first_name} {item?.last_name}
              </Text>
            </View>
          </View>
        </View>

        {/* Content of the TouchableOpacity */}
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1}}>
      <Modal
        visible={adminList?.isLoading}
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

      <View style={{flex: 0.1}}>
        <MainHeader
          text={'Admins'}
          onpressBtn={() => props.navigation.goBack()}
        />
      </View>
      <View style={{flex: 0.02}}></View>
      <View style={{flex: 0.86}}>
        <FlatList
          data={adminList?.user?.admins}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default Admins;
