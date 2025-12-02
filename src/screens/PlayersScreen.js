import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ActivityIndicator, ImageBackground, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayers, setPlayersLoading } from '../redux/playersSlice';
import { fetchTopPlayers } from '../services/api';

export default function PlayersScreen({ navigation }) {
  const dispatch = useDispatch();
  const { players, loading } = useSelector((state) => state.players);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPlayers, setFilteredPlayers] = useState([]);

  useEffect(() => {
    loadPlayers();
  }, []);

  useEffect(() => {
    handleSearch(searchQuery);
  }, [players]);

  const loadPlayers = async () => {
    dispatch(setPlayersLoading(true));
    const data = await fetchTopPlayers();
    dispatch(setPlayers(data));
    dispatch(setPlayersLoading(false));
  };

  const handleSearch = (text) => {
    setSearchQuery(text);

    if (text.trim() === "") {
      setFilteredPlayers(players);
      return;
    }

    const query = text.toLowerCase();

    const result = players.filter((p) =>
      p.strPlayer?.toLowerCase().includes(query) ||
      p.strTeam?.toLowerCase().includes(query) ||
      p.strNationality?.toLowerCase().includes(query) ||
      p.strPosition?.toLowerCase().includes(query)
    );

    setFilteredPlayers(result);
  };

  const renderPlayer = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('PlayerDetails', { player: item })}
    >
      <LinearGradient colors={['#1e3a5f', '#0a1628']} style={styles.cardGradient}>
        <View style={styles.playerImageContainer}>
          {item.strThumb ? (
            <Image source={{ uri: item.strThumb }} style={styles.playerImage} />
          ) : (
            <View style={styles.placeholderImage}>
              <Feather name="user" size={50} color="#00d4ff" />
            </View>
          )}
        </View>

        <View style={styles.playerInfo}>
          <Text style={styles.playerName}>{item.strPlayer}</Text>
          <Text style={styles.position}>{item.strPosition || 'Player'}</Text>

          <View style={styles.teamContainer}>
            <Feather name="shield" size={14} color="#6b7280" />
            <Text style={styles.teamName}>{item.strTeam}</Text>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Feather name="flag" size={12} color="#00d4ff" />
              <Text style={styles.statText}>{item.strNationality}</Text>
            </View>
          </View>
        </View>

        <Feather name="chevron-right" size={24} color="#6b7280" style={styles.arrow} />
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=800' }}
        style={styles.headerBackground}
        imageStyle={styles.headerImageStyle}
      >
        <LinearGradient
          colors={['rgba(10, 22, 40, 0.3)', 'rgba(10, 22, 40, 0.7)']}
          style={styles.headerGradient}
        >
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>Discover</Text>
              <Text style={styles.title}>Top Players</Text>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>

      <LinearGradient colors={['#1e3a5f', '#0a1628']} style={styles.content}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color="#6b7280" />
          <TextInput
            placeholder="Search players..."
            placeholderTextColor="#6b7280"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch("")}>
              <Feather name="x-circle" size={20} color="#6b7280" />
            </TouchableOpacity>
          )}
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#00d4ff" />
            <Text style={styles.loadingText}>Loading players...</Text>
          </View>
        ) : (
          <FlatList
            data={searchQuery ? filteredPlayers : players}
            renderItem={renderPlayer}
            keyExtractor={(item) => item.idPlayer}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <Text style={styles.noResults}>No players found</Text>
            }
          />
        )}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a1628',
  },
  headerBackground: {
    height: 180,
  },
  headerImageStyle: {
    opacity: 0.8,
  },
  headerGradient: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  greeting: {
    fontSize: 14,
    color: '#6b7280',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: -20,
    paddingTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginHorizontal: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: '#fff',
    fontSize: 16,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardGradient: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  playerImageContainer: {
    marginRight: 16,
  },
  playerImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  placeholderImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  position: {
    fontSize: 14,
    color: '#00d4ff',
    marginBottom: 8,
  },
  teamContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  teamName: {
    fontSize: 12,
    color: '#6b7280',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 11,
    color: '#6b7280',
  },
  arrow: {
    marginLeft: 8,
  },
  noResults: {
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#6b7280',
    marginTop: 12,
    fontSize: 14,
  },
});