import React, {useMemo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {CompositeScreenProps} from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button, Chip, Input, QuantitySelector} from '@/components/atoms';
import {AddressCard, CartItem} from '@/components/molecules';
import {AppHeader, EmptyState, MainTemplate, Section} from '@/components/organisms';
import {colors, spacing} from '@/constants';
import {useAppDispatch, useAppSelector} from '@/hooks/redux';
import {useGetAddressesQuery, useGetProductsQuery, useGetPromosQuery} from '@/services/blinkitApi';
import {addToCart, applyPromo, clearCart, decrementItem, removeItem} from '@/store/cartSlice';
import {getCartTotals} from '@/utils/cart';
import type {MainStackParamList, MainTabParamList} from '@/types/navigation';

type CartProps = CompositeScreenProps<BottomTabScreenProps<MainTabParamList, 'Cart'>, NativeStackScreenProps<MainStackParamList>>;
type CheckoutProps = NativeStackScreenProps<MainStackParamList, 'Checkout'>;
type ConfirmationProps = NativeStackScreenProps<MainStackParamList, 'OrderConfirmation'>;

export const CartScreen = ({navigation}: CartProps) => {
  const dispatch = useAppDispatch(); const lines = useAppSelector(s => s.cart.lines); const promoCode = useAppSelector(s => s.cart.promoCode);
  const {data: products = []} = useGetProductsQuery(); const {data: promos = []} = useGetPromosQuery();
  const promo = promos.find(p => p.code === promoCode); const totals = getCartTotals(lines, products, promo);
  if (lines.length === 0) return <MainTemplate><AppHeader title="Cart" /><EmptyState title="Your cart is empty" body="Add daily essentials from home." /><Button title="Start shopping" onPress={() => navigation.navigate('Home')} /></MainTemplate>;
  return <MainTemplate><AppHeader title="Cart" subtitle={`${lines.length} items arriving in 10 minutes`} />{lines.map(line => { const product = products.find(p => p.id === line.productId); return product ? <View key={line.productId} style={styles.line}><CartItem name={product.name} image={product.image} quantity={line.quantity} price={product.price} /><QuantitySelector quantity={line.quantity} onIncrement={() => dispatch(addToCart(product.id))} onDecrement={() => dispatch(decrementItem(product.id))} /><Button title="Remove" variant="ghost" onPress={() => dispatch(removeItem(product.id))} /></View> : null; })}<Section title="Promo code"><Input placeholder="Enter coupon" autoCapitalize="characters" onSubmitEditing={e => dispatch(applyPromo(e.nativeEvent.text))} /></Section><Summary totals={totals} /><Button title="Proceed to checkout" onPress={() => navigation.navigate('Checkout')} /></MainTemplate>;
};

export const CheckoutScreen = ({navigation}: CheckoutProps) => { const dispatch = useAppDispatch(); const lines = useAppSelector(s => s.cart.lines); const {data: addresses = []} = useGetAddressesQuery(); const {data: products = []} = useGetProductsQuery(); const totals = getCartTotals(lines, products); const [payment, setPayment] = useState('UPI'); const orderId = useMemo(() => `ORD${Math.floor(100000 + Math.random() * 899999)}`, []); return <MainTemplate><AppHeader title="Checkout" subtitle="Review address, slot and payment" /><Section title="Deliver to"><AddressCard address={addresses[0] ?? {id: 'tmp', type: 'Home', line1: 'Current location', line2: 'Bengaluru', landmark: 'Pinned on map', latitude: 0, longitude: 0}} /><Button title="Add new address" variant="ghost" onPress={() => navigation.navigate('AddressManagement')} /></Section><Section title="Delivery slot"><View style={styles.row}><Chip label="Now • 10 min" /><Chip label="Today 8-9 PM" /><Chip label="Tomorrow" /></View></Section><Section title="Payment method"><View style={styles.row}>{['UPI','Cards','COD','Wallets'].map(p => <Text key={p} onPress={() => setPayment(p)} style={[styles.pay, payment === p && styles.payActive]}>{p}</Text>)}</View></Section><Summary totals={totals} /><Button title={`Place order • ₹${totals.total}`} onPress={() => {dispatch(clearCart()); navigation.replace('OrderConfirmation', {orderId});}} /></MainTemplate>; };
export const OrderConfirmationScreen = ({navigation, route}: ConfirmationProps) => <MainTemplate><View style={styles.center}><Text style={styles.check}>✓</Text><Text style={styles.title}>Order placed!</Text><Text style={styles.sub}>Order ID {route.params.orderId}</Text><Text style={styles.sub}>Estimated delivery in 10 minutes</Text></View><Button title="Track order" onPress={() => navigation.replace('OrderTracking', {orderId: route.params.orderId})} /></MainTemplate>;
const Summary = ({totals}: {totals: {subtotal: number; deliveryFee: number; gst: number; discount: number; total: number}}) => <Section title="Bill details"><Text style={styles.bill}>Subtotal ₹{totals.subtotal}</Text><Text style={styles.bill}>Delivery fee ₹{totals.deliveryFee}</Text><Text style={styles.bill}>GST ₹{totals.gst}</Text><Text style={styles.save}>Savings ₹{totals.discount}</Text><Text style={styles.total}>To pay ₹{totals.total}</Text></Section>;
const styles = StyleSheet.create({line: {marginBottom: spacing.md}, row: {flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs}, bill: {color: colors.textPrimary, marginBottom: 6}, save: {color: colors.secondary, fontWeight: '900', marginBottom: 6}, total: {fontSize: 18, fontWeight: '900', color: colors.textPrimary}, pay: {padding: spacing.sm, borderRadius: 12, backgroundColor: colors.backgroundMuted, fontWeight: '800'}, payActive: {backgroundColor: colors.primary}, center: {alignItems: 'center', justifyContent: 'center', minHeight: 520}, check: {fontSize: 80, color: colors.secondary, fontWeight: '900'}, title: {fontSize: 28, fontWeight: '900'}, sub: {color: colors.textSecondary, marginTop: spacing.xs}});
