import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, radius, useTheme } from '../theme';
import { videoFeeds } from '../data';
import DownloadSheet from '../components/DownloadSheet';
import ShareSheet from '../components/ShareSheet';

export default function VideoPlayerScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const params = useLocalSearchParams();

  const video = videoFeeds.find((v) => v.id === params.videoId) || videoFeeds[1];

  const [isPlaying, setIsPlaying] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(video.isSubscribed);
  const [autoplay, setAutoplay] = useState(true);

  // Sheets
  const [downloadVisible, setDownloadVisible] = useState(false);
  const [shareVisible, setShareVisible] = useState(false);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#000000' }]} edges={['top', 'bottom']}>
      {/* Video Player Box */}
      <View style={styles.videoPlayerBox}>
        <Image
          source={require('../assets/images/video_armageddon.png')}
          style={styles.playerImage}
          resizeMode="cover"
        />

        {/* Player Overlays: Top Navigation & Playback Controls */}
        <View style={styles.playerControls}>
          <TouchableOpacity style={styles.playerBackBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.centerPlayBtn}
            onPress={() => setIsPlaying(!isPlaying)}
          >
            <Ionicons name={isPlaying ? 'pause' : 'play'} size={36} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Timeline Bar */}
          <View style={styles.playerBottomBar}>
            <Text style={styles.timeText}>01:14 / {video.duration}</Text>
            <View style={styles.seekTrack}>
              <View style={[styles.seekProgress, { width: '45%' }]} />
            </View>
            <TouchableOpacity onPress={() => Alert.alert('Fullscreen', 'Entering full-screen landscape...')}>
              <Ionicons name="scan-outline" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Video Content & Details */}
      <ScrollView style={[styles.contentScroll, { backgroundColor: theme.bg }]} showsVerticalScrollIndicator={false}>
        <View style={[styles.metaSection, { backgroundColor: theme.surface }]}>
          <Text style={[styles.videoTitle, { color: theme.text }]}>
            {video.title}
          </Text>
          <Text style={[styles.videoStats, { color: theme.subText }]}>
            {video.views} • {video.timeAgo}
          </Text>

          {/* Action Row: Download, Share, Like, Save */}
          <View style={[styles.actionsRow, { borderTopColor: theme.divider, borderBottomColor: theme.divider }]}>
            <TouchableOpacity
              style={[styles.actionPill, { backgroundColor: colors.primary }]}
              onPress={() => setDownloadVisible(true)}
              activeOpacity={0.8}
            >
              <Ionicons name="arrow-down" size={18} color={colors.black} />
              <Text style={styles.actionPillText}>Download</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: theme.inputBg }]}
              onPress={() => setShareVisible(true)}
              activeOpacity={0.8}
            >
              <Ionicons name="share-social-outline" size={18} color={theme.text} />
              <Text style={[styles.actionBtnText, { color: theme.text }]}>Share</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: theme.inputBg }]}
              onPress={() => setIsLiked(!isLiked)}
              activeOpacity={0.8}
            >
              <Ionicons
                name={isLiked ? 'thumbs-up' : 'thumbs-up-outline'}
                size={18}
                color={isLiked ? colors.primaryDark : theme.text}
              />
              <Text style={[styles.actionBtnText, { color: theme.text }]}>{video.likes}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: theme.inputBg }]}
              onPress={() => Alert.alert('Saved', 'Added to Watch Later.')}
              activeOpacity={0.8}
            >
              <Ionicons name="bookmark-outline" size={18} color={theme.text} />
              <Text style={[styles.actionBtnText, { color: theme.text }]}>Save</Text>
            </TouchableOpacity>
          </View>

          {/* Channel Bar (Sketch: An Nafee / 2.31M Subscriber / Subscribe button) */}
          <View style={styles.channelRow}>
            <TouchableOpacity
              style={styles.channelLeft}
              onPress={() => router.push({ pathname: '/channel', params: { channelName: video.channel } })}
            >
              <Image
                source={require('../assets/images/avatar_channel2.png')}
                style={styles.channelAvatar}
              />
              <View>
                <Text style={[styles.channelTitle, { color: theme.text }]}>{video.channel}</Text>
                <Text style={[styles.subscriberText, { color: theme.subText }]}>{video.subscribers}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.subscribeBtn,
                { backgroundColor: isSubscribed ? theme.inputBg : colors.youtubeRed },
              ]}
              onPress={() => setIsSubscribed(!isSubscribed)}
              activeOpacity={0.8}
            >
              <Text style={[styles.subscribeBtnText, { color: isSubscribed ? theme.text : '#FFFFFF' }]}>
                {isSubscribed ? 'Subscribed' : 'Subscribe'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Up Next Section */}
        <View style={styles.upNextSection}>
          <View style={styles.upNextHeader}>
            <Text style={[styles.upNextTitle, { color: theme.text }]}>Up Next</Text>
            <View style={styles.autoplayRow}>
              <Text style={[styles.autoplayText, { color: theme.subText }]}>Autoplay</Text>
              <Switch
                value={autoplay}
                onValueChange={setAutoplay}
                trackColor={{ false: '#767577', true: colors.primary }}
                thumbColor={autoplay ? '#151515' : '#f4f3f4'}
              />
            </View>
          </View>

          {videoFeeds.filter((v) => v.id !== video.id).map((nextVideo) => (
            <TouchableOpacity
              key={nextVideo.id}
              style={[styles.nextVideoCard, { backgroundColor: theme.surface, borderColor: theme.cardBorder }]}
              onPress={() => router.push({ pathname: '/video-player', params: { videoId: nextVideo.id } })}
              activeOpacity={0.8}
            >
              <View style={styles.nextThumbBox}>
                <Image
                  source={require('../assets/images/video_figma.png')}
                  style={styles.nextThumb}
                />
                <View style={styles.nextDurationPill}>
                  <Text style={styles.nextDurationText}>{nextVideo.duration}</Text>
                </View>
              </View>

              <View style={styles.nextDetails}>
                <Text style={[styles.nextTitle, { color: theme.text }]} numberOfLines={2}>
                  {nextVideo.title}
                </Text>
                <Text style={[styles.nextMeta, { color: theme.subText }]}>
                  {nextVideo.channel} • {nextVideo.views}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Sheets */}
      <DownloadSheet
        visible={downloadVisible}
        onClose={() => setDownloadVisible(false)}
        video={video}
        onConfirmDownload={(fmt) => {
          setDownloadVisible(false);
          Alert.alert('Download Queued', `Downloading "${video.title}" in ${fmt}...`);
        }}
      />

      <ShareSheet
        visible={shareVisible}
        onClose={() => setShareVisible(false)}
        videoTitle={video.title}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  videoPlayerBox: {
    width: '100%',
    height: 220,
    backgroundColor: '#000000',
    position: 'relative',
  },
  playerImage: { width: '100%', height: '100%' },
  playerControls: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'space-between',
    padding: 12,
  },
  playerBackBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerPlayBtn: {
    alignSelf: 'center',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerBottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  timeText: { color: '#FFFFFF', fontSize: 11, fontWeight: '700' },
  seekTrack: {
    flex: 1,
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 1.5,
    overflow: 'hidden',
  },
  seekProgress: { height: '100%', backgroundColor: colors.primary },
  contentScroll: { flex: 1 },
  metaSection: { padding: 16 },
  videoTitle: { fontSize: 16, fontWeight: '800', lineHeight: 22, marginBottom: 6 },
  videoStats: { fontSize: 12, marginBottom: 14 },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginBottom: 14,
    gap: 8,
  },
  actionPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.full,
    gap: 6,
  },
  actionPillText: { fontSize: 13, fontWeight: '800', color: colors.black },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radius.full,
    gap: 4,
  },
  actionBtnText: { fontSize: 12, fontWeight: '700' },
  channelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  channelLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  channelAvatar: { width: 40, height: 40, borderRadius: 20 },
  channelTitle: { fontSize: 14, fontWeight: '800' },
  subscriberText: { fontSize: 11, marginTop: 2 },
  subscribeBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: radius.full,
  },
  subscribeBtnText: { fontSize: 12, fontWeight: '800' },
  upNextSection: { padding: 16 },
  upNextHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  upNextTitle: { fontSize: 16, fontWeight: '800' },
  autoplayRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  autoplayText: { fontSize: 12, fontWeight: '600' },
  nextVideoCard: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 10,
  },
  nextThumbBox: {
    width: 110,
    height: 68,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#000',
  },
  nextThumb: { width: '100%', height: '100%' },
  nextDurationPill: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: 'rgba(0,0,0,0.75)',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
  },
  nextDurationText: { color: '#FFF', fontSize: 10, fontWeight: '700' },
  nextDetails: { flex: 1, marginLeft: 10 },
  nextTitle: { fontSize: 12, fontWeight: '700', lineHeight: 16, marginBottom: 4 },
  nextMeta: { fontSize: 11 },
});
