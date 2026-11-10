import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, useTheme } from '../theme';
import { userProfile } from '../data';

export default function EditProfileScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  const [name, setName] = useState(userProfile.name);
  const [gender, setGender] = useState(userProfile.gender);
  const [birthday, setBirthday] = useState(userProfile.birthday);

  const handleSave = () => {
    Alert.alert('Profile Updated! 👤', 'Your profile details have been saved.', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]} edges={['top', 'bottom']}>
      {/* Top Header */}
      <View style={[styles.topBar, { backgroundColor: theme.surface }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Edit Profile</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={[styles.saveBtnText, { color: colors.primaryDark }]}>Save</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Avatar update */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrapper}>
            <Image
              source={require('../assets/images/avatar_user.png')}
              style={styles.avatar}
            />
            <TouchableOpacity style={[styles.cameraBtn, { backgroundColor: colors.primary }]}>
              <Ionicons name="camera" size={16} color={colors.black} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Form Fields */}
        <View style={[styles.formCard, { backgroundColor: theme.surface, borderColor: theme.cardBorder }]}>
          <View style={styles.fieldRow}>
            <Text style={[styles.label, { color: theme.subText }]}>Name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              style={[styles.input, { color: theme.text }]}
            />
          </View>

          <View style={[styles.divider, { backgroundColor: theme.divider }]} />

          <View style={styles.fieldRow}>
            <Text style={[styles.label, { color: theme.subText }]}>Gender</Text>
            <TextInput
              value={gender}
              onChangeText={setGender}
              style={[styles.input, { color: theme.text }]}
            />
          </View>

          <View style={[styles.divider, { backgroundColor: theme.divider }]} />

          <View style={styles.fieldRow}>
            <Text style={[styles.label, { color: theme.subText }]}>Birthday</Text>
            <TextInput
              value={birthday}
              onChangeText={setBirthday}
              style={[styles.input, { color: theme.text }]}
            />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.saveActionBtn, { backgroundColor: colors.primary }]}
          onPress={handleSave}
          activeOpacity={0.85}
        >
          <Text style={styles.saveActionText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
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
  saveBtnText: { fontSize: 15, fontWeight: '800' },
  content: { padding: 20 },
  avatarSection: { alignItems: 'center', marginVertical: 20 },
  avatarWrapper: { position: 'relative' },
  avatar: { width: 90, height: 90, borderRadius: 45 },
  cameraBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formCard: {
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  fieldRow: {
    paddingVertical: 14,
  },
  label: { fontSize: 12, fontWeight: '700', marginBottom: 6 },
  input: { fontSize: 15, fontWeight: '700' },
  divider: { height: 1, width: '100%' },
  saveActionBtn: {
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveActionText: { color: colors.black, fontSize: 15, fontWeight: '800' },
});
