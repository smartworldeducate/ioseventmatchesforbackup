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
import React, {useCallback, useEffect, useState} from 'react';
import MainHeader from '../Components/Headers/MainHeader';
import Search from '../Components/Search';
import Icon from 'react-native-fontawesome-pro';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Avatar} from 'react-native-elements';
import { Switch} from 'galio-framework';
import {getScheduleAvailabilityHandler} from '../features/getschedualavailability/getSchedulaAvailabilitySlice';
import {setAvailabilityStatusHandler} from '../features/setavailability/setAvailabilitySlice';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../Styles/colors';
import fontFamily from '../Styles/fontFamily';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import EStyleSheet from 'react-native-extended-stylesheet';
import ToggleSwitch from 'toggle-switch-react-native'
import {
    Collapse,
    CollapseHeader,
    CollapseBody,
  } from 'accordion-collapse-react-native';
const Sechduleavailability = props => {
  const dispatch = useDispatch();
  // const {id} = props.route.params;
  // console.log("param data===",props.route.params?.id);
  const getSecheduleData = useSelector(state => state.getScheduleAvailabilityState);
  // console.log("getSecheduleData===",getSecheduleData?.user?.response);
    const [data, setData] = useState('');
  const [expanded, setExpanded] = useState(false);

async function getData(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      const parsedData = JSON.parse(value);
      setData(parsedData);
      // console.log('user id and event_id===', parsedData);
      // {"user_id":parsedData.user_id,"event_id":parsedData.event_id,"type_id":1}
      dispatch(
        getScheduleAvailabilityHandler({
          user_id:26706,
          event_id: 439,
          admin_id: 1425,
        }),
      );
      
      return parsedData;
    }

  } catch (error) {
    console.error('Error retrieving data:', error);
  }
}
useFocusEffect(
  useCallback(() => {
    getData('userSession');
  }, [])
)
useEffect(() => {
  getData('userSession');
}, []);

// const scheduleData = getSecheduleData?.user?.response?.detail?.['1453'] || [];

const [switchStatuses, setSwitchStatuses] = useState(
  scheduleData && scheduleData.map(item => item.available === 'Y')
);
const scheduleData = getSecheduleData?.user?.response?.detail?.['1453'] || [];

useEffect(() => {
  if (scheduleData.length > 0) {
    setSwitchStatuses(scheduleData.map(item => item.available === 'Y'));
  }
}, [scheduleData]);


const onPressToggle = (item, index) => {
  const newAvailability = item?.available === 'Y' ? 'N' : 'Y';
  // Update the switch status locally
  setSwitchStatuses(prevStatuses => 
    prevStatuses.map((status, i) => (i === index ? !status : status))
  );

  // Dispatch the action to update the availability status
  dispatch(
    setAvailabilityStatusHandler({
      user_id: 26706,
      event_id: 439,
      admin_id: 1425,
      activity_id: item?.activity_id,
      availability: newAvailability,
      activity_detail_id: item?.activity_detail_id
    })
  );
};

const renderItem = ({item, index}) => {
  return (
    <View
    style={{
      justifyContent: 'center',
      backgroundColor: '#FFFFFF',
      borderRadius: hp(1),
      elevation: 2,
      marginBottom:hp(2)
    }}>
    <Collapse isExpanded={expanded} onToggle={(e) => onPress(e)}>
      <CollapseHeader
        style={{
          height: hp(6),
          marginHorizontal: hp(2),
          flexDirection: 'row',
          alignItems: 'center',
          // backgroundColor:'red'
        }}>
        <View style={{flex:0.9}}>
          <Text style={{color:'#000', fontSize:hp(2),fontWeight: '600',
              fontFamily: fontFamily.robotoBold}}>{item?.activity_name}</Text>
        </View>
        <View style={{flex:0.1,alignItems:'flex-end'}}>
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
          data={getSecheduleData?.user?.response?.detail?.['1453']}
          renderItem={renderItembody}
          keyExtractor={(item, index) => index.toString()}
        />
     
      </CollapseBody>
    </Collapse>
  </View>
  );
};


const renderItembody = ({item, index}) => {
  return (
    <View
        style={{
          height: hp(5),
          marginHorizontal: hp(2),
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{justifyContent: 'center'}}>
          <Text style={styles.testname}>{item?.start_time} - {item?.end_time}</Text>
        </View>
        <View style={{justifyContent: 'center'}}>
        <ToggleSwitch
            isOn={switchStatuses[index]}
            onColor="#ABEBC6"
            offColor="#CCD1D1"
            labelStyle={{ color: "black", fontWeight: "900" }}
            size="medium"
            onToggle={() => onPressToggle(item, index)}
          />
        </View>
      </View>
  );
};

    const onPress = ({item}) => {};
  
  return (
    <View style={{flex: 1}}>
      <StatusBar translucent backgroundColor="transparent" />
      <Modal
        visible={getSecheduleData?.isLoading}
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
      <View style={{flex: 0.2}}>
        <MainHeader
          text={'Schedule Availability'}
          onpressBtn={() => props.navigation.goBack()}
        />
      </View>
      <View style={{flex:0.13,marginHorizontal:hp(2.5),marginBottom:hp(1)}}>
        <View style={{flex:1,marginVertical:hp(1.5),backgroundColor:'#E7FAEC',borderRadius:hp(1),justifyContent:'center'}}>
                <Text style={{color: colors.blackColor,
                    fontSize: hp(2),
                    fontFamily: fontFamily.robotoMedium,
                    fontStyle: 'normal',
                    fontWeight: '400',textAlign:'center'}}>

                        Click on the <Text style={{ fontSize: hp(2),
                    fontFamily: fontFamily.robotoMedium,
                    fontStyle: 'normal',
                    fontWeight: 'bold'}}>Toggle Button  </Text> 
                    for specific timeslot to confirm your availability
                </Text>
        </View>

      </View>
      
      <View style={{flex:0.75,marginHorizontal:hp(2.5),marginTop:hp(2)}}>
      <FlatList
          data={getSecheduleData?.user?.response?.title}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default Sechduleavailability;

const styles = EStyleSheet.create({
  
    testname: {
      color: colors.blackColor,
      fontSize: '0.75rem',
      fontFamily: fontFamily.robotoMedium,
      fontStyle: 'normal',
      fontWeight: '400',
    },

  });


  const stylessw = {
    switchOn: {
      // Define styles for switch when it's on
      backgroundColor: 'green', // Change to desired background color
    },
    switchOff: {
      // Define styles for switch when it's off
      backgroundColor: 'red', // Change to desired background color
    },
  };
