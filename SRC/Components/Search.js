import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-fontawesome-pro';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';
import fontFamily from '../Styles/fontFamily';
import colors from '../Styles/colors';
import {color} from '@rneui/base';

const Search = ({setSearchQuery}) => {
  const [searchData, setSearchData] = useState('');
  const handleSearch = text => {
    setSearchData(text);
    setSearchQuery(text);
  };
  return (
    <View style={{flex: 1, marginHorizontal: hp(2.5), flexDirection: 'row'}}>
      <TouchableOpacity activeOpacity={0.8} style={styles.homeSearch}>
        <View style={{flex: 0.85, justifyContent: 'center'}}>
          <TextInput
            multiline={true}
            style={{marginHorizontal: hp(1.5), color: '#000'}}
            value={searchData}
            onChangeText={e => handleSearch(e)}
            returnKeyType={'done'}
            iconName={'user'}
            placeholder={'Search'}
            placeholderColor={'gray'}
            iconColor={colors.loginIconColor}
            placeholderTextColor="gray"
            placeholderStyle={styles.plaseholderStyle}></TextInput>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.searchicon}
          onPress={() => {}}>
          <Icon
            type="light"
            name="magnifying-glass"
            size={hp(3)}
            color="#292D32"
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

export default Search;

const styles = EStyleSheet.create({
  homeSearch: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#F4F6F9',
    justifyContent: 'space-between',
    borderRadius: hp(50),
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    height: hp(5),
    height: hp(6),
  },

  searchicon: {
    flex: 0.15,
    borderRadius: hp(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderStyle: {
    fontSize: hp(1.4),
    fontWeight: '400',
    fontFamily: fontFamily.robotoMedium,
    fontStyle: 'normal',
    color: colors.grayDescColor,
  },
});
