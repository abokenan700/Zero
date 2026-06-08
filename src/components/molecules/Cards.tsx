import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {colors, radius, shadow, spacing} from '@/constants';
import type {Address, Category, Order} from '@/types/domain';

export const CategoryCard = ({category, onPress}: {category: Category; onPress: () => void}) => (
  <Pressable onPress={onPress} style={[styles.category, {backgroundColor: category.color}]}>
    <Text style={styles.emoji}>{category.icon}</Text><Text style={styles.categoryText}>{category.title}</Text>
  </Pressable>
);

export const AddressCard = ({address}: {address: Address}) => <View style={styles.box}><Text style={styles.title}>{address.type}</Text><Text style={styles.body}>{address.line1}</Text><Text style={styles.body}>{address.line2}</Text><Text style={styles.sub}>{address.landmark}</Text></View>;

export const OrderStatusStep = ({label, active}: {label: string; active: boolean}) => <View style={styles.stepRow}><View style={[styles.dot, active && styles.dotActive]} /><Text style={[styles.body, active && styles.stepActive]}>{label}</Text></View>;

export const CartItem = ({name, image, quantity, price}: {name: string; image: string; quantity: number; price: number}) => <View style={styles.cartItem}><FastImage source={{uri: image}} style={styles.thumb} /><View style={styles.flex}><Text style={styles.title}>{name}</Text><Text style={styles.sub}>Qty {quantity}</Text></View><Text style={styles.title}>₹{price * quantity}</Text></View>;

export const OrderCard = ({order}: {order: Order}) => <View style={styles.box}><Text style={styles.title}>{order.id}</Text><Text style={styles.body}>{new Date(order.date).toLocaleString()}</Text><Text style={styles.sub}>{order.items.length} items • ₹{order.total}</Text></View>;

const styles = StyleSheet.create({
  category: {width: '48%', minHeight: 118, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.md, justifyContent: 'space-between'},
  emoji: {fontSize: 34},
  categoryText: {fontWeight: '900', color: colors.textPrimary},
  box: {backgroundColor: colors.card, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.md, ...shadow(2)},
  title: {fontWeight: '900', color: colors.textPrimary},
  body: {color: colors.textPrimary, marginTop: 3},
  sub: {color: colors.textSecondary, marginTop: 3},
  stepRow: {flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginVertical: spacing.xs},
  dot: {width: 14, height: 14, borderRadius: 7, backgroundColor: colors.border},
  dotActive: {backgroundColor: colors.secondary},
  stepActive: {fontWeight: '900', color: colors.secondary},
  cartItem: {flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.card, borderRadius: radius.md, padding: spacing.sm, marginBottom: spacing.sm},
  thumb: {width: 56, height: 56, borderRadius: radius.sm},
  flex: {flex: 1},
});
