import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, useTheme } from '../theme';

export default function VideoCard({ video, onDownloadPress, onMorePress }) {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.surface }]}>
      {/* Thumbnail with duration badge */}
      <TouchableOpacity
        style={styles.thumbnailContainer}
        onPress={() => router.push({ pathname: '/video-player', params: { videoId: video.id } })}
        activeOpacity={0.9}
      >
        <Image
          source={require('../assets/images/video_figma.png')}
          style={styles.thumbnail}
          resizeMode="cover"
        />
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{video.duration}</Text>
        </View>

        {/* Floating Quick Download Icon */}
        <TouchableOpacity
          style={[styles.quickDownloadBtn, { backgroundColor: colors.primary }]}
          onPress={() => onDownloadPress && onDownloadPress(video)}
          activeOpacity={0.8}
        >
          <Ionicons name="arrow-down" size={18} color={colors.black} />
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Info Row: Channel Avatar, Title, Views & Menu */}
      <View style={styles.infoRow}>
        <TouchableOpacity
          onPress={() => router.push({ pathname: '/channel', params: { channelName: video.channel } })}
        >
          <Image
            source={require('../assets/images/avatar_sadek.png')}
            style={styles.avatar}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.metaColumn}
          onPress={() => router.push({ pathname: '/video-player', params: { videoId: video.id } })}
        >
          <Text style={[styles.title, { color: theme.text }]} numberOfLines={2}>
            {video.title}
          </Text>
          <Text style={[styles.subMeta, { color: theme.subText }]}>
            {video.channel} • {video.views} • {video.timeAgo}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.moreBtn}
          onPress={() => onMorePress && onMorePress(video)}
        >
          <Ionicons name="ellipsis-vertical" size={18} color={theme.subText} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  thumbnailContainer: {
    width: '100%',
    height: 204,
    position: 'relative',
    backgroundColor: '#000000',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 10,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.82)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  durationText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  quickDownloadBtn: {
    position: 'absolute',
    bottom: 10,
    left: 12,
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'flex-start',
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginRight: 12,
    marginTop: 2,
  },
  metaColumn: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
    marginBottom: 4,
  },
  subMeta: {
    fontSize: 12,
    fontWeight: '500',
  },
  moreBtn: {
    padding: 6,
    marginLeft: 4,
  },
});
