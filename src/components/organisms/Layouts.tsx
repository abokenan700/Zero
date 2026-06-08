import React, {ReactNode} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors, spacing} from '@/constants';

export const Screen = ({children, scroll = true}: {children: ReactNode; scroll?: boolean}) => {
  const content = <View style={styles.content}>{children}</View>;
  return <SafeAreaView style={styles.safe}>{scroll ? <ScrollView showsVerticalScrollIndicator={false}>{content}</ScrollView> : content}</SafeAreaView>;
};

export const AppHeader = ({title, subtitle}: {title: string; subtitle?: string}) => <View style={styles.header}><Text style={styles.title}>{title}</Text>{subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}</View>;
export const Section = ({title, action, children}: {title: string; action?: string; children: ReactNode}) => <View style={styles.section}><View style={styles.sectionHead}><Text style={styles.sectionTitle}>{title}</Text>{action ? <Text style={styles.action}>{action}</Text> : null}</View>{children}</View>;
export const EmptyState = ({title, body}: {title: string; body: string}) => <View style={styles.empty}><Text style={styles.emptyTitle}>{title}</Text><Text style={styles.subtitle}>{body}</Text></View>;
export const ErrorState = ({message}: {message: string}) => <EmptyState title="Something went wrong" body={message} />;

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: colors.background},
  content: {padding: spacing.md, flexGrow: 1},
  header: {marginBottom: spacing.md},
  title: {fontSize: 24, fontWeight: '900', color: colors.textPrimary},
  subtitle: {color: colors.textSecondary, marginTop: spacing.xs},
  section: {marginTop: spacing.lg},
  sectionHead: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.sm},
  sectionTitle: {fontSize: 18, fontWeight: '900', color: colors.textPrimary},
  action: {color: colors.secondary, fontWeight: '900'},
  empty: {alignItems: 'center', justifyContent: 'center', padding: spacing.xxl},
  emptyTitle: {fontWeight: '900', fontSize: 18, color: colors.textPrimary, marginBottom: spacing.xs},
});
