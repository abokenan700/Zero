import React from 'react';
import {Input} from '@/components/atoms';

export const SearchBar = ({value, onChangeText, autoFocus}: {value: string; onChangeText: (value: string) => void; autoFocus?: boolean}) => <Input icon="search" placeholder="Search for atta, dal, coke and more" value={value} onChangeText={onChangeText} autoFocus={autoFocus} />;
