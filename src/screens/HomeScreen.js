import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, ImageBackground, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setMatches, setLoading } from '../redux/matchesSlice';
import { fetchUpcomingMatches } from '../services/api';

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const { matches, loading } = useSelector((state) => state.matches);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    dispatch(setLoading(true));
    const data = await fetchUpcomingMatches();
    dispatch(setMatches(data.slice(0, 20)));
    dispatch(setLoading(false));
  };

  const renderMatch = ({ item }) => {
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
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Upcoming</Text>
            </View>
          </View>

          <View style={styles.matchInfo}>
            <View style={styles.team}>
              <View style={styles.teamLogoContainer}>
                {homeTeamLogo ? (
                  <Image 
                    source={{ uri: homeTeamLogo }}
                    style={styles.teamLogoImage}
                    onError={() => console.log('Failed to load home team logo')}
                  />
                ) : (
                  <Feather name="shield" size={40} color="#00d4ff" />
                )}
              </View>
              <Text style={styles.teamName}>{item.strHomeTeam}</Text>
            </View>

            <View style={styles.vs}>
              <Text style={styles.vsText}>VS</Text>
            </View>

            <View style={styles.team}>
              <View style={styles.teamLogoContainer}>
                {awayTeamLogo ? (
                <Image 
                  source={{ uri: awayTeamLogo }}
                  style={styles.teamLogoImage}
                  onError={() => console.log('Failed to load away team logo')}
                 />
                 ) : (
                   <Feather name="shield" size={40} color="#ff6b6b" />
                )}
              </View>
              <Text style={styles.teamName}>{item.strAwayTeam}</Text>
            </View>
          </View>

          <View style={styles.cardFooter}>
            <View style={styles.dateTime}>
              <Feather name="calendar" size={16} color="#6b7280" />
              <Text style={styles.dateText}>{item.dateEvent}</Text>
            </View>
            <View style={styles.dateTime}>
              <Feather name="clock" size={16} color="#6b7280" />
              <Text style={styles.dateText}>{item.strTime || 'TBD'}</Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800' }}        
        style={styles.headerBackground}
        imageStyle={styles.headerImageStyle}
      >
        <LinearGradient
          colors={['rgba(10, 22, 40, 0.3)', 'rgba(10, 22, 40, 0.7)']}
          style={styles.headerGradient}
        >
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>Welcome back,</Text>
              <Text style={styles.userName}>{user?.name || 'User'}</Text>
            </View>
            <Feather name="bell" size={24} color="#00d4ff" />
          </View>
        </LinearGradient>
      </ImageBackground>

      <LinearGradient colors={['#1e3a5f', '#0a1628']} style={styles.content}>
        <Text style={styles.sectionTitle}>Upcoming Matches</Text>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#00d4ff" />
          </View>
        ) : (
          <FlatList
            data={matches}
            renderItem={renderMatch}
            keyExtractor={(item) => item.idEvent}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
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
  userName: {
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
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    paddingHorizontal: 20,
    marginBottom: 16,
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
  statusBadge: {
    backgroundColor: '#00d4ff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#0a1628',
    fontSize: 12,
    fontWeight: 'bold',
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
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  teamLogoImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  teamName: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  vs: {
    paddingHorizontal: 16,
  },
  vsText: {
    fontSize: 16,
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
    fontSize: 12,
    color: '#6b7280',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});