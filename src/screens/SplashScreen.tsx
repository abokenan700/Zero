import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {colors} from '@/constants';
import type {AuthStackParamList} from '@/types/navigation';

type Props = NativeStackScreenProps<AuthStackParamList, 'Splash'>;
export const SplashScreen = ({navigation}: Props) => {
  const opacity = useSharedValue(0); const scale = useSharedValue(0.8);
  useEffect(() => { opacity.value = withTiming(1, {duration: 650}); scale.value = withTiming(1, {duration: 650}); const t = setTimeout(() => navigation.replace('LocationPermission'), 1200); return () => clearTimeout(t); }, [navigation, opacity, scale]);
  const animated = useAnimatedStyle(() => ({opacity: opacity.value, transform: [{scale: scale.value}]}));
  return <View style={styles.wrap}><Animated.View style={[styles.logo, animated]}><Text style={styles.text}>blinkit</Text></Animated.View><Text style={styles.sub}>India's last minute app</Text></View>;
};
const styles = StyleSheet.create({wrap: {flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primary}, logo: {backgroundColor: colors.textPrimary, borderRadius: 24, paddingHorizontal: 28, paddingVertical: 14}, text: {color: colors.primary, fontSize: 38, fontWeight: '900'}, sub: {marginTop: 18, fontWeight: '800', color: colors.textPrimary}});
