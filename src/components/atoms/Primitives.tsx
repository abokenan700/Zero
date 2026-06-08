import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, radius, spacing} from '@/constants';

export const Badge = ({label, tone = 'green'}: {label: string; tone?: 'green' | 'yellow' | 'red'}) => <Text style={[styles.badge, styles[tone]]}>{label}</Text>;
export const Chip = ({label}: {label: string}) => <Text style={styles.chip}>{label}</Text>;
export const Divider = () => <View style={styles.divider} />;
export const PriceTag = ({price, mrp}: {price: number; mrp?: number}) => <Text style={styles.price}>₹{price}{mrp ? <Text style={styles.mrp}> ₹{mrp}</Text> : null}</Text>;
export const DiscountBadge = ({price, mrp}: {price: number; mrp: number}) => <Badge label={`${Math.round(((mrp - price) / mrp) * 100)}% OFF`} tone="green" />;
export const DeliveryTimer = ({minutes}: {minutes: number}) => <View style={styles.timer}><Text style={styles.timerText}>⚡ Delivery in {minutes} minutes</Text></View>;
export const Skeleton = ({height = 16}: {height?: number}) => <View style={[styles.skeleton, {height}]} />;
export const RatingStars = ({rating}: {rating: number}) => <Text style={styles.rating}>★ {rating.toFixed(1)}</Text>;

const styles = StyleSheet.create({
  badge: {overflow: 'hidden', borderRadius: radius.sm, paddingHorizontal: spacing.xs, paddingVertical: 3, fontWeight: '800', fontSize: 10},
  green: {backgroundColor: colors.greenSoft, color: colors.secondary},
  yellow: {backgroundColor: colors.yellowSoft, color: colors.textPrimary},
  red: {backgroundColor: '#FDECEC', color: colors.danger},
  chip: {backgroundColor: colors.backgroundMuted, borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: spacing.xs, color: colors.textPrimary, fontWeight: '700'},
  divider: {height: 1, backgroundColor: colors.border, marginVertical: spacing.md},
  price: {fontWeight: '900', color: colors.textPrimary, fontSize: 14},
  mrp: {textDecorationLine: 'line-through', color: colors.textSecondary, fontWeight: '600'},
  timer: {backgroundColor: colors.secondary, borderRadius: radius.md, padding: spacing.md},
  timerText: {color: colors.white, fontWeight: '900', fontSize: 18},
  skeleton: {borderRadius: radius.sm, backgroundColor: '#ECECEC', width: '100%'},
  rating: {color: colors.secondary, fontWeight: '800'},
});
