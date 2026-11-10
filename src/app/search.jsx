import React, { useState } from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, useTheme } from '../theme';
import { hotSearches, recentSearches, videoFeeds } from '../data';
import VideoCard from '../components/VideoCard';

export default function SearchScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  const [query, setQuery] = useState('');
  const [history, setHistory] = useState(recentSearches);
  const [hasSearched, setHasSearched] = useState(false);

  const searchResults = videoFeeds.filter((v) =>
    v.title.toLowerCase().includes(query.toLowerCase()) ||
    v.channel.toLowerCase().includes(query.toLowerCase())
  );

  const handleExecuteSearch = (text) => {
    setQuery(text);
    setHasSearched(true);
    if (text.trim() && !history.includes(text.trim())) {
      setHistory([text.trim(), ...history]);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]} edges={['top']}>
      {/* Top Search Bar */}
      <View style={[styles.headerRow, { backgroundColor: theme.surface }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={theme.text} />
        </TouchableOpacity>

        <View style={[styles.searchBox, { backgroundColor: theme.inputBg }]}>
          <Ionicons name="search" size={18} color={theme.subText} />
          <TextInput
            value={query}
            onChangeText={(t) => {
              setQuery(t);
              setHasSearched(false);
            }}
            onSubmitEditing={() => handleExecuteSearch(query)}
            placeholder="Search or enter web address"
            placeholderTextColor={theme.subText}
            style={[styles.input, { color: theme.text }]}
            autoFocus
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => { setQuery(''); setHasSearched(false); }}>
              <Ionicons name="close-circle" size={16} color={theme.subText} />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={[styles.searchActionBtn, { backgroundColor: colors.primary }]}
          onPress={() => handleExecuteSearch(query)}
        >
          <Ionicons name="arrow-forward" size={18} color={colors.black} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {!hasSearched ? (
          <>
            {/* Hot Searches Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="flame" size={18} color="#FF6B00" />
                <Text style={[styles.sectionTitle, { color: theme.text }]}>Hot Searches</Text>
              </View>

              <View style={styles.chipsWrap}>
                {hotSearches.map((item) => (
                  <TouchableOpacity
                    key={item}
                    style={[styles.hotChip, { backgroundColor: theme.inputBg }]}
                    onPress={() => handleExecuteSearch(item)}
                  >
                    <Text style={[styles.hotChipText, { color: theme.text }]}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Recent Searches Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeaderBetween}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="time-outline" size={18} color={theme.subText} />
                  <Text style={[styles.sectionTitle, { color: theme.text }]}>Recent Searches</Text>
                </View>
                <TouchableOpacity onPress={() => setHistory([])}>
                  <Text style={[styles.clearBtnText, { color: colors.red }]}>Clear All</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.recentList}>
                {history.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.recentItem, { borderBottomColor: theme.divider }]}
                    onPress={() => handleExecuteSearch(item)}
                  >
                    <Ionicons name="search-outline" size={16} color={theme.subText} />
                    <Text style={[styles.recentItemText, { color: theme.text }]}>{item}</Text>
                    <Ionicons name="arrow-up-outline" size={16} color={theme.subText} style={{ transform: [{ rotate: '-45deg' }] }} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        ) : (
          /* Search Results */
          <View style={styles.resultsContainer}>
            <Text style={[styles.resultsHeader, { color: theme.subText }]}>
              Found {searchResults.length} results for "{query}"
            </Text>
            {searchResults.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onDownloadPress={() => Alert.alert('Download', `Queued "${video.title}"`)}
                onMorePress={() => Alert.alert('Options', video.title)}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 10,
  },
  backBtn: { padding: 4 },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 42,
    borderRadius: 21,
    paddingHorizontal: 12,
    gap: 8,
  },
  input: { flex: 1, fontSize: 14 },
  searchActionBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: { padding: 16 },
  section: { marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 },
  sectionHeaderBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: { fontSize: 16, fontWeight: '800' },
  clearBtnText: { fontSize: 12, fontWeight: '700' },
  chipsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  hotChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: radius.full,
  },
  hotChipText: { fontSize: 13, fontWeight: '600' },
  recentList: { marginTop: 4 },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    gap: 10,
  },
  recentItemText: { flex: 1, fontSize: 14, fontWeight: '500' },
  resultsContainer: { marginTop: 8 },
  resultsHeader: { fontSize: 13, fontWeight: '600', marginBottom: 12 },
});
