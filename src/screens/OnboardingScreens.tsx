import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button, Input} from '@/components/atoms';
import {AuthTemplate} from '@/components/templates';
import {colors, spacing} from '@/constants';
import {useAppDispatch} from '@/hooks/redux';
import {setLocationGranted, signIn} from '@/store/authSlice';
import type {AuthStackParamList} from '@/types/navigation';

type LocationProps = NativeStackScreenProps<AuthStackParamList, 'LocationPermission'>;
type PhoneProps = NativeStackScreenProps<AuthStackParamList, 'PhoneEntry'>;
type OtpProps = NativeStackScreenProps<AuthStackParamList, 'OTPVerification'>;

export const LocationPermissionScreen = ({navigation}: LocationProps) => { const dispatch = useAppDispatch(); return <AuthTemplate><View style={styles.hero}><Text style={styles.icon}>📍</Text><Text style={styles.title}>Enable location</Text><Text style={styles.body}>Blinkit finds the nearest store to deliver groceries in 10 minutes.</Text></View><Button title="Allow location access" onPress={() => {dispatch(setLocationGranted()); navigation.replace('PhoneEntry');}} /></AuthTemplate>; };
export const PhoneEntryScreen = ({navigation}: PhoneProps) => { const [phone, setPhone] = useState(''); const valid = phone.replace(/\D/g, '').length === 10; return <AuthTemplate><Text style={styles.title}>India's last minute app</Text><Text style={styles.body}>Log in or sign up with your mobile number.</Text><Input icon="phone" keyboardType="phone-pad" maxLength={10} value={phone} onChangeText={setPhone} placeholder="Enter mobile number" /><Button style={styles.cta} title="Continue" disabled={!valid} onPress={() => navigation.navigate('OTPVerification', {phone})} /></AuthTemplate>; };
export const OTPVerificationScreen = ({route}: OtpProps) => { const dispatch = useAppDispatch(); const [otp, setOtp] = useState(''); useEffect(() => { const t = setTimeout(() => setOtp('123456'), 700); return () => clearTimeout(t); }, []); useEffect(() => { if (otp.length === 6) dispatch(signIn(route.params.phone)); }, [dispatch, otp, route.params.phone]); return <AuthTemplate><Text style={styles.title}>Verify OTP</Text><Text style={styles.body}>Enter the 6-digit OTP sent to +91 {route.params.phone}. Auto-read simulation fills 123456.</Text><Input icon="lock" keyboardType="number-pad" maxLength={6} value={otp} onChangeText={setOtp} placeholder="123456" /><Text style={styles.note}>Waiting for SMS…</Text></AuthTemplate>; };
const styles = StyleSheet.create({hero: {alignItems: 'center', justifyContent: 'center', flex: 1, minHeight: 420}, icon: {fontSize: 78}, title: {fontSize: 30, fontWeight: '900', color: colors.textPrimary, marginBottom: spacing.sm}, body: {color: colors.textSecondary, fontSize: 16, marginBottom: spacing.lg, lineHeight: 23}, cta: {marginTop: spacing.lg}, note: {marginTop: spacing.md, color: colors.secondary, fontWeight: '800'}});
