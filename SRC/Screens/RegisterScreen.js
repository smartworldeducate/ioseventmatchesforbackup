import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ImageBackground,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {Checkbox} from 'galio-framework';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ficon from 'react-native-fontawesome-pro';
import {useDispatch, useSelector} from 'react-redux';
import {registerUserHandler} from '../features/register/registerSlice';
import ViewInput from '../Components/Headers/ViewInput';
import fontFamily from '../Styles/fontFamily';
import colors from '../Styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = props => {
  const dispatch = useDispatch();
  const registerData = useSelector(state => state.registerState);
  const {email} = props.route.params;
  const [firstName, setFirstName] = useState(null);
  const [lasttName, setLastName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPass, setConfirmPass] = useState(null);
  const [checkBox, setCheckBox] = useState(null);
  const [showPassword, setShowPassword] = useState(true);
  const [showPasswordF, setShowPasswordf] = useState(true);
  const [eyeType, setEyeType] = useState(false);
  const [eyeTypef, setEyeTypef] = useState(false);

  // async function saveData(value) {
  //   const jsonString = JSON.stringify(value);
  //   try {
  //     await AsyncStorage.setItem("userrecord", jsonString);
  //     console.log('Data saved successfully.');
  //   } catch (error) {
  //     console.error('Error saving data:', error);
  //   }
  // }

  const onPressShowPassword = () => {
    setShowPassword(!showPassword);
    setEyeType(!eyeType);
  };

  const onPressShowPasswordf = () => {
    setShowPasswordf(!showPasswordF);
    setEyeTypef(!eyeTypef);
  };

  const onPressHandler = (fieldName, fieldValue) => {
    switch (fieldName) {
      case 'First Name':
        setFirstName(fieldValue);
        break;
      case 'Last Name':
        setLastName(fieldValue);
        break;
      case 'Phone':
        setPhone(fieldValue);
        break;
      case 'Password':
        setPassword(fieldValue);
        break;
      case 'Confirm Password':
        setConfirmPass(fieldValue);
        break;
      default:
        break;
    }
  };

  const validatePassword = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = async () => {
    if (!firstName || !lasttName || !phone || !password) {
      ToastAndroid.showWithGravity(
        'All fields are required',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
      return;
    }

    if (!validatePassword()) {
      ToastAndroid.showWithGravity(
        'Password should be at least 8 characters long, include at least one number, both upper and lower case letters, and at least one special character.',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
      return;
    }

    if (password !== confirmPass) {
      ToastAndroid.showWithGravity(
        'Password and Confirm Password do not match',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
      return;
    }

    const registerUser = await dispatch(
      registerUserHandler({
        first_name: firstName,
        last_name: lasttName,
        email: email,
        phone: phone,
        password: password,
      }),
    );
    // saveData({"first_name":firstName,"last_name":lasttName,"email":email})
    if (registerUser.payload.response.success === 1) {
      props.navigation.navigate('Admins');
    } else {
      ToastAndroid.showWithGravity(
        registerUser.payload.response.message,
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
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
      <Modal
        visible={registerData?.isLoading}
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
      <View style={{flex: 1}}>
        <View style={{height: hp(13.9)}}>
          <Image
            source={require('../assets/image/vectortop.png')}
            style={{width: '100%', height: '100%'}}
            resizeMode={'contain'}
          />
        </View>

        <ScrollView style={{}}>
          <View
            style={{
              height: hp(7),
              marginHorizontal: hp(3.5),
              marginTop: hp(0),
            }}>
            <View style={{height: hp(6), zIndex: 1}}>
              <Text
                style={{
                  color: '#cdcdcd',
                  fontWeight: '400',
                  fontSize: hp(2.5),
                  fontFamily: fontFamily.robotoBold,
                }}>
                To continue, we’ll need some more information for your accoun
              </Text>
            </View>
          </View>
          <View
            style={{
              height: hp(4),
              marginHorizontal: hp(3.5),
              marginTop: hp(0.3),
              marginBottom: hp(1),
            }}>
            <Text
              style={{
                color: colors.blackColor,
                fontWeight: 'bold',
                fontSize: hp(2.5),
                fontFamily: fontFamily.robotoBold,
              }}>
              {email}
            </Text>
          </View>
          {/* firstname */}
          <ViewInput
            name={'First Name'}
            value={firstName}
            onPress={value => onPressHandler('First Name', value)}
          />
          {/* lastname */}
          <ViewInput
            name={'Last Name'}
            value={lasttName}
            onPress={value => onPressHandler('Last Name', value)}
          />

          {/* phone */}

          <ViewInput
            name={'Phone'}
            value={phone}
            onPress={value => onPressHandler('Phone', value)}
            keyboardType={'numeric'}
          />

          {/* password */}
          <ViewInput
            name={'Password'}
            value={password}
            onPress={value => onPressHandler('Password', value)}
            iconRight={eyeType == true ? 'eye' : 'eye-slash'}
            maxLength={25}
            onPressShowPassword={onPressShowPassword}
            secureTextEntry={showPassword}
          />

          {/* confirm pass */}
          <ViewInput
            name={'Confirn Password'}
            value={confirmPass}
            onPress={value => onPressHandler('Confirm Password', value)}
            iconRight={eyeTypef == true ? 'eye' : 'eye-slash'}
            maxLength={25}
            onPressShowPassword={onPressShowPasswordf}
            secureTextEntry={showPasswordF}
          />

          {/* check box */}
          <View style={{marginHorizontal: hp(5), marginTop: hp(2.5)}}>
            <Checkbox
              checkboxStyle={{size: hp(50)}}
              iconSize={50}
              color="#832D8E"
              label="Subscribe for future updates"
            />
          </View>
          {/* button continue */}
        </ScrollView>
        <View style={{height: hp(20), marginLeft: hp(-40)}}>
          <ImageBackground
            source={require('../assets/image/vectorbottom.png')}
            style={{width: '100%', height: '100%'}}
            resizeMode={'contain'}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: hp(3.5),
                marginTop: hp(6),
              }}>
              <View></View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={{paddingRight: 10}}>
                  <Text
                    style={{
                      color: '#262626ed',
                      fontSize: hp(2.5),
                      fontWeight: '600',
                      fontFamily: fontFamily.robotoBold,
                    }}>
                    Continue
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={handleRegister}
                  style={{
                    width: wp(13.5),
                    height: hp(4.5),
                    backgroundColor: '#832D8E',
                    borderRadius: hp(1.5),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Ficon
                    type="light"
                    name="arrow-right"
                    color="#FFFFFF"
                    size={25}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;
