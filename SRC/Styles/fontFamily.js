import {Platform} from 'react-native';
// const robotoLight = require('../assets/fonts/Roboto-Light.otf');
// const robotoMedium = require('../assets/fonts/Roboto-Medium.otf');
// const robotoBold = require('../assets/fonts/Roboto-Bold.otf');

const fontFamily = {
  // ceraBlack:
  // Platform.OS === 'android' ? 'CeraProBlack' : 'CeraProBlack',

  // ceraBold:
  // Platform.OS === 'android' ? 'CeraProBold' : 'CeraProBold',

  // ceraLight:
  // Platform.OS === 'android' ? 'CeraProLight' : 'CeraProLight',

  // ceraMedium:
  // Platform.OS === 'android' ? 'CeraProMedium' : 'CeraProMedium',

  // ceraBlack:
  // Platform.OS === 'android' ? 'CeraProBlack' : 'CeraProBlack',

  // ceraBold:
  // Platform.OS === 'android' ? 'Roboto-Bold' : 'Roboto-Bold',

  // ceraLight:
  // Platform.OS === 'android' ? 'Roboto-Light' : 'Roboto-Light',

  // ceraMedium:
  // Platform.OS === 'android' ? 'Roboto-Medium' : 'Roboto-Medium',

  robotoLight: Platform.OS === 'android' ? 'Roboto-Light' : 'Roboto-Light',

  robotoMedium: Platform.OS === 'android' ? 'Roboto-Medium' : 'Roboto-Medium',

  robotoBold: Platform.OS === 'android' ? 'Roboto-Bold' : 'Roboto-Bold',

  interRegular: Platform.OS === 'android' ? 'Inter-Regular' : 'Inter-Regular',

  interMedium: Platform.OS === 'android' ? 'Inter-Medium' : 'Inter-Medium',

  // robotoThin:
  // Platform.OS === 'android' ? 'Roboto-Thin' : 'Roboto-Thin',

  // robotoRegular:
  // Platform.OS === 'android' ? 'Roboto-Regular' : 'Roboto-Regular',
};

export default fontFamily;
