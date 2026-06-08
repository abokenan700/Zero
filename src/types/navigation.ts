import type {NavigatorScreenParams} from '@react-navigation/native';

export type AuthStackParamList = {
  Splash: undefined;
  LocationPermission: undefined;
  PhoneEntry: undefined;
  OTPVerification: {phone: string};
};

export type MainTabParamList = {
  Home: undefined;
  Categories: undefined;
  Search: undefined;
  Cart: undefined;
  Account: undefined;
};

export type MainStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList> | undefined;
  ProductListing: {categoryId?: string; query?: string};
  ProductDetail: {productId: string};
  Checkout: undefined;
  OrderConfirmation: {orderId: string};
  OrderTracking: {orderId: string};
  OrdersHistory: undefined;
  AddressManagement: undefined;
  Notifications: undefined;
  OffersCoupons: undefined;
  ReferEarn: undefined;
  HelpSupport: undefined;
};

export type RootDrawerParamList = {
  Main: NavigatorScreenParams<MainStackParamList> | undefined;
  OrdersHistory: undefined;
  OffersCoupons: undefined;
  HelpSupport: undefined;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList> | undefined;
  App: NavigatorScreenParams<RootDrawerParamList> | undefined;
};
