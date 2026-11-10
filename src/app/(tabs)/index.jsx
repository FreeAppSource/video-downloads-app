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
import { socialShortcuts, videoFeeds } from '../../data';
import Header from '../../components/Header';
import VideoCard from '../../components/VideoCard';
import DownloadSheet from '../../components/DownloadSheet';
import ShareSheet from '../../components/ShareSheet';

export default function HomeScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  const categories = ['For You', 'Trending', 'Music', 'Channels', 'Web'];
  const [activeCategory, setActiveCategory] = useState('For You');

  // Sheet states
  const [downloadModalVisible, setDownloadModalVisible] = useState(false);
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);

  const handleDownloadPress = (video) => {
    setActiveVideo(video);
    setDownloadModalVisible(true);
  };

  const handleMorePress = (video) => {
    setActiveVideo(video);
    Alert.alert(
      video.title,
      'Choose an action:',
      [
        { text: 'Download Now', onPress: () => handleDownloadPress(video) },
        { text: 'Share Video', onPress: () => setShareModalVisible(true) },
        { text: 'Not Interested', style: 'destructive' },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleConfirmDownload = (format, isPrivate) => {
    setDownloadModalVisible(false);
    Alert.alert(
      'Download Started! 🚀',
      `Downloading "${activeVideo?.title}" in ${format}${isPrivate ? ' (Private Vault)' : ''}.`,
      [
        { text: 'View Downloads', onPress: () => router.push('/(tabs)/downloads') },
        { text: 'OK' },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]} edges={['top']}>
      {/* Top Header with App Title & Search Bar */}
      <Header />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Quick Social Portals Row (Sketch: WhatsApp, Facebook, Youtube, Instagram, Dribbble, Add Web) */}
        <View style={styles.socialSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.socialRow}>
            {socialShortcuts.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.socialItem}
                onPress={() => router.push({ pathname: '/web-browser', params: { url: item.url, title: item.name } })}
                activeOpacity={0.7}
              >
                <View style={[styles.socialIconCircle, { backgroundColor: item.color + '18' }]}>
                  <Ionicons name={item.icon} size={22} color={item.color} />
                </View>
                <Text style={[styles.socialName, { color: theme.text }]} numberOfLines={1}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}

            {/* Add Web Shortcut */}
            <TouchableOpacity
              style={styles.socialItem}
              onPress={() => router.push('/web-browser')}
              activeOpacity={0.7}
            >
              <View style={[styles.socialIconCircle, { backgroundColor: theme.inputBg }]}>
                <Ionicons name="add" size={24} color={theme.subText} />
              </View>
              <Text style={[styles.socialName, { color: theme.subText }]}>Add Web</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Category Pills (For You, Trending, Music, Channels, Web) */}
        <View style={styles.categorySection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.catChip,
                    { backgroundColor: isActive ? colors.primary : theme.chipBg },
                  ]}
                  onPress={() => setActiveCategory(cat)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.catText,
                      { color: isActive ? colors.black : theme.text, fontWeight: isActive ? '800' : '600' },
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Video Feed */}
        <View style={styles.feedList}>
          {videoFeeds.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onDownloadPress={handleDownloadPress}
              onMorePress={handleMorePress}
            />
          ))}
        </View>
      </ScrollView>

      {/* Download Resolution Selector Modal */}
      <DownloadSheet
        visible={downloadModalVisible}
        onClose={() => setDownloadModalVisible(false)}
        video={activeVideo}
        onConfirmDownload={handleConfirmDownload}
      />

      {/* Share Target Modal */}
      <ShareSheet
        visible={shareModalVisible}
        onClose={() => setShareModalVisible(false)}
        videoTitle={activeVideo?.title}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingBottom: 24 },
  socialSection: { paddingVertical: 10 },
  socialRow: { paddingHorizontal: 16, gap: 14 },
  socialItem: { alignItems: 'center', width: 62 },
  socialIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  socialName: { fontSize: 11, fontWeight: '600', textAlign: 'center' },
  categorySection: { paddingVertical: 8, marginBottom: 8 },
  categoryRow: { paddingHorizontal: 16, gap: 8 },
  catChip: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: radius.full,
  },
  catText: { fontSize: 13 },
  feedList: {},
});
