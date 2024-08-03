import { View, Text, TextInput, TouchableOpacity, ToastAndroid, Modal, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import MainHeader from '../Components/Headers/MainHeader'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {feedBackHandler} from '../features/feedback/feedBackSlice'
import fontFamily from '../Styles/fontFamily';
import colors from '../Styles/colors';
import { BottomSheet } from '@rneui/themed';
import Icon from 'react-native-fontawesome-pro';
import { useFocusEffect } from '@react-navigation/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { AirbnbRatingDefault } from '@rneui/themed/dist/AirbnbRating';
const FeedBack = (props) => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [isPoll, setIsPoll] = useState(true);
  const feedBackData=useSelector((state)=>state.feedBackState);
    const [feedback,setFeedback]=useState('');
    const [data, setData] = useState(null);
    const [ratingNumber,setRatingNumber]=useState(null);
    // console.log("Rating is: " + ratingNumber)
    async function getData(key) {
      try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
          console.log('Data retrieved successfully:', value);
          const parsedData = JSON.parse(value);
          setData(parsedData);
  
          console.log('here is feedback screen data', parsedData);
          return parsedData;
        } 
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    }
    useFocusEffect(
      useCallback(() => {
        setIsPoll(true);
      }, [])
    )
    const notNowFeedBackHandler=()=>{
      props.navigation.goBack();
      setIsPoll(false);
    }
    const submitFeedHandler=()=>{
      if(data.user_id !=='' && data.event_id !=='' && ratingNumber!==''){
        dispatch(feedBackHandler({"user_id":data.user_id,"event_id":data.event_id,"rating":ratingNumber}));
        ToastAndroid.showWithGravity(
          'Feedback save successfully',
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        );
        setFeedback('');
        notNowFeedBackHandler();
      }else{
        ToastAndroid.showWithGravity(
          'something wrong',
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        );
      }
    }
    useEffect(() => {
      getData('userSession');
      setIsPoll(true);
  }, []);
  const ratingCompleted=(rating)=> {
    setRatingNumber(rating);
  }
  return (
    <View style={{flex:1}}>
      <BottomSheet 
          isVisible={isPoll} 
          style={{
            flex: 1,
            backgroundColor: "white",
            borderTopLeftRadius: hp(2),
            borderTopRightRadius: hp(2),
            marginTop: hp(40),
            elevation: 8, // Add elevation for shadow effect
            shadowColor: '#000', // Shadow color
            shadowOffset: { width: 0, height: 6 }, // Increase the shadow offset for more shadow on top
            shadowOpacity: 0.25, // Shadow opacity
            shadowRadius: 6, // Increase shadow radius for a softer shadow
            padding: 25 // Optional padding for content inside the BottomSheet
          }}
        >
          <TouchableOpacity onPress={notNowFeedBackHandler} style={{flex:0.05,height:hp(2),justifyContent:'center',alignItems:'center'}}>
            <Icon name='minus' size={hp(10)} color='#cdcdcd'/>
          </TouchableOpacity>
          <View style={{flex:0.1,height:hp(15),flexDirection:'row',alignItems:'center'}}>
          <Text style={{color:'#000000',fontSize:hp(3),fontWeight:'400'}}>Event Feedback</Text>
          </View>
          <View style={{flex:0.1,height:hp(8),flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
          <Text style={{marginTop:hp(1),color:colors.blackColor,fontSize:hp(2.8),fontFamily:fontFamily.robotoMedium,fontWeight:'400'}}>How was your event?</Text>
          </View>

          <View style={{flex:0.1,height:hp(15),marginBottom:hp(5),justifyContent:'center',alignItems:'center'}}>
              <AirbnbRatingDefault
                count={6}
                reviews={[ "Bad", "Meh", "OK", "Good","Very Good", "Excellent"]}
                defaultRating={5}
                onFinishRating={ratingCompleted}
                size={25}
                selectedColor={'#29D697'}
                reviewColor={'#cdcdcd'}
                reviewSize={20}
              />
          </View>
         
          <View style={{flex:0.1,flexDirection:'row',height:hp(8)}}>
            <TouchableOpacity onPress={notNowFeedBackHandler} style={{flex:0.455,borderRadius:hp(1.5),justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:'#cdcdcd'}}>
              <View style={{justifyContent:'center',alignItems:'center',marginTop:hp(-1)}}>
              <Text style={{marginTop:hp(1),color:colors.descBlack,fontSize:hp(2.5),fontFamily:fontFamily.robotoMedium,fontWeight:'400'}}>
              Not now
              </Text>
              </View>
            </TouchableOpacity>
            <View style={{flex:0.08}}></View>
            <TouchableOpacity onPress={submitFeedHandler} style={{flex:0.455,borderRadius:hp(1.5),justifyContent:'center',alignItems:'center',backgroundColor:'#832D8E'}}>
            <View style={{justifyContent:'center',alignItems:'center',marginTop:hp(-1)}}>
              <Text style={{marginTop:hp(1),color:'#fff',fontSize:hp(2.5),fontFamily:fontFamily.robotoMedium,fontWeight:'400'}}>
              Submit
              </Text>
              </View>
            </TouchableOpacity>
          </View>
          
        </BottomSheet>
        <Modal
        visible={feedBackData?.isLoading}
        transparent={true}
        animationType="fade"
      >
        <View style={{flex:1,justifyContent: 'center', alignItems: 'center',backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{width:wp(25),height:hp(12.5),backgroundColor: 'white',borderRadius:hp(1),justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#cdcdcd" />
        </View>
        </View>
      </Modal>
      <View style={{flex: 0.1}}>
        <MainHeader
          text={'FeedBack'}
          onpressBtn={() => props.navigation.goBack()}
        />
      </View>
     
    </View>
  )
}

export default FeedBack