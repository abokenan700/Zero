import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Feather';
import {colors} from '@/constants';
import {AccountScreen, AddressManagementScreen, HelpSupportScreen, NotificationsScreen, OffersCouponsScreen, OrderTrackingScreen, OrdersHistoryScreen, ReferEarnScreen} from '@/screens/AccountMoreScreens';
import {CartScreen, CheckoutScreen, OrderConfirmationScreen} from '@/screens/CartCheckoutScreens';
import {CategoriesScreen} from '@/screens/CategoriesScreen';
import {HomeScreen} from '@/screens/HomeScreen';
import {ProductDetailScreen, ProductListingScreen} from '@/screens/ProductScreens';
import {SearchScreen} from '@/screens/SearchScreen';
import type {MainStackParamList, MainTabParamList, RootDrawerParamList} from '@/types/navigation';

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createNativeStackNavigator<MainStackParamList>();
const Drawer = createDrawerNavigator<RootDrawerParamList>();

const iconName = (route: keyof MainTabParamList) => ({Home: 'home', Categories: 'grid', Search: 'search', Cart: 'shopping-cart', Account: 'user'}[route]);
export const BottomTabs = () => <Tab.Navigator screenOptions={({route}) => ({headerShown: false, tabBarActiveTintColor: colors.secondary, tabBarInactiveTintColor: colors.textSecondary, tabBarStyle: {height: 64, paddingBottom: 8}, tabBarIcon: ({color, size}) => <Icon name={iconName(route.name)} color={color} size={size} />})}><Tab.Screen name="Home" component={HomeScreen} /><Tab.Screen name="Categories" component={CategoriesScreen} /><Tab.Screen name="Search" component={SearchScreen} /><Tab.Screen name="Cart" component={CartScreen} /><Tab.Screen name="Account" component={AccountScreen} /></Tab.Navigator>;
export const MainStack = () => <Stack.Navigator screenOptions={{headerShown: false}}><Stack.Screen name="MainTabs" component={BottomTabs} /><Stack.Screen name="ProductListing" component={ProductListingScreen} /><Stack.Screen name="ProductDetail" component={ProductDetailScreen} /><Stack.Screen name="Checkout" component={CheckoutScreen} /><Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} /><Stack.Screen name="OrderTracking" component={OrderTrackingScreen} /><Stack.Screen name="OrdersHistory" component={OrdersHistoryScreen} /><Stack.Screen name="AddressManagement" component={AddressManagementScreen} /><Stack.Screen name="Notifications" component={NotificationsScreen} /><Stack.Screen name="OffersCoupons" component={OffersCouponsScreen} /><Stack.Screen name="ReferEarn" component={ReferEarnScreen} /><Stack.Screen name="HelpSupport" component={HelpSupportScreen} /></Stack.Navigator>;
export const AppDrawer = () => <Drawer.Navigator screenOptions={{headerShown: false, drawerActiveTintColor: colors.secondary}}><Drawer.Screen name="Main" component={MainStack} /><Drawer.Screen name="OrdersHistory" component={OrdersHistoryScreen} /><Drawer.Screen name="OffersCoupons" component={OffersCouponsScreen} /><Drawer.Screen name="HelpSupport" component={HelpSupportScreen} /></Drawer.Navigator>;
