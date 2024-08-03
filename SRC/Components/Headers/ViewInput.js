import React from 'react';
import {
  TextInput,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';
import fontFamily from '../../Styles/fontFamily';
import colors from '../../Styles/colors';
import Icon from 'react-native-fontawesome-pro';
const ViewInput = ({
  value,
  name,
  onPress,
  iconRight,
  maxLength,
  onPressShowPassword,
  keyboardType,
  onChange,
  secureTextEntry,
}) => {
  return (
    <View>
      <View
        style={{
          marginHorizontal: hp(5),
          paddingBottom: 10,
          marginTop: hp(1.5),
        }}>
        <Text
          style={{
            color: '#2C3A4B',
            fontWeight: 'bold',
            fontSize: hp(1.6),
            fontFamily: fontFamily.robotoBold,
          }}>
          {name}
        </Text>
      </View>
      <View
        style={{
          marginHorizontal: hp(3.5),
          borderRadius: wp(10),
          borderColor: '#cdcdcd',
          borderWidth: 1,
          height: hp(5.5),
          flexDirection: 'row',
        }}>
        <View
          style={{
            paddingHorizontal: hp(1.5),
            flex: 0.85,
            justifyContent: 'center',
          }}>
          <TextInput
            style={{
              color: colors.blackColor,
              fontSize: hp(1.6),
              fontWeight: 'bold',
              fontFamily: fontFamily.robotoBold,
            }}
            placeholder={name}
            onChangeText={onPress}
            onChange={onChange}
            value={value}
            placeholderTextColor={'#cdcdcd'}
            autoCorrect={true}
            maxLength={maxLength}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}></TextInput>
        </View>
        <TouchableOpacity
          onPress={onPressShowPassword}
          style={{flex: 0.15, justifyContent: 'center', alignItems: 'center'}}>
          {iconRight ? (
            <Icon type="light" name={iconRight} size={hp(2.5)} color="#000" />
          ) : (
            ''
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ViewInput;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
