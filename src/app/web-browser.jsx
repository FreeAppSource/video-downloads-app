import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, radius, useTheme } from '../theme';
import { socialShortcuts } from '../data';
import DownloadSheet from '../components/DownloadSheet';

export default function WebBrowserScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const params = useLocalSearchParams();

  const [url, setUrl] = useState(params.url || 'https://m.youtube.com');
  const [downloadModalVisible, setDownloadModalVisible] = useState(false);

  const mockDetectedVideo = {
    title: 'Detected Media from ' + (params.title || 'Web Stream'),
    duration: '04:32',
    channel: 'Web Streamer',
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]} edges={['top', 'bottom']}>
      {/* Browser Navigation Bar */}
      <View style={[styles.navBar, { backgroundColor: theme.surface }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.navBtn}>
          <Ionicons name="arrow-back" size={20} color={theme.text} />
        </TouchableOpacity>

        <View style={[styles.urlBox, { backgroundColor: theme.inputBg }]}>
          <Ionicons name="lock-closed" size={14} color={colors.green} />
          <TextInput
            value={url}
            onChangeText={setUrl}
            style={[styles.urlInput, { color: theme.text }]}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={() => Alert.alert('Refreshed', 'Page reloaded.')}>
            <Ionicons name="reload" size={16} color={theme.subText} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.push('/(tabs)')} style={styles.navBtn}>
          <Ionicons name="home-outline" size={20} color={theme.text} />
        </TouchableOpacity>
      </View>

      {/* Browser Content Area */}
      <View style={styles.browserViewport}>
        <ScrollView contentContainerStyle={styles.browserContent}>
          <View style={[styles.webHeaderCard, { backgroundColor: theme.surface }]}>
            <Ionicons name="globe-outline" size={48} color={colors.primary} />
            <Text style={[styles.webHeaderTitle, { color: theme.text }]}>
              {params.title || 'Web Browser'}
            </Text>
            <Text style={[styles.webHeaderSub, { color: theme.subText }]}>
              Browsing: {url}
            </Text>
          </View>

          {/* Quick Portal Switcher */}
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Quick Portals</Text>
          <View style={styles.portalsRow}>
            {socialShortcuts.map((sc) => (
              <TouchableOpacity
                key={sc.id}
                style={[styles.portalChip, { backgroundColor: theme.surface, borderColor: theme.cardBorder }]}
                onPress={() => setUrl(sc.url)}
              >
                <Ionicons name={sc.icon} size={18} color={sc.color} />
                <Text style={[styles.portalText, { color: theme.text }]}>{sc.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Floating Download Video Grabber Button */}
        <TouchableOpacity
          style={[styles.floatingGrabberBtn, { backgroundColor: colors.primary }]}
          onPress={() => setDownloadModalVisible(true)}
          activeOpacity={0.85}
        >
          <Ionicons name="arrow-down-circle" size={28} color={colors.black} />
          <Text style={styles.grabberBtnText}>Download Detected Video</Text>
        </TouchableOpacity>
      </View>

      <DownloadSheet
        visible={downloadModalVisible}
        onClose={() => setDownloadModalVisible(false)}
        video={mockDetectedVideo}
        onConfirmDownload={(fmt) => {
          setDownloadModalVisible(false);
          Alert.alert('Download Started', `Downloaded web media in ${fmt}.`);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  navBtn: { padding: 6 },
  urlBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 38,
    borderRadius: 19,
    paddingHorizontal: 12,
    gap: 8,
  },
  urlInput: { flex: 1, fontSize: 13 },
  browserViewport: { flex: 1, position: 'relative' },
  browserContent: { padding: 20 },
  webHeaderCard: {
    alignItems: 'center',
    padding: 24,
    borderRadius: 20,
    marginBottom: 20,
  },
  webHeaderTitle: { fontSize: 20, fontWeight: '800', marginTop: 10 },
  webHeaderSub: { fontSize: 13, marginTop: 4, textAlign: 'center' },
  sectionTitle: { fontSize: 15, fontWeight: '800', marginBottom: 12 },
  portalsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  portalChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    gap: 8,
  },
  portalText: { fontSize: 13, fontWeight: '700' },
  floatingGrabberBtn: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
    height: 54,
    borderRadius: 27,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  grabberBtnText: { color: colors.black, fontSize: 15, fontWeight: '800' },
});
