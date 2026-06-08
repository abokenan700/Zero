import React from 'react';
import {View, StyleSheet} from 'react-native';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {CompositeScreenProps} from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CategoryCard} from '@/components/molecules';
import {Skeleton} from '@/components/atoms';
import {AppHeader, MainTemplate} from '@/components/organisms';
import {spacing} from '@/constants';
import {useGetCategoriesQuery} from '@/services/blinkitApi';
import type {MainStackParamList, MainTabParamList} from '@/types/navigation';

type Props = CompositeScreenProps<BottomTabScreenProps<MainTabParamList, 'Categories'>, NativeStackScreenProps<MainStackParamList>>;
export const CategoriesScreen = ({navigation}: Props) => { const {data, isLoading} = useGetCategoriesQuery(); return <MainTemplate><AppHeader title="Categories" subtitle="Browse every Blinkit aisle" />{isLoading ? <Skeleton height={400} /> : <View style={styles.grid}>{data?.map(c => <CategoryCard key={c.id} category={c} onPress={() => navigation.navigate('ProductListing', {categoryId: c.id})} />)}</View>}</MainTemplate>; };
const styles = StyleSheet.create({grid: {flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: spacing.xs}});
