import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthNavigator} from './AuthNavigator';
import {AppDrawer} from './MainNavigator';
import {useAppSelector} from '@/hooks/redux';
import type {RootStackParamList} from '@/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();
export const RootNavigator = () => { const authed = useAppSelector(s => s.auth.isAuthenticated); return <NavigationContainer><Stack.Navigator screenOptions={{headerShown: false}}>{authed ? <Stack.Screen name="App" component={AppDrawer} /> : <Stack.Screen name="Auth" component={AuthNavigator} />}</Stack.Navigator></NavigationContainer>; };
