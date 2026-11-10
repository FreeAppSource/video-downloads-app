import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, useTheme } from '../../theme';
import { userProfile } from '../../data';

export default function ProfileScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const [cleaned, setCleaned] = useState(false);

  const utilityTools = [
    { id: 'u-1', title: '1.94GB Clean', subtitle: 'Junk Cleaner', icon: 'trash-bin-outline', color: '#E74C3C' },
    { id: 'u-2', title: 'Battery Saver', subtitle: 'Extend Battery', icon: 'battery-charging-outline', color: '#2ECC71' },
    { id: 'u-3', title: 'Speed Boost', subtitle: 'Free Memory', icon: 'rocket-outline', color: '#3498DB' },
    { id: 'u-4', title: 'App Manager', subtitle: 'Manage Storage', icon: 'apps-outline', color: '#9B59B6' },
    { id: 'u-5', title: 'WA Cleaner', subtitle: 'Clean Media', icon: 'logo-whatsapp', color: '#25D366' },
    { id: 'u-6', title: 'YT Library', subtitle: 'Offline Sync', icon: 'logo-youtube', color: '#FF0000' },
  ];

  const handleCleanJunk = () => {
    Alert.alert(
      'Deep Cleaning',
      'Scanning for cache, duplicate videos, and temporary download logs...',
      [
        {
          text: 'Clean 1.8GB Now',
          onPress: () => {
            setCleaned(true);
            Alert.alert('Storage Cleaned! ✨', 'Freed up 1.8GB of junk files successfully.');
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]} edges={['top']}>
      {/* Top Header */}
      <View style={[styles.topBar, { backgroundColor: theme.surface }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Me</Text>
        <TouchableOpacity
          style={styles.settingsBtn}
          onPress={() => router.push('/edit-profile')}
        >
          <Ionicons name="settings-outline" size={20} color={theme.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* User Profile Card (Sketch: Sadek Hossen Rony / Profile) */}
        <TouchableOpacity
          style={[styles.userCard, { backgroundColor: theme.surface, borderColor: theme.cardBorder }]}
          onPress={() => router.push('/edit-profile')}
          activeOpacity={0.8}
        >
          <Image
            source={require('../../assets/images/avatar_user.png')}
            style={styles.userAvatar}
          />
          <View style={styles.userInfo}>
            <Text style={[styles.userName, { color: theme.text }]}>{userProfile.name}</Text>
            <Text style={[styles.userSub, { color: theme.subText }]}>{userProfile.username}</Text>
          </View>
          <View style={[styles.profileTag, { backgroundColor: theme.inputBg }]}>
            <Text style={[styles.profileTagText, { color: theme.text }]}>Profile</Text>
            <Ionicons name="chevron-forward" size={14} color={theme.subText} />
          </View>
        </TouchableOpacity>

        {/* Snaptube Premium Card (Sketch: Snaptube Premiume / Download for today : 5/3 / Get Basic) */}
        <View style={[styles.premiumCard, { backgroundColor: colors.black }]}>
          <View style={styles.premiumHeader}>
            <View style={styles.premiumBadge}>
              <Ionicons name="diamond" size={16} color={colors.primary} />
              <Text style={styles.premiumBadgeText}>PREMIUM MEMBER</Text>
            </View>
            <TouchableOpacity
              style={[styles.getBasicBtn, { backgroundColor: colors.primary }]}
              onPress={() => Alert.alert('Premium Activated', 'Unlimited background downloads unlocked!')}
            >
              <Text style={styles.getBasicText}>Get Basic</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.premiumTitle}>Snaptube Premium</Text>
          <Text style={styles.premiumSub}>
            Downloads for today: {userProfile.downloadsToday} • Ad-free experience • 4K Video downloads
          </Text>
        </View>

        {/* Junk Cleaner Banner (Sketch Dialoge: 1.8GB junk files found) */}
        <TouchableOpacity
          style={[
            styles.cleanerBanner,
            { backgroundColor: cleaned ? colors.primarySoft : '#FFF2E2' },
          ]}
          onPress={handleCleanJunk}
          activeOpacity={0.85}
        >
          <View style={[styles.cleanerIconBox, { backgroundColor: cleaned ? colors.green : '#FF9500' }]}>
            <Ionicons name={cleaned ? 'checkmark' : 'sparkles'} size={22} color="#FFFFFF" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.cleanerTitle, { color: colors.black }]}>
              {cleaned ? 'Storage is Optimized' : '1.8GB junk files found'}
            </Text>
            <Text style={[styles.cleanerSub, { color: '#666666' }]}>
              {cleaned ? 'All duplicate temporary files cleared' : 'Boost your device storage speed'}
            </Text>
          </View>
          <View style={[styles.cleanActionBtn, { backgroundColor: cleaned ? colors.green : colors.black }]}>
            <Text style={styles.cleanActionText}>{cleaned ? 'Done' : 'Clean'}</Text>
          </View>
        </TouchableOpacity>

        {/* Utility Tools Grid */}
        <Text style={[styles.sectionHeading, { color: theme.text }]}>Device & Media Utilities</Text>

        <View style={styles.toolsGrid}>
          {utilityTools.map((tool) => (
            <TouchableOpacity
              key={tool.id}
              style={[styles.toolCard, { backgroundColor: theme.surface, borderColor: theme.cardBorder }]}
              onPress={() => Alert.alert(tool.title, `Opening ${tool.subtitle}...`)}
              activeOpacity={0.7}
            >
              <View style={[styles.toolIconBox, { backgroundColor: tool.color + '15' }]}>
                <Ionicons name={tool.icon} size={22} color={tool.color} />
              </View>
              <Text style={[styles.toolTitle, { color: theme.text }]}>{tool.title}</Text>
              <Text style={[styles.toolSub, { color: theme.subText }]}>{tool.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: { fontSize: 22, fontWeight: '900' },
  settingsBtn: { padding: 4 },
  scrollContent: { padding: 16, gap: 16 },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
  },
  userAvatar: { width: 52, height: 52, borderRadius: 26 },
  userInfo: { flex: 1, marginLeft: 14 },
  userName: { fontSize: 16, fontWeight: '800' },
  userSub: { fontSize: 12, marginTop: 2 },
  profileTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.full,
    gap: 4,
  },
  profileTagText: { fontSize: 12, fontWeight: '700' },
  premiumCard: {
    borderRadius: 20,
    padding: 18,
  },
  premiumHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  premiumBadgeText: { color: colors.primary, fontSize: 11, fontWeight: '800' },
  getBasicBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: radius.full,
  },
  getBasicText: { color: colors.black, fontSize: 12, fontWeight: '800' },
  premiumTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: '900', marginBottom: 4 },
  premiumSub: { color: '#CCCCCC', fontSize: 12, lineHeight: 18 },
  cleanerBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 16,
    gap: 12,
  },
  cleanerIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cleanerTitle: { fontSize: 14, fontWeight: '800' },
  cleanerSub: { fontSize: 11, marginTop: 2 },
  cleanActionBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: radius.full,
  },
  cleanActionText: { color: '#FFFFFF', fontSize: 12, fontWeight: '800' },
  sectionHeading: { fontSize: 16, fontWeight: '900', marginTop: 4 },
  toolsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  toolCard: {
    width: '48%',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
  },
  toolIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  toolTitle: { fontSize: 14, fontWeight: '800' },
  toolSub: { fontSize: 11, marginTop: 2 },
});
