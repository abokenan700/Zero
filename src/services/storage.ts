import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV({id: 'blinkit-clone'});

export const storageKeys = {
  authPhone: 'auth.phone',
  cart: 'cart.lines',
  address: 'address.selected',
} as const;
