export const colors = {
  primary: '#F8CB46',
  secondary: '#278C37',
  background: '#FFFFFF',
  backgroundMuted: '#F4F4F4',
  textPrimary: '#1B1B1B',
  textSecondary: '#878787',
  border: '#E8E8E8',
  danger: '#D32F2F',
  success: '#278C37',
  warning: '#F59E0B',
  black: '#000000',
  white: '#FFFFFF',
  overlay: 'rgba(0,0,0,0.35)',
  card: '#FFFFFF',
  yellowSoft: '#FFF8D9',
  greenSoft: '#EAF7ED',
} as const;

export type ColorToken = keyof typeof colors;
