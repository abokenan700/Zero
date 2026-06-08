import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated, {useAnimatedStyle, useSharedValue, withSpring, withSequence} from 'react-native-reanimated';
import {DiscountBadge, PriceTag, QuantitySelector, RatingStars} from '@/components/atoms';
import {colors, radius, shadow, spacing} from '@/constants';
import {useAppDispatch, useAppSelector} from '@/hooks/redux';
import {addToCart, decrementItem} from '@/store/cartSlice';
import type {Product} from '@/types/domain';

type Props = {product: Product; onPress: () => void; compact?: boolean};

export const ProductCard = ({product, onPress, compact}: Props) => {
  const dispatch = useAppDispatch();
  const qty = useAppSelector(s => s.cart.lines.find(line => line.productId === product.id)?.quantity ?? 0);
  const scale = useSharedValue(1);
  const style = useAnimatedStyle(() => ({transform: [{scale: scale.value}]}));
  const add = () => {
    scale.value = withSequence(withSpring(1.05), withSpring(1));
    dispatch(addToCart(product.id));
  };
  return (
    <Animated.View style={[styles.card, compact && styles.compact, style]}>
      <Pressable onPress={onPress} onPressIn={() => (scale.value = withSpring(0.97))} onPressOut={() => (scale.value = withSpring(1))}>
        <FastImage source={{uri: product.image}} style={styles.image} resizeMode={FastImage.resizeMode.cover} />
        <View style={styles.metaRow}><Text style={styles.timer}>⏱ {product.deliveryMinutes} min</Text><RatingStars rating={product.rating} /></View>
        <Text numberOfLines={2} style={styles.name}>{product.name}</Text>
        <Text style={styles.weight}>{product.weight}</Text>
      </Pressable>
      <View style={styles.bottom}><View><PriceTag price={product.price} mrp={product.mrp} /><DiscountBadge price={product.price} mrp={product.mrp} /></View><QuantitySelector quantity={qty} onIncrement={add} onDecrement={() => dispatch(decrementItem(product.id))} /></View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {width: 164, backgroundColor: colors.card, borderRadius: radius.md, padding: spacing.sm, marginRight: spacing.md, ...shadow(2)},
  compact: {width: '48%', marginRight: 0, marginBottom: spacing.md},
  image: {height: 118, borderRadius: radius.sm, backgroundColor: colors.backgroundMuted},
  metaRow: {flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.xs},
  timer: {fontSize: 10, color: colors.textSecondary, fontWeight: '800'},
  name: {fontWeight: '800', color: colors.textPrimary, minHeight: 36, marginTop: spacing.xs},
  weight: {color: colors.textSecondary, fontSize: 12, marginVertical: spacing.xs},
  bottom: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
});
