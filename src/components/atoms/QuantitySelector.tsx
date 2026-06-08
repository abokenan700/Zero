import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {colors, radius, spacing} from '@/constants';

type Props = {quantity: number; onIncrement: () => void; onDecrement: () => void};

export const QuantitySelector = ({quantity, onIncrement, onDecrement}: Props) => {
  if (quantity === 0) return <Pressable onPress={onIncrement} style={styles.add}><Text style={styles.addText}>ADD</Text></Pressable>;
  return <View style={styles.stepper}><Pressable onPress={onDecrement}><Text style={styles.step}>−</Text></Pressable><Text style={styles.qty}>{quantity}</Text><Pressable onPress={onIncrement}><Text style={styles.step}>＋</Text></Pressable></View>;
};

const styles = StyleSheet.create({
  add: {borderWidth: 1, borderColor: colors.secondary, backgroundColor: colors.greenSoft, borderRadius: radius.sm, paddingHorizontal: spacing.md, paddingVertical: spacing.xs},
  addText: {color: colors.secondary, fontWeight: '900'},
  stepper: {flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.secondary, borderRadius: radius.sm, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs},
  step: {color: colors.white, fontWeight: '900', fontSize: 15},
  qty: {color: colors.white, fontWeight: '900'},
});
