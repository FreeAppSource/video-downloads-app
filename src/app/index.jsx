import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, useTheme } from '../theme';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <View style={styles.content}>
        {/* Top Logo */}
        <View style={styles.topLogoRow}>
          <View style={[styles.logoBadge, { backgroundColor: colors.primary }]}>
            <Ionicons name="arrow-down-circle" size={26} color={colors.black} />
          </View>
          <Text style={[styles.logoText, { color: theme.text }]}>SnapDown</Text>
        </View>

        {/* Hero Illustration */}
        <View style={styles.heroBox}>
          <Image
            source={require('../assets/images/video_figma.png')}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay}>
            <View style={[styles.playCircle, { backgroundColor: colors.primary }]}>
              <Ionicons name="play" size={28} color={colors.black} />
            </View>
          </View>
        </View>

        {/* Headlines */}
        <View style={styles.headlineBox}>
          <Text style={[styles.mainHeadline, { color: theme.text }]}>
            Download Any Video & Music in Seconds
          </Text>
          <Text style={[styles.subHeadline, { color: theme.subText }]}>
            High-speed MP4 & MP3 downloads from YouTube, Facebook, WhatsApp, Instagram and 100+ websites.
          </Text>
        </View>

        {/* Action Button */}
        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={[styles.startBtn, { backgroundColor: colors.primary }]}
            onPress={() => router.replace('/(tabs)')}
            activeOpacity={0.85}
          >
            <Text style={styles.startBtnText}>Start Browsing</Text>
            <Ionicons name="arrow-forward" size={18} color={colors.black} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  topLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
  },
  logoBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  heroBox: {
    width: '100%',
    height: 240,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#000',
  },
  heroImage: { width: '100%', height: '100%' },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headlineBox: {
    alignItems: 'center',
  },
  mainHeadline: {
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
    lineHeight: 36,
    letterSpacing: -0.5,
    marginBottom: 10,
  },
  subHeadline: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
  },
  bottomSection: {
    marginBottom: 12,
  },
  startBtn: {
    height: 54,
    borderRadius: 27,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 4,
  },
  startBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.black,
  },
});
