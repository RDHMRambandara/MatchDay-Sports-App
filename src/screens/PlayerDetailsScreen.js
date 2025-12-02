import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

export default function PlayerDetailsScreen({ route }) {
  const { player } = route.params;

  return (
    <LinearGradient colors={['#0a1628', '#1e3a5f']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          {player.strThumb ? (
            <Image source={{ uri: player.strThumb }} style={styles.playerImage} />
          ) : (
            <View style={styles.placeholderImage}>
              <Feather name="user" size={100} color="#00d4ff" />
            </View>
          )}
        </View>

        <View style={styles.content}>
          <Text style={styles.name}>{player.strPlayer}</Text>
          <Text style={styles.position}>{player.strPosition || 'Player'}</Text>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Feather name="shield" size={20} color="#00d4ff" />
              <View style={styles.infoText}>
                <Text style={styles.infoLabel}>Team</Text>
                <Text style={styles.infoValue}>{player.strTeam}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <Feather name="flag" size={20} color="#00d4ff" />
              <View style={styles.infoText}>
                <Text style={styles.infoLabel}>Nationality</Text>
                <Text style={styles.infoValue}>{player.strNationality}</Text>
              </View>
            </View>

            {player.dateBorn && (
              <View style={styles.infoRow}>
                <Feather name="calendar" size={20} color="#00d4ff" />
                <View style={styles.infoText}>
                  <Text style={styles.infoLabel}>Date of Birth</Text>
                  <Text style={styles.infoValue}>{player.dateBorn}</Text>
                </View>
              </View>
            )}

            {player.strHeight && (
              <View style={styles.infoRow}>
                <Feather name="trending-up" size={20} color="#00d4ff" />
                <View style={styles.infoText}>
                  <Text style={styles.infoLabel}>Height</Text>
                  <Text style={styles.infoValue}>{player.strHeight}</Text>
                </View>
              </View>
            )}

            {player.strWeight && (
              <View style={styles.infoRow}>
                <Feather name="activity" size={20} color="#00d4ff" />
                <View style={styles.infoText}>
                  <Text style={styles.infoLabel}>Weight</Text>
                  <Text style={styles.infoValue}>{player.strWeight}</Text>
                </View>
              </View>
            )}
          </View>

          {player.strDescriptionEN && (
            <View style={styles.bioCard}>
              <Text style={styles.bioTitle}>Biography</Text>
              <Text style={styles.bioText}>{player.strDescriptionEN}</Text>
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
  imageContainer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  playerImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: '#00d4ff',
  },
  placeholderImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#00d4ff',
  },
  content: {
    paddingHorizontal: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  position: {
    fontSize: 18,
    color: '#00d4ff',
    textAlign: 'center',
    marginBottom: 30,
  },
  infoCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  infoText: {
    marginLeft: 16,
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
  bioCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  bioTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  bioText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 22,
  },
});