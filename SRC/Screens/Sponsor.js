import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import MainHeader from '../Components/Headers/MainHeader';
import Search from '../Components/Search';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import fontFamily from '../Styles/fontFamily';
const Sponsor = props => {
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 0.1}}>
        <MainHeader
          text={'Sponsors'}
          onpressBtn={() => props.navigation.goBack()}
        />
      </View>
      <View style={{flex: 0.03}}></View>
      <View style={{flex: 0.1,marginTop:hp(0)}}>
        <Search />
      </View>
      <View
        style={{
          flex: 0.8,
          //   backgroundColor: 'red',
          marginHorizontal: hp(2.5),
          flexDirection: 'row',
          marginTop: hp(0),
        }}>
        <ScrollView>
          <View style={{height: hp(35)}}>
            <View
              style={{
                flex: 0.2,
                // backgroundColor: 'red',
                justifyContent: 'center',
              }}>
              <Text style={{color: 'gray', fontSize: hp(2.5), fontWeight: '500',fontFamily:fontFamily.robotoMedium}}>
                Dimond
              </Text>
              <View
                style={{
                  width: wp(20),
                  height: hp(0.15),
                  backgroundColor: '#000',
                }}></View>
            </View>
            <View
              style={{
                flex: 0.37,
                // backgroundColor: 'orange',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('ExibitoeDetail')}
                style={[styles.cardImgWrapper]}>
                <Image
                  source={{uri: 'logoaws'}}
                  resizeMode="contain"
                  style={styles.cardImg}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('ExibitoeDetail')}
                style={[styles.cardImgWrapper]}>
                <Image
                  source={{uri: 'logothree'}}
                  resizeMode="contain"
                  style={styles.cardImg}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('ExibitoeDetail')}
                style={styles.cardImgWrapper}>
                <Image
                  source={{uri: 'logohonda'}}
                  resizeMode="contain"
                  style={styles.cardImg}
                />
              </TouchableOpacity>
            </View>
            <View style={{flex: 0.03}}></View>
            <View
              style={{
                flex: 0.37,
                // backgroundColor: 'orange',
                flexDirection: 'row',
                justifyContent: 'center',
                // marginVertical:hp(0)
              }}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('ExibitoeDetail')}
                style={[styles.cardImgWrapper]}>
                <Image
                  source={{uri: 'logoaws'}}
                  resizeMode="contain"
                  style={styles.cardImg}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('ExibitoeDetail')}
                style={[styles.cardImgWrapper]}>
                <Image
                  source={{uri: 'logothree'}}
                  resizeMode="contain"
                  style={styles.cardImg}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('ExibitoeDetail')}
                style={styles.cardImgWrapper}>
                <Image
                  source={{uri: 'logohonda'}}
                  resizeMode="contain"
                  style={styles.cardImg}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{height: hp(35)}}>
            <View
              style={{
                flex: 0.2,
                // backgroundColor: 'red',
                justifyContent: 'center',
              }}>
              <Text style={{color: '#FFD700', fontSize: hp(2.5), fontWeight: '500',fontFamily:fontFamily.robotoMedium}}>
                Gold
              </Text>
              <View
                style={{
                  width: wp(20),
                  height: hp(0.15),
                  backgroundColor: '#000',
                }}></View>
            </View>
            <View
              style={{
                flex: 0.37,
                // backgroundColor: 'orange',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('ExibitoeDetail')}
                style={[styles.cardImgWrapper]}>
                <Image
                  source={{uri: 'logoaws'}}
                  resizeMode="contain"
                  style={styles.cardImg}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('ExibitoeDetail')}
                style={[styles.cardImgWrapper]}>
                <Image
                  source={{uri: 'logothree'}}
                  resizeMode="contain"
                  style={styles.cardImg}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('ExibitoeDetail')}
                style={styles.cardImgWrapper}>
                <Image
                  source={{uri: 'logohonda'}}
                  resizeMode="contain"
                  style={styles.cardImg}
                />
              </TouchableOpacity>
            </View>
            <View style={{flex: 0.03}}></View>
            <View
              style={{
                flex: 0.37,
                // backgroundColor: 'orange',
                flexDirection: 'row',
                justifyContent: 'center',
                // marginVertical:hp(0)
              }}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('ExibitoeDetail')}
                style={[styles.cardImgWrapper]}>
                <Image
                  source={{uri: 'logoaws'}}
                  resizeMode="contain"
                  style={styles.cardImg}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('ExibitoeDetail')}
                style={[styles.cardImgWrapper]}>
                <Image
                  source={{uri: 'logothree'}}
                  resizeMode="contain"
                  style={styles.cardImg}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('ExibitoeDetail')}
                style={styles.cardImgWrapper}>
                <Image
                  source={{uri: 'logohonda'}}
                  resizeMode="contain"
                  style={styles.cardImg}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{height: hp(35)}}>
            <View
              style={{
                flex: 0.2,
                // backgroundColor: 'red',
                justifyContent: 'center',
              }}>
              <Text style={{color: 'silver', fontSize: hp(2.5), fontWeight: '500',fontFamily:fontFamily.robotoMedium}}>
                Silver
              </Text>
              <View
                style={{
                  width: wp(20),
                  height: hp(0.15),
                  backgroundColor: '#000',
                }}></View>
            </View>
            <View
              style={{
                flex: 0.37,
                // backgroundColor: 'orange',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('ExibitoeDetail')}
                style={[styles.cardImgWrapper]}>
                <Image
                  source={{uri: 'logoaws'}}
                  resizeMode="contain"
                  style={styles.cardImg}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('ExibitoeDetail')}
                style={[styles.cardImgWrapper]}>
                <Image
                  source={{uri: 'logothree'}}
                  resizeMode="contain"
                  style={styles.cardImg}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('ExibitoeDetail')}
                style={styles.cardImgWrapper}>
                <Image
                  source={{uri: 'logohonda'}}
                  resizeMode="contain"
                  style={styles.cardImg}
                />
              </TouchableOpacity>
            </View>
            <View style={{flex: 0.03}}></View>
            <View
              style={{
                flex: 0.37,
                // backgroundColor: 'orange',
                flexDirection: 'row',
                justifyContent: 'center',
                // marginVertical:hp(0)
              }}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('ExibitoeDetail')}
                style={[styles.cardImgWrapper]}>
                <Image
                  source={{uri: 'logoaws'}}
                  resizeMode="contain"
                  style={styles.cardImg}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('ExibitoeDetail')}
                style={[styles.cardImgWrapper]}>
                <Image
                  source={{uri: 'logothree'}}
                  resizeMode="contain"
                  style={styles.cardImg}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('ExibitoeDetail')}
                style={styles.cardImgWrapper}>
                <Image
                  source={{uri: 'logohonda'}}
                  resizeMode="contain"
                  style={styles.cardImg}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Sponsor;

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
    flex: hp(0.33),
    // height: hp(12),
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
