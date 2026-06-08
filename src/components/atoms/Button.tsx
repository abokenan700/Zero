import React from 'react';
import {Pressable, StyleSheet, Text, ViewStyle} from 'react-native';
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';
import {colors, fontSizes, radius, spacing} from '@/constants';

type Props = {title: string; onPress: () => void; variant?: 'primary' | 'secondary' | 'ghost'; disabled?: boolean; style?: ViewStyle};

export const Button = ({title, onPress, variant = 'primary', disabled, style}: Props) => {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({transform: [{scale: scale.value}]}));
  return (
    <Animated.View style={[animatedStyle, style]}>
      <Pressable
        disabled={disabled}
        onPress={onPress}
        onPressIn={() => (scale.value = withSpring(0.97))}
        onPressOut={() => (scale.value = withSpring(1))}
        style={[styles.button, styles[variant], disabled && styles.disabled]}>
        <Text style={[styles.text, variant === 'ghost' && styles.ghostText]}>{title}</Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {height: 52, borderRadius: radius.lg, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.lg},
  primary: {backgroundColor: colors.primary},
  secondary: {backgroundColor: colors.secondary},
  ghost: {backgroundColor: colors.backgroundMuted},
  disabled: {opacity: 0.5},
  text: {fontSize: fontSizes.lg, fontWeight: '800', color: colors.textPrimary},
  ghostText: {color: colors.textPrimary},
});
