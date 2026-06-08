import React, {useMemo, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {CompositeScreenProps} from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Chip} from '@/components/atoms';
import {ProductCard, SearchBar} from '@/components/molecules';
import {EmptyState, MainTemplate, Section} from '@/components/organisms';
import {spacing} from '@/constants';
import {useGetProductsQuery} from '@/services/blinkitApi';
import type {MainStackParamList, MainTabParamList} from '@/types/navigation';

type Props = CompositeScreenProps<BottomTabScreenProps<MainTabParamList, 'Search'>, NativeStackScreenProps<MainStackParamList>>;
export const SearchScreen = ({navigation}: Props) => { const [query, setQuery] = useState(''); const {data = []} = useGetProductsQuery({query}); const chips = useMemo(() => ['milk', 'bread', 'banana', 'chips', 'cold drinks'], []); return <MainTemplate><SearchBar autoFocus value={query} onChangeText={setQuery} /><Section title="Recent searches"><View style={styles.row}>{chips.map(c => <Chip key={c} label={c} />)}</View></Section><Section title={query ? `Results for “${query}”` : 'Trending searches'}><View style={styles.filters}><Chip label="Category" /><Chip label="Price" /><Chip label="Brand" /><Chip label="Rating" /></View>{data.length === 0 ? <EmptyState title="No results" body="Try searching for milk, bread or snacks." /> : <FlatList scrollEnabled={false} numColumns={2} columnWrapperStyle={styles.grid} data={data.slice(0, 20)} keyExtractor={item => item.id} renderItem={({item}) => <ProductCard compact product={item} onPress={() => navigation.navigate('ProductDetail', {productId: item.id})} />} />}</Section></MainTemplate>; };
const styles = StyleSheet.create({row: {flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs}, filters: {flexDirection: 'row', gap: spacing.xs, marginBottom: spacing.md}, grid: {justifyContent: 'space-between'}});
