import {Platform, ViewStyle} from 'react-native';

export const shadow = (elevation = 3): ViewStyle =>
  Platform.select<ViewStyle>({
    ios: {
      shadowColor: '#000000',
      shadowOffset: {width: 0, height: elevation},
      shadowOpacity: 0.08,
      shadowRadius: elevation * 2,
    },
    android: {elevation},
    default: {},
  }) ?? {};
