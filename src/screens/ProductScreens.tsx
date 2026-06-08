import React, {useState} from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated, {interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue} from 'react-native-reanimated';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button, Chip, DeliveryTimer, Divider, PriceTag, QuantitySelector, Skeleton} from '@/components/atoms';
import {ProductCard} from '@/components/molecules';
import {AppHeader, EmptyState, ErrorState, MainTemplate, Section} from '@/components/organisms';
import {colors, radius, spacing} from '@/constants';
import {useAppDispatch, useAppSelector} from '@/hooks/redux';
import {useGetProductQuery, useGetProductsQuery} from '@/services/blinkitApi';
import {addToCart, decrementItem} from '@/store/cartSlice';
import type {MainStackParamList} from '@/types/navigation';

type ListingProps = NativeStackScreenProps<MainStackParamList, 'ProductListing'>;
type DetailProps = NativeStackScreenProps<MainStackParamList, 'ProductDetail'>;

export const ProductListingScreen = ({navigation, route}: ListingProps) => {
  const [sort, setSort] = useState<'relevance' | 'priceLow' | 'priceHigh'>('relevance');
  const [grid, setGrid] = useState(true);
  const {data = [], isLoading, isError} = useGetProductsQuery({...route.params, sort});
  if (isLoading) return <MainTemplate><Skeleton height={500} /></MainTemplate>;
  if (isError) return <MainTemplate><ErrorState message="Could not load products." /></MainTemplate>;
  return <MainTemplate><AppHeader title="Products" subtitle="Sort, filter and add in seconds" /><View style={styles.toolbar}><Pressable onPress={() => setGrid(!grid)}><Chip label={grid ? 'Grid' : 'List'} /></Pressable><Pressable onPress={() => setSort('relevance')}><Chip label="Relevance" /></Pressable><Pressable onPress={() => setSort('priceLow')}><Chip label="₹ Low→High" /></Pressable><Pressable onPress={() => setSort('priceHigh')}><Chip label="₹ High→Low" /></Pressable></View>{data.length === 0 ? <EmptyState title="No products" body="Try another category or filter." /> : <FlatList scrollEnabled={false} numColumns={grid ? 2 : 1} key={grid ? 'grid' : 'list'} columnWrapperStyle={grid ? styles.grid : undefined} data={data} keyExtractor={i => i.id} renderItem={({item}) => <ProductCard compact={grid} product={item} onPress={() => navigation.navigate('ProductDetail', {productId: item.id})} />} />}</MainTemplate>;
};

export const ProductDetailScreen = ({navigation, route}: DetailProps) => {
  const y = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => { y.value = event.contentOffset.y; });
  const heroStyle = useAnimatedStyle(() => ({transform: [{scale: interpolate(y.value, [-120, 0, 180], [1.2, 1, 0.9])}]}));
  const {data: product, isLoading, isError} = useGetProductQuery(route.params.productId);
  const {data: similar = []} = useGetProductsQuery(product ? {categoryId: product.categoryId} : undefined);
  const dispatch = useAppDispatch();
  const qty = useAppSelector(s => s.cart.lines.find(line => line.productId === route.params.productId)?.quantity ?? 0);
  if (isLoading) return <MainTemplate><Skeleton height={520} /></MainTemplate>;
  if (isError || !product) return <MainTemplate><ErrorState message="Product unavailable." /></MainTemplate>;
  return <Animated.ScrollView onScroll={scrollHandler} scrollEventThrottle={16} style={styles.detail}><Animated.View style={heroStyle}><FlatList horizontal pagingEnabled data={product.gallery} keyExtractor={i => i} renderItem={({item}) => <FastImage source={{uri: item}} style={styles.hero} />} /></Animated.View><View style={styles.detailBody}><DeliveryTimer minutes={product.deliveryMinutes} /><Text style={styles.brand}>{product.brand}</Text><Text style={styles.name}>{product.name}</Text><Text style={styles.weight}>{product.weight}</Text><View style={styles.rowBetween}><PriceTag price={product.price} mrp={product.mrp} /><QuantitySelector quantity={qty} onIncrement={() => dispatch(addToCart(product.id))} onDecrement={() => dispatch(decrementItem(product.id))} /></View><Divider /><Text style={styles.sectionTitle}>Select variant</Text><View style={styles.toolbar}>{product.variants.map(v => <Chip key={v} label={v} />)}</View><Section title="Product details"><Text style={styles.paragraph}>{product.description}</Text></Section><Section title="Nutritional info"><View>{Object.entries(product.nutrition).map(([k, v]) => <Text key={k} style={styles.paragraph}>{k}: {v}</Text>)}</View></Section><Section title="Frequently bought together"><FlatList horizontal data={similar.slice(0, 8)} keyExtractor={i => i.id} renderItem={({item}) => <ProductCard product={item} onPress={() => navigation.push('ProductDetail', {productId: item.id})} />} /></Section><Button title="Go to cart" onPress={() => navigation.navigate('MainTabs', {screen: 'Cart'})} /></View></Animated.ScrollView>;
};
const styles = StyleSheet.create({toolbar: {flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs, marginVertical: spacing.md}, grid: {justifyContent: 'space-between'}, detail: {backgroundColor: colors.background}, hero: {width: 390, height: 360, backgroundColor: colors.backgroundMuted}, detailBody: {padding: spacing.md, backgroundColor: colors.background, borderTopLeftRadius: radius.lg, borderTopRightRadius: radius.lg}, brand: {color: colors.secondary, fontWeight: '900', marginTop: spacing.md}, name: {fontSize: 24, fontWeight: '900', color: colors.textPrimary, marginTop: spacing.xs}, weight: {color: colors.textSecondary, marginVertical: spacing.sm}, rowBetween: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}, sectionTitle: {fontWeight: '900', color: colors.textPrimary, fontSize: 18}, paragraph: {color: colors.textPrimary, lineHeight: 22, marginBottom: spacing.xs}});
