import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {colors, radius, spacing} from '@/constants';

const banners = ['Mega savings on daily essentials', 'Fresh fruits at 10-minute speed', 'UPI offers live now'];
export const BannerCarousel = () => <FlatList horizontal showsHorizontalScrollIndicator={false} data={banners} keyExtractor={item => item} renderItem={({item, index}) => <View style={[styles.banner, {backgroundColor: index % 2 ? colors.greenSoft : colors.yellowSoft}]}><Text style={styles.bannerText}>{item}</Text><Text style={styles.sub}>Shop now →</Text></View>} />;
const styles = StyleSheet.create({banner: {width: 292, height: 112, borderRadius: radius.md, padding: spacing.md, marginRight: spacing.md, justifyContent: 'center'}, bannerText: {fontSize: 20, fontWeight: '900', color: colors.textPrimary}, sub: {marginTop: spacing.xs, color: colors.secondary, fontWeight: '900'}});
