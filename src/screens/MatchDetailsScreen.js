import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/favoritesSlice';
import { saveFavorites } from '../utils/storage';

export default function MatchDetailsScreen({ route }) {
  const { match } = route.params;
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const [isFavorite, setIsFavorite] = useState(false);

  const homeTeamLogo = match.strHomeTeamBadge || `https://www.thesportsdb.com/images/media/team/badge/${match.idHomeTeam}.png`;
  const awayTeamLogo = match.strAwayTeamBadge || `https://www.thesportsdb.com/images/media/team/badge/${match.idAwayTeam}.png`;

  useEffect(() => {
    const exists = favorites.some(item => item.idEvent === match.idEvent);
    setIsFavorite(exists);
  }, [favorites, match.idEvent]);

  const toggleFavorite = async () => {
    if (isFavorite) {
      dispatch(removeFavorite(match.idEvent));
      Alert.alert('Removed', 'Match removed from favorites');
    } else {
      dispatch(addFavorite(match));
      Alert.alert('Added', 'Match added to favorites');
    }
    await saveFavorites(isFavorite ? favorites.filter(item => item.idEvent !== match.idEvent) : [...favorites, match]);
  };

  return (
    <LinearGradient colors={['#0a1628', '#1e3a5f']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
            <Feather
              name="heart"
              size={28}
              color={isFavorite ? '#ff6b6b' : '#fff'}
              style={{ opacity: isFavorite ? 1 : 0.5 }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.matchHeader}>
          <Text style={styles.league}>{match.strLeague}</Text>
          <Text style={styles.season}>{match.strSeason}</Text>
        </View>

        {/* TEAMS WITH REAL LOGOS */}
        <View style={styles.teamsContainer}>
          <View style={styles.teamSection}>
            <View style={styles.teamLogoLarge}>
              <Image 
                source={{ uri: homeTeamLogo }}
                style={styles.teamLogoImageLarge}
              />
            </View>
            <Text style={styles.teamName}>{match.strHomeTeam}</Text>
            <View style={styles.teamBadge}>
              <Text style={styles.teamLabel}>HOME</Text>
            </View>
          </View>

          <View style={styles.vsSection}>
            <LinearGradient colors={['#00d4ff', '#0a7ea4']} style={styles.vsCircle}>
              <Text style={styles.vsText}>VS</Text>
            </LinearGradient>
          </View>

          <View style={styles.teamSection}>
            <View style={styles.teamLogoLarge}>
              <Image 
                source={{ uri: awayTeamLogo }}
                style={styles.teamLogoImageLarge}
              />
            </View>
            <Text style={styles.teamName}>{match.strAwayTeam}</Text>
            <View style={styles.teamBadge}>
              <Text style={styles.teamLabel}>AWAY</Text>
            </View>
          </View>
        </View>

        {/* MATCH INFO CARD */}
        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>Match Information</Text>
          
          <View style={styles.infoRow}>
            <View style={styles.iconCircle}>
              <Feather name="calendar" size={20} color="#00d4ff" />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.infoLabel}>Date</Text>
              <Text style={styles.infoValue}>{match.dateEvent}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.iconCircle}>
              <Feather name="clock" size={20} color="#00d4ff" />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.infoLabel}>Kick-off Time</Text>
              <Text style={styles.infoValue}>{match.strTime || 'To Be Announced'}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.iconCircle}>
              <Feather name="flag" size={20} color="#00d4ff" />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.infoLabel}>Round</Text>
              <Text style={styles.infoValue}>Round {match.intRound || 'TBA'}</Text>
            </View>
          </View>
        </View>

        {/* STADIUM INFO CARD */}
        {match.strVenue && (
          <View style={styles.stadiumCard}>
            <LinearGradient colors={['#1e3a5f', '#0a1628']} style={styles.stadiumGradient}>
              <View style={styles.stadiumHeader}>
                <Feather name="home" size={24} color="#00d4ff" />
                <Text style={styles.stadiumTitle}>Stadium Information</Text>
              </View>
              
              <View style={styles.stadiumInfo}>
                <Feather name="map-pin" size={18} color="#00d4ff" />
                <Text style={styles.stadiumName}>{match.strVenue}</Text>
              </View>

              {match.strCity && (
                <View style={styles.stadiumDetail}>
                  <Feather name="map" size={16} color="#6b7280" />
                  <Text style={styles.stadiumText}>{match.strCity}, {match.strCountry || 'Location TBA'}</Text>
                </View>
              )}

              <View style={styles.stadiumDetail}>
                <Feather name="users" size={16} color="#6b7280" />
                <Text style={styles.stadiumText}>Capacity: {match.intCapacity || 'TBA'}</Text>
              </View>
            </LinearGradient>
          </View>
        )}

        {/* HEAD TO HEAD STATS */}
        <View style={styles.h2hCard}>
          <LinearGradient colors={['#1e3a5f', '#0a1628']} style={styles.h2hGradient}>
            <View style={styles.h2hHeader}>
              <Feather name="trending-up" size={24} color="#00d4ff" />
              <Text style={styles.h2hTitle}>Head-to-Head</Text>
            </View>
            
            <Text style={styles.h2hSubtitle}>Recent Form & Statistics</Text>

            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{match.intHomeWins || '0'}</Text>
                <Text style={styles.statLabel}>Home Wins</Text>
              </View>
              
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{match.intDraws || '0'}</Text>
                <Text style={styles.statLabel}>Draws</Text>
              </View>
              
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{match.intAwayWins || '0'}</Text>
                <Text style={styles.statLabel}>Away Wins</Text>
              </View>
            </View>

            <Text style={styles.rivalryText}>
              These teams have faced each other {(parseInt(match.intHomeWins || 0) + parseInt(match.intAwayWins || 0) + parseInt(match.intDraws || 0))} times in competitive matches
            </Text>
          </LinearGradient>
        </View>

        {/* MATCH PREVIEW */}
        {match.strDescriptionEN && (
          <View style={styles.descriptionCard}>
            <View style={styles.descriptionHeader}>
              <Feather name="file-text" size={22} color="#00d4ff" />
              <Text style={styles.descriptionTitle}>Match Preview</Text>
            </View>
            <Text style={styles.descriptionText}>{match.strDescriptionEN}</Text>
          </View>
        )}

        {/* QUICK FACTS */}
        <View style={styles.quickFacts}>
          <Text style={styles.quickFactsTitle}>Quick Facts</Text>
          <View style={styles.factRow}>
            <Feather name="alert-circle" size={16} color="#00d4ff" />
            <Text style={styles.factText}>Competition: {match.strLeague}</Text>
          </View>
          <View style={styles.factRow}>
            <Feather name="award" size={16} color="#ffd700" />
            <Text style={styles.factText}>Season: {match.strSeason}</Text>
          </View>
          {match.strStatus && (
            <View style={styles.factRow}>
              <Feather name="activity" size={16} color="#00d4ff" />
              <Text style={styles.factText}>Status: {match.strStatus}</Text>
            </View>
          )}
        </View>

      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'flex-end',
  },
  favoriteButton: {
    padding: 8,
  },
  matchHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  league: {
    fontSize: 20,
    color: '#00d4ff',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  season: {
    fontSize: 14,
    color: '#6b7280',
  },
  teamsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  teamSection: {
    flex: 1,
    alignItems: 'center',
  },
  teamLogoLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  teamLogoImageLarge: {
    width: 84,
    height: 84,
    resizeMode: 'contain',
  },
  teamName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  teamBadge: {
    backgroundColor: 'rgba(0, 212, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#00d4ff',
  },
  teamLabel: {
    fontSize: 11,
    color: '#00d4ff',
    fontWeight: 'bold',
  },
  vsSection: {
    paddingHorizontal: 15,
  },
  vsCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vsText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  infoCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  infoText: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  stadiumCard: {
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
  },
  stadiumGradient: {
    padding: 20,
  },
  stadiumHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stadiumTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 12,
  },
  stadiumInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stadiumName: {
    fontSize: 16,
    color: '#00d4ff',
    fontWeight: '600',
    marginLeft: 10,
  },
  stadiumDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  stadiumText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 10,
  },
  h2hCard: {
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
  },
  h2hGradient: {
    padding: 20,
  },
  h2hHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  h2hTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 12,
  },
  h2hSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    color: '#00d4ff',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  rivalryText: {
    fontSize: 13,
    color: '#6b7280',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  descriptionCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  descriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  descriptionTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 22,
  },
  quickFacts: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
  },
  quickFactsTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  factRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  factText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 10,
  },
});