import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, radius, useTheme } from '../theme';
import { videoFeeds } from '../data';
import VideoCard from '../components/VideoCard';

export default function ChannelScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const params = useLocalSearchParams();

  const channelName = params.channelName || "SADEK Tut's";
  const [isSubscribed, setIsSubscribed] = useState(true);
  const [activeTab, setActiveTab] = useState('Videos');

  const channelVideos = videoFeeds;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]} edges={['top']}>
      {/* Top Header */}
      <View style={[styles.topBar, { backgroundColor: theme.surface }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>{channelName}</Text>
        <TouchableOpacity style={styles.backBtn}>
          <Ionicons name="search-outline" size={20} color={theme.text} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Channel Banner & Profile Card */}
        <View style={styles.bannerBox}>
          <Image
            source={require('../assets/images/video_figma.png')}
            style={styles.bannerImage}
            resizeMode="cover"
          />
        </View>

        <View style={[styles.profileSection, { backgroundColor: theme.surface }]}>
          <Image
            source={require('../assets/images/avatar_sadek.png')}
            style={styles.channelAvatar}
          />

          <Text style={[styles.channelName, { color: theme.text }]}>{channelName}</Text>
          <Text style={[styles.channelMeta, { color: theme.subText }]}>
            @sadektuts • 2.31M Subscribers • 142 Videos
          </Text>
          <Text style={[styles.channelBio, { color: theme.text }]}>
            High-fidelity mobile UI/UX designs, React Native development tutorials, and app breakdowns.
          </Text>

          <TouchableOpacity
            style={[
              styles.subscribeActionBtn,
              { backgroundColor: isSubscribed ? theme.inputBg : colors.youtubeRed },
            ]}
            onPress={() => setIsSubscribed(!isSubscribed)}
          >
            <Text style={[styles.subscribeText, { color: isSubscribed ? theme.text : '#FFFFFF' }]}>
              {isSubscribed ? 'Subscribed' : 'Subscribe'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Switcher: Videos | Playlists | About */}
        <View style={[styles.tabsRow, { backgroundColor: theme.surface, borderBottomColor: theme.divider }]}>
          {['Videos', 'Playlists', 'About'].map((t) => (
            <TouchableOpacity
              key={t}
              style={[
                styles.tabItem,
                activeTab === t && { borderBottomColor: colors.primary, borderBottomWidth: 3 },
              ]}
              onPress={() => setActiveTab(t)}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: activeTab === t ? colors.black : theme.subText, fontWeight: activeTab === t ? '800' : '600' },
                ]}
              >
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Channel Uploads */}
        <View style={styles.uploadsList}>
          {channelVideos.map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </View>
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
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: '800' },
  bannerBox: { width: '100%', height: 110 },
  bannerImage: { width: '100%', height: '100%' },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  channelAvatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    marginTop: -36,
    marginBottom: 8,
  },
  channelName: { fontSize: 20, fontWeight: '900' },
  channelMeta: { fontSize: 12, marginTop: 4 },
  channelBio: { fontSize: 13, textAlign: 'center', marginTop: 8, lineHeight: 18 },
  subscribeActionBtn: {
    marginTop: 14,
    paddingHorizontal: 28,
    paddingVertical: 10,
    borderRadius: radius.full,
  },
  subscribeText: { fontSize: 13, fontWeight: '800' },
  tabsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  tabItem: {
    paddingVertical: 12,
    marginRight: 24,
  },
  tabText: { fontSize: 14 },
  uploadsList: { marginTop: 8 },
});
