import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Switch,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, useTheme } from '../theme';
import { downloadQualities } from '../data';

export default function DownloadSheet({ visible, onClose, video, onConfirmDownload }) {
  const { theme } = useTheme();
  const [isPrivate, setIsPrivate] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState('MP3 320K');

  if (!video) return null;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} onPress={onClose} activeOpacity={1} />

        <View style={[styles.sheetContent, { backgroundColor: theme.surface }]}>
          {/* Header Drag Bar */}
          <View style={styles.dragBar} />

          {/* Video Preview Card */}
          <View style={[styles.previewRow, { borderBottomColor: theme.divider }]}>
            <Image
              source={require('../assets/images/download_mesut.png')}
              style={styles.previewThumb}
            />
            <View style={styles.previewMeta}>
              <Text style={[styles.previewTitle, { color: theme.text }]} numberOfLines={2}>
                {video.title}
              </Text>
              <Text style={[styles.previewDuration, { color: theme.subText }]}>
                Duration: {video.duration || '45:01'}
              </Text>
            </View>
          </View>

          {/* Private Download Toggle (Component 4/ON vs Component 4/OFF) */}
          <View style={[styles.privateToggleRow, { backgroundColor: theme.inputBg }]}>
            <View style={styles.privateInfo}>
              <Ionicons
                name={isPrivate ? 'lock-closed' : 'lock-open-outline'}
                size={18}
                color={isPrivate ? colors.primary : theme.subText}
              />
              <Text style={[styles.privateText, { color: theme.text }]}>Private download</Text>
            </View>
            <Switch
              value={isPrivate}
              onValueChange={setIsPrivate}
              trackColor={{ false: '#767577', true: colors.primary }}
              thumbColor={isPrivate ? '#151515' : '#f4f3f4'}
            />
          </View>

          <ScrollView style={styles.formatsScroll} showsVerticalScrollIndicator={false}>
            {/* Music Formats */}
            <Text style={[styles.sectionLabel, { color: theme.subText }]}>MUSIC FORMATS</Text>
            <View style={styles.qualityList}>
              {downloadQualities.music.map((item) => {
                const isSelected = selectedFormat === item.format;
                return (
                  <TouchableOpacity
                    key={item.format}
                    style={[
                      styles.qualityCard,
                      { backgroundColor: theme.inputBg },
                      isSelected && { borderColor: colors.primary, borderWidth: 2, backgroundColor: colors.primarySoft },
                    ]}
                    onPress={() => setSelectedFormat(item.format)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.formatLeft}>
                      <Ionicons
                        name="musical-note"
                        size={16}
                        color={isSelected ? colors.black : theme.text}
                      />
                      <Text style={[styles.formatName, { color: isSelected ? colors.black : theme.text }]}>
                        {item.format}
                      </Text>
                      <Text style={[styles.qualityTag, { color: theme.subText }]}>({item.quality})</Text>
                    </View>
                    <Text style={[styles.formatSize, { color: isSelected ? colors.black : colors.primaryDark }]}>
                      {item.size}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Video Formats */}
            <Text style={[styles.sectionLabel, { color: theme.subText, marginTop: 14 }]}>VIDEO FORMATS</Text>
            <View style={styles.qualityList}>
              {downloadQualities.video.map((item) => {
                const isSelected = selectedFormat === item.format;
                return (
                  <TouchableOpacity
                    key={item.format}
                    style={[
                      styles.qualityCard,
                      { backgroundColor: theme.inputBg },
                      isSelected && { borderColor: colors.primary, borderWidth: 2, backgroundColor: colors.primarySoft },
                    ]}
                    onPress={() => setSelectedFormat(item.format)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.formatLeft}>
                      <Ionicons
                        name="videocam-outline"
                        size={16}
                        color={isSelected ? colors.black : theme.text}
                      />
                      <Text style={[styles.formatName, { color: isSelected ? colors.black : theme.text }]}>
                        {item.format}
                      </Text>
                      <Text style={[styles.qualityTag, { color: theme.subText }]}>({item.quality})</Text>
                    </View>
                    <Text style={[styles.formatSize, { color: isSelected ? colors.black : colors.primaryDark }]}>
                      {item.size}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View style={{ height: 20 }} />
          </ScrollView>

          {/* Start Download Button */}
          <TouchableOpacity
            style={[styles.downloadBtn, { backgroundColor: colors.primary }]}
            onPress={() => onConfirmDownload && onConfirmDownload(selectedFormat, isPrivate)}
            activeOpacity={0.85}
          >
            <Ionicons name="arrow-down-circle" size={20} color={colors.black} />
            <Text style={styles.downloadBtnText}>
              Download {selectedFormat}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
  },
  sheetContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 28,
    maxHeight: '85%',
  },
  dragBar: {
    width: 44,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#CCCCCC',
    alignSelf: 'center',
    marginBottom: 14,
  },
  previewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 14,
    borderBottomWidth: 1,
    marginBottom: 12,
    gap: 12,
  },
  previewThumb: {
    width: 68,
    height: 48,
    borderRadius: 8,
  },
  previewMeta: {
    flex: 1,
  },
  previewTitle: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 18,
  },
  previewDuration: {
    fontSize: 12,
    marginTop: 4,
  },
  privateToggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    marginBottom: 14,
  },
  privateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  privateText: {
    fontSize: 13,
    fontWeight: '700',
  },
  formatsScroll: {
    maxHeight: 320,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.6,
    marginBottom: 8,
  },
  qualityList: {
    gap: 8,
  },
  qualityCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  formatLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  formatName: {
    fontSize: 13,
    fontWeight: '700',
  },
  qualityTag: {
    fontSize: 11,
  },
  formatSize: {
    fontSize: 13,
    fontWeight: '800',
  },
  downloadBtn: {
    height: 52,
    borderRadius: 26,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
  },
  downloadBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.black,
  },
});
