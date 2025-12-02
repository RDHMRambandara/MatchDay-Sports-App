import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Linking, ScrollView, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const favorites = useSelector((state) => state.favorites.items);

  const handleSettings = () => {
    Alert.alert(
      'Settings',
      'Settings options:\n\n• Language\n• Theme\n• Notifications\n• Privacy\n• Data Usage',
      [{ text: 'OK' }]
    );
  };

  const handleNotifications = () => {
    Alert.alert(
      'Notifications',
      'Notification preferences:\n\n✓ Match reminders\n✓ Favorite team updates\n✓ Score alerts\n✓ Breaking news',
      [{ text: 'OK' }]
    );
  };

  const handleHelp = () => {
    Alert.alert(
      'Help & Support',
      'Need assistance?\n\nContact us:\n📧 support@matchday.com\n📱 +1 234 567 8900\n\nFAQ available at our website',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Visit Website', 
          onPress: () => Linking.openURL('https://www.thesportsdb.com')
        }
      ]
    );
  };

  const handleAbout = () => {
    Alert.alert(
      'About MatchDay',
      'Version: 1.0.0\n\nMatchDay - Your Ultimate Sports Companion\n\nStay updated with live scores, match schedules, and your favorite teams!\n\n© 2024 MatchDay App',
      [{ text: 'OK' }]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          onPress: () => dispatch(logout()), 
          style: 'destructive' 
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800' }}
        style={styles.headerBackground}
        imageStyle={styles.headerImageStyle}
      >
        <LinearGradient
          colors={['rgba(10, 22, 40, 0.3)', 'rgba(10, 22, 40, 0.7)']}
          style={styles.headerGradient}
        >
          <View style={styles.headerContent}>
            <Text style={styles.title}>Profile</Text>
          </View>
          <View style={styles.profileCard}>
            <Text style={styles.name}>{user?.name || 'User'}</Text>
            <Text style={styles.email}>{user?.email || 'user@example.com'}</Text>
          </View>
        </LinearGradient>
      </ImageBackground>

      <LinearGradient colors={['#1e3a5f', '#0a1628']} style={styles.content}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Feather name="heart" size={30} color="#ff6b6b" />
              <Text style={styles.statNumber}>{favorites.length}</Text>
              <Text style={styles.statLabel}>Favorites</Text>
            </View>

            <View style={styles.statCard}>
              <Feather name="activity" size={30} color="#00d4ff" />
              <Text style={styles.statNumber}>15</Text>
              <Text style={styles.statLabel}>Leagues</Text>
            </View>

            <View style={styles.statCard}>
              <Feather name="award" size={30} color="#ffd700" />
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>Teams</Text>
            </View>
          </View>

          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItem} onPress={handleSettings}>
              <View style={styles.menuLeft}>
                <Feather name="settings" size={24} color="#00d4ff" />
                <Text style={styles.menuText}>Settings</Text>
              </View>
              <Feather name="chevron-right" size={24} color="#6b7280" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={handleNotifications}>
              <View style={styles.menuLeft}>
                <Feather name="bell" size={24} color="#00d4ff" />
                <Text style={styles.menuText}>Notifications</Text>
              </View>
              <Feather name="chevron-right" size={24} color="#6b7280" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={handleHelp}>
              <View style={styles.menuLeft}>
                <Feather name="help-circle" size={24} color="#00d4ff" />
                <Text style={styles.menuText}>Help & Support</Text>
              </View>
              <Feather name="chevron-right" size={24} color="#6b7280" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={handleAbout}>
              <View style={styles.menuLeft}>
                <Feather name="info" size={24} color="#00d4ff" />
                <Text style={styles.menuText}>About</Text>
              </View>
              <Feather name="chevron-right" size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Feather name="log-out" size={20} color="#fff" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
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
    height: 250,
  },
  headerImageStyle: {
    opacity: 0.8,
  },
  headerGradient: {
    flex: 1,
  },
  headerContent: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileCard: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  email: {
    fontSize: 15,
    color: '#e0e0e0',
  },
  content: {
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: -20,
    paddingTop: 20,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  menuContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff6b6b',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8,
  },
});