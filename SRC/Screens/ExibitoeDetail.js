import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MainHeader from '../Components/Headers/MainHeader';
import {speakerDetailHandler} from '../features/attendeeDetail/speakerDetailSlice';
import fontFamily from '../Styles/fontFamily';
import colors from '../Styles/colors';
import RenderHtml from 'react-native-render-html';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ExibitoeDetail = props => {
  const dispatch = useDispatch();

  const {item} = props.route.params;
  const [abstract, setAbsract] = useState(true);
  const [booth, setBooth] = useState(false);
  const speakerDetailData = useSelector(state => state.speakerDetailState);

  // console.log("item==444",item)
  // console.log("speakerDetailData===",speakerDetailData?.user?.response?.events);
  // const itemData =speakerDetailData?.user?.response?.events[0];
  const absHandler = () => {
    setAbsract(true);
    setBooth(false);
  };
  const boothHandler = () => {
    setAbsract(false);
    setBooth(true);
  };

  // async function getData(key) {
  //   try {
  //     const value = await AsyncStorage.getItem(key);
  //     if (value !== null) {
  //       console.log('Data retrieved successfully:', value);
  //       const parsedData = JSON.parse(value);

  //       // setData(parsedData);
  //       // {"user_id":parsedData.user_id,"event_id":parsedData.event_id,"type_id":1}
  //       dispatch(speakerDetailHandler({"speaker_id":item?.speaker_id,"event_id":parsedData?.event_id}));
  //       console.log('here is feedback screen data', parsedData);
  //       return parsedData;
  //     }
  //   } catch (error) {
  //     console.error('Error retrieving data:', error);
  //   }
  // }

  // useEffect(() => {
  //   getData('userSession');
  // }, []);

  const tagsStyles = {
    body: {
      whiteSpace: 'normal',
      color: '#aaa',
    },
    div: {color: 'blue', fontSize: hp(1.8)},
    p: {
      paddingTop: 0,
      color: '#394452',
      fontWeight: '400',
      fontSize: hp(1.7),
      lineHeight: hp(2.56),
      fontFamily: fontFamily.robotoMedium,
    },
    span: {color: 'green'},
  };

  return (
    <View style={{flex: 1}}>
      {/* <Modal
        visible={speakerDetailData?.isLoading}
        transparent={true}
        animationType="fade"
      >
        <View style={{flex:1,justifyContent: 'center', alignItems: 'center',backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{width:wp(25),height:hp(12.5),backgroundColor: 'white',borderRadius:hp(1),justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#cdcdcd" />
        </View>
        </View>
      </Modal> */}
      <View style={{flex: 0.1}}>
        <MainHeader
          text={'Exibitor Detail'}
          onpressBtn={() => props.navigation.goBack()}
        />
      </View>
      <View style={{flex: 0.02}}></View>
      <View style={{flex: 0.2}}>
        <Image
          style={{width: '100%', height: '100%'}}
          source={{uri: item?.image_name ? item?.image_name : 'banerone'}}
          resizeMode="cover"
        />
      </View>
      <View
        style={{
          flex: 0.1,
          justifyContent: 'center',
          marginHorizontal: hp(2.5),
        }}>
        <Text
          style={{
            color: colors.blackColor,
            fontSize: hp(2.5),
            fontWeight: '500',
            fontFamily: fontFamily.robotoMedium,
          }}>
          {item?.speaker_name}
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
            borderColor: colors.lightBlue,
            borderWidth: 1,
            backgroundColor: abstract ? colors.lightBlue : null,
            borderRadius: hp(10),
            height: hp(6.2),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: abstract ? '#fff' : '#832D8E',
              fontSize: hp(2),
              fontWeight: '400',
              fontFamily: fontFamily.robotoMedium,
            }}>
            ABSTRACT
          </Text>
        </TouchableOpacity>
        <View style={{flex: 0.07}}></View>
        <TouchableOpacity
          onPress={boothHandler}
          style={{
            flex: 0.4,
            borderColor: colors.lightBlue,
            backgroundColor: booth ? colors.lightBlue : null,
            borderWidth: 1,
            borderRadius: hp(10),
            height: hp(6.2),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: booth ? '#fff' : '#832D8E',
              fontSize: hp(2),
              fontWeight: '400',
              fontFamily: fontFamily.robotoMedium,
            }}>
            BOOTH
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 0.45,
          marginHorizontal: hp(2.5),
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: hp(5),
        }}>
        {abstract && (
          <ScrollView>
            <RenderHtml
              contentWidth={400}
              source={{
                html: item ? '<p>' + item?.speaker_detail + '</p>' : '',
              }}
              stylesheet={{color: 'blue'}}
              tagsStyles={tagsStyles}
            />
          </ScrollView>
        )}
        {booth && (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity style={[styles.cardImgWrapper]}>
              <Image
                source={{uri: item?.booth_image}}
                resizeMode="contain"
                style={styles.cardImg}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={{flex: 0.07, backgroundColor: '#fff'}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: hp(1),
          }}>
          <TouchableOpacity onPress={() => {}} style={{flex: 0.25}}>
            {/* <Image
              style={{width: '100%', height: '100%', paddingTop: hp(2)}}
              source={{uri: 'icon4'}}
              resizeMode="contain"
            /> */}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}} style={{flex: 0.25}}>
            {item?.facebook_url && (
              <Image
                style={{width: '100%', height: '100%', paddingTop: hp(2)}}
                source={{uri: 'icon3'}}
                resizeMode="contain"
              />
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}} style={{flex: 0.25}}>
            {item?.googleplus_url && (
              <Image
                style={{width: '100%', height: '100%', paddingTop: hp(2)}}
                source={{uri: 'iconone'}}
                resizeMode="contain"
              />
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}} style={{flex: 0.25}}>
            {item?.twitter_url && (
              <Image
                style={{width: '100%', height: '100%', paddingTop: hp(2)}}
                source={{uri: 'icontwo'}}
                resizeMode="contain"
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ExibitoeDetail;

const styles = StyleSheet.create({
  cardsWrapper: {
    marginHorizontal: hp(2.5),
  },
  card: {
    height: hp(13),
    marginVertical: hp(1),
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    // backgroundColor:'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImgWrapper: {
    backgroundColor: '#fff',
    // flex: hp(0.33),
    flexDirection: 'row',
    height: hp(12),
    width: hp(13),
    marginRight: hp(1),
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: hp(1.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImg: {
    height: '92%',
    width: '90%',
    alignSelf: 'center',

    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    borderColor: '#EBEEF2',
    borderWidth: 1,
    borderRadius: hp(1.5),
    flex: 2.5,
    padding: 10,
    height: hp(12),
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#1C2833',
  },
  cardDetails: {
    fontSize: hp(3),
    color: '#1C2833',
  },
});
