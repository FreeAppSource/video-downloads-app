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
import { downloadList, musicTracks } from '../../data';

export default function DownloadsScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  // Tabs: 'Download' | 'Music' | 'Videos'
  const [activeTab, setActiveTab] = useState('Download');
  const [downloads, setDownloads] = useState(downloadList);

  const handleOpenMenu = () => {
    Alert.alert(
      'Download Options',
      'Select a task:',
      [
        { text: 'Pause All', onPress: () => Alert.alert('Paused', 'All downloads paused.') },
        { text: 'Resume All', onPress: () => Alert.alert('Resumed', 'All downloads resumed.') },
        { text: 'Download History', onPress: () => {} },
        { text: 'Clear Completed', onPress: () => setDownloads([]) },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const filteredItems = downloads.filter((item) => {
    if (activeTab === 'Music') return item.type === 'music';
    if (activeTab === 'Videos') return item.type === 'video';
    return true; // 'Download' shows all
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]} edges={['top']}>
      {/* Top Header */}
      <View style={[styles.topBar, { backgroundColor: theme.surface }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>My Files</Text>
        <TouchableOpacity style={styles.menuBtn} onPress={handleOpenMenu}>
          <Ionicons name="ellipsis-vertical" size={20} color={theme.text} />
        </TouchableOpacity>
      </View>

      {/* Segmented Filter: Download | Music | Videos */}
      <View style={[styles.segmentedContainer, { backgroundColor: theme.surface }]}>
        {['Download', 'Music', 'Videos'].map((t) => {
          const isActive = activeTab === t;
          return (
            <TouchableOpacity
              key={t}
              style={[
                styles.tabItem,
                isActive && { borderBottomColor: colors.primary, borderBottomWidth: 3 },
              ]}
              onPress={() => setActiveTab(t)}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: isActive ? colors.black : theme.subText, fontWeight: isActive ? '800' : '600' },
                ]}
              >
                {t}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Storage and Speed Bar */}
      <View style={[styles.statusBar, { backgroundColor: theme.inputBg }]}>
        <View style={styles.statusLeft}>
          <Ionicons name="hardware-chip-outline" size={16} color={colors.primaryDark} />
          <Text style={[styles.statusText, { color: theme.text }]}>
            Available Storage: 12.4 GB Free
          </Text>
        </View>
        <Text style={[styles.speedText, { color: colors.green }]}>⚡ 3.2 MB/s</Text>
      </View>

      {/* List of Downloads / Files */}
      <ScrollView contentContainerStyle={styles.scrollList} showsVerticalScrollIndicator={false}>
        {filteredItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="cloud-download-outline" size={64} color={theme.subText} />
            <Text style={[styles.emptyTitle, { color: theme.text }]}>No files in {activeTab}</Text>
            <Text style={[styles.emptySub, { color: theme.subText }]}>
              Downloaded videos and music files will appear here.
            </Text>
          </View>
        ) : (
          filteredItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.downloadCard, { backgroundColor: theme.surface, borderColor: theme.cardBorder }]}
              onPress={() => {
                if (item.type === 'video') {
                  router.push('/video-player');
                } else {
                  Alert.alert('Playing Audio', `Playing "${item.title}"...`);
                }
              }}
              activeOpacity={0.7}
            >
              <View style={styles.thumbBox}>
                <Image
                  source={require('../../assets/images/download_mesut.png')}
                  style={styles.thumbImage}
                />
                <View style={styles.durationPill}>
                  <Text style={styles.durationText}>{item.duration}</Text>
                </View>
              </View>

              <View style={styles.cardDetails}>
                <Text style={[styles.itemTitle, { color: theme.text }]} numberOfLines={1}>
                  {item.title}
                </Text>

                <View style={styles.metaRow}>
                  <View style={[styles.formatTag, { backgroundColor: colors.primarySoft }]}>
                    <Text style={styles.formatTagText}>{item.format} {item.bitrate}</Text>
                  </View>
                  <Text style={[styles.sizeText, { color: theme.subText }]}>{item.size}</Text>
                </View>

                {/* Progress bar or status */}
                {item.progress < 1.0 && (
                  <View style={styles.progressContainer}>
                    <View style={[styles.progressBar, { width: `${item.progress * 100}%`, backgroundColor: colors.primary }]} />
                  </View>
                )}

                <Text
                  style={[
                    styles.statusLabel,
                    item.status.includes('Success') && { color: colors.green },
                    item.status.includes('Failed') && { color: colors.red },
                  ]}
                >
                  {item.status}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.actionIconBtn}
                onPress={() => {
                  Alert.alert(
                    item.title,
                    'Manage File:',
                    [
                      { text: 'Play File', onPress: () => {} },
                      { text: 'Delete from Storage', style: 'destructive', onPress: () => {
                        setDownloads((prev) => prev.filter((d) => d.id !== item.id));
                      }},
                      { text: 'Cancel', style: 'cancel' },
                    ]
                  );
                }}
              >
                <Ionicons name="ellipsis-vertical" size={16} color={theme.subText} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        )}
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
  menuBtn: { padding: 4 },
  segmentedContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  tabItem: {
    paddingVertical: 12,
    marginRight: 24,
  },
  tabText: { fontSize: 14 },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  statusLeft: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statusText: { fontSize: 12, fontWeight: '600' },
  speedText: { fontSize: 12, fontWeight: '800' },
  scrollList: { padding: 16, gap: 12 },
  downloadCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 14,
    borderWidth: 1,
  },
  thumbBox: {
    width: 72,
    height: 52,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#000',
  },
  thumbImage: { width: '100%', height: '100%' },
  durationPill: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
  },
  durationText: { color: '#FFF', fontSize: 10, fontWeight: '700' },
  cardDetails: { flex: 1, marginLeft: 12 },
  itemTitle: { fontSize: 13, fontWeight: '700', marginBottom: 4 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  formatTag: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  formatTagText: { fontSize: 10, fontWeight: '800', color: colors.black },
  sizeText: { fontSize: 11 },
  progressContainer: {
    width: '100%',
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E0E0E0',
    marginBottom: 4,
    overflow: 'hidden',
  },
  progressBar: { height: '100%' },
  statusLabel: { fontSize: 11, fontWeight: '600', color: '#888' },
  actionIconBtn: { padding: 8 },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
  emptyTitle: { fontSize: 18, fontWeight: '800', marginTop: 12 },
  emptySub: { fontSize: 13, marginTop: 4, textAlign: 'center', paddingHorizontal: 32 },
});
