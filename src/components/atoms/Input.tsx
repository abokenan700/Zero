import React from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {colors, radius, spacing} from '@/constants';

type Props = TextInputProps & {icon?: string};

export const Input = ({icon, style, ...props}: Props) => (
  <View style={styles.wrap}>
    {icon ? <Icon name={icon} size={18} color={colors.textSecondary} /> : null}
    <TextInput placeholderTextColor={colors.textSecondary} style={[styles.input, style]} {...props} />
  </View>
);

const styles = StyleSheet.create({
  wrap: {minHeight: 48, borderRadius: radius.sm, backgroundColor: colors.backgroundMuted, flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.md, gap: spacing.xs},
  input: {flex: 1, color: colors.textPrimary, fontSize: 15, paddingVertical: spacing.xs},
});
