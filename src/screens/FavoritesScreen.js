import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setFavorites, removeFavorite } from '../redux/favoritesSlice';
import { loadFavorites, saveFavorites } from '../utils/storage';

export default function FavoritesScreen({ navigation }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);

  useEffect(() => {
    loadSavedFavorites();
  }, []);

  const loadSavedFavorites = async () => {
    const saved = await loadFavorites();
    dispatch(setFavorites(saved));
  };

  const handleRemove = async (eventId) => {
    dispatch(removeFavorite(eventId));
    const updated = favorites.filter(item => item.idEvent !== eventId);
    await saveFavorites(updated);
  };

  const renderFavorite = ({ item }) => {
    const homeTeamLogo = item.strHomeTeamBadge || `https://www.thesportsdb.com/images/media/team/badge/${item.idHomeTeam}.png`;
    const awayTeamLogo = item.strAwayTeamBadge || `https://www.thesportsdb.com/images/media/team/badge/${item.idAwayTeam}.png`;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('MatchDetails', { match: item })}
      >
        <LinearGradient colors={['#1e3a5f', '#0a1628']} style={styles.cardGradient}>
          <View style={styles.cardHeader}>
            <Text style={styles.league}>{item.strLeague}</Text>
            <TouchableOpacity onPress={() => handleRemove(item.idEvent)}>
              <Feather name="heart" size={24} color="#ff6b6b" />
            </TouchableOpacity>
          </View>

          <View style={styles.matchInfo}>
            <View style={styles.team}>
              <View style={styles.teamLogoContainer}>
                <Image 
                  source={{ uri: homeTeamLogo }}
                  style={styles.teamLogoImage}
                />
              </View>
              <Text style={styles.teamName}>{item.strHomeTeam}</Text>
            </View>

            <View style={styles.vs}>
              <Text style={styles.vsText}>VS</Text>
            </View>

            <View style={styles.team}>
              <View style={styles.teamLogoContainer}>
                <Image 
                  source={{ uri: awayTeamLogo }}
                  style={styles.teamLogoImage}
                />
              </View>
              <Text style={styles.teamName}>{item.strAwayTeam}</Text>
            </View>
          </View>

          <View style={styles.cardFooter}>
            <View style={styles.dateTime}>
              <Feather name="calendar" size={14} color="#6b7280" />
              <Text style={styles.dateText}>{item.dateEvent}</Text>
            </View>
            {item.strVenue && (
              <View style={styles.dateTime}>
                <Feather name="map-pin" size={14} color="#6b7280" />
                <Text style={styles.dateText}>{item.strVenue}</Text>
              </View>
            )}
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <Feather name="heart" size={80} color="#6b7280" />
      <Text style={styles.emptyTitle}>No Favorites Yet</Text>
      <Text style={styles.emptyText}>Start adding matches to your favorites!</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=800' }}
        style={styles.headerBackground}
        imageStyle={styles.headerImageStyle}
      >
        <LinearGradient
          colors={['rgba(10, 22, 40, 0.3)', 'rgba(10, 22, 40, 0.7)']}
          style={styles.headerGradient}
        >
          <View style={styles.headerContent}>
            <Text style={styles.title}>My Favorites</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{favorites.length}</Text>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>

      <LinearGradient colors={['#1e3a5f', '#0a1628']} style={styles.content}>
        <FlatList
          data={favorites}
          renderItem={renderFavorite}
          keyExtractor={(item) => item.idEvent}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={EmptyState}
          showsVerticalScrollIndicator={false}
        />
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  badge: {
    backgroundColor: '#00d4ff',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#0a1628',
    fontWeight: 'bold',
    fontSize: 16,
  },
  content: {
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: -20,
    paddingTop: 20,
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
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  league: {
    fontSize: 14,
    color: '#6b7280',
  },
  matchInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  team: {
    flex: 1,
    alignItems: 'center',
  },
  teamLogoContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  teamLogoImage: {
    width: 42,
    height: 42,
    resizeMode: 'contain',
  },
  teamName: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  vs: {
    paddingHorizontal: 12,
  },
  vsText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: 'bold',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    paddingTop: 12,
  },
  dateTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateText: {
    fontSize: 11,
    color: '#6b7280',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 8,
  },
});