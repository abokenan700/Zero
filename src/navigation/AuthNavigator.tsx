import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LocationPermissionScreen, OTPVerificationScreen, PhoneEntryScreen} from '@/screens/OnboardingScreens';
import {SplashScreen} from '@/screens/SplashScreen';
import type {AuthStackParamList} from '@/types/navigation';

const Stack = createNativeStackNavigator<AuthStackParamList>();
export const AuthNavigator = () => <Stack.Navigator screenOptions={{headerShown: false}}><Stack.Screen name="Splash" component={SplashScreen} /><Stack.Screen name="LocationPermission" component={LocationPermissionScreen} /><Stack.Screen name="PhoneEntry" component={PhoneEntryScreen} /><Stack.Screen name="OTPVerification" component={OTPVerificationScreen} /></Stack.Navigator>;
