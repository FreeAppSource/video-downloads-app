import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, useTheme } from '../theme';

export default function Header({
  showSearch = true,
  searchPlaceholder = 'Search or enter web address',
  onSearchPress,
  rightAction,
}) {
  const router = useRouter();
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <View style={styles.topRow}>
        <View style={styles.brandContainer}>
          <View style={[styles.brandBadge, { backgroundColor: colors.primary }]}>
            <Ionicons name="arrow-down-circle" size={20} color={colors.black} />
          </View>
          <Text style={[styles.brandTitle, { color: theme.text }]}>SnapDown</Text>
        </View>

        <View style={styles.rightActions}>
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: theme.inputBg }]}
            onPress={toggleTheme}
            activeOpacity={0.7}
          >
            <Ionicons name={isDark ? 'sunny' : 'moon'} size={18} color={theme.text} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: theme.inputBg }]}
            onPress={() => router.push('/(tabs)/downloads')}
            activeOpacity={0.7}
          >
            <Ionicons name="download-outline" size={18} color={theme.text} />
            <View style={styles.badgeDot} />
          </TouchableOpacity>
        </View>
      </View>

      {showSearch && (
        <TouchableOpacity
          style={[styles.searchBar, { backgroundColor: theme.inputBg }]}
          onPress={onSearchPress || (() => router.push('/search'))}
          activeOpacity={0.8}
        >
          <Ionicons name="search" size={18} color={theme.subText} />
          <Text style={[styles.searchPlaceholder, { color: theme.subText }]} numberOfLines={1}>
            {searchPlaceholder}
          </Text>
          <Ionicons name="mic-outline" size={18} color={theme.subText} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 12,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  rightActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  badgeDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    borderRadius: 22,
    paddingHorizontal: 14,
    gap: 10,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
});
