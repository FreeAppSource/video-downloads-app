import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, useTheme } from '../theme';

export default function ShareSheet({ visible, onClose, videoTitle }) {
  const { theme } = useTheme();

  const shareTargets = [
    { id: 'st-cp', name: 'Copy link', icon: 'link-outline', color: '#555555' },
    { id: 'st-wa', name: 'WhatsApp', icon: 'logo-whatsapp', color: '#25D366' },
    { id: 'st-fb', name: 'News Feed', icon: 'logo-facebook', color: '#1877F2' },
    { id: 'st-ch', name: 'Chats', icon: 'chatbubbles-outline', color: '#0084FF' },
    { id: 'st-tw', name: 'Tweet', icon: 'logo-twitter', color: '#1DA1F2' },
    { id: 'st-mo', name: 'More', icon: 'ellipsis-horizontal-circle-outline', color: '#777777' },
  ];

  const handleShare = (target) => {
    onClose();
    Alert.alert('Shared!', `Shared "${videoTitle || 'Video'}" via ${target.name}.`);
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} onPress={onClose} activeOpacity={1} />
        <View style={[styles.sheetContent, { backgroundColor: theme.surface }]}>
          <View style={styles.dragBar} />
          <Text style={[styles.title, { color: theme.text }]}>Share in</Text>

          <View style={styles.grid}>
            {shareTargets.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.gridItem}
                onPress={() => handleShare(item)}
                activeOpacity={0.7}
              >
                <View style={[styles.iconCircle, { backgroundColor: item.color + '15' }]}>
                  <Ionicons name={item.icon} size={24} color={item.color} />
                </View>
                <Text style={[styles.itemName, { color: theme.text }]}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
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
    paddingBottom: 32,
  },
  dragBar: {
    width: 44,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#CCCCCC',
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 20,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  gridItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  itemName: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
});
