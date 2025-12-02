import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import MatchDetailsScreen from '../screens/MatchDetailsScreen';
import PlayersScreen from '../screens/PlayersScreen';
import PlayerDetailsScreen from '../screens/PlayerDetailsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ProfileScreen from '../screens/ProfileScreen';
 


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { 
          backgroundColor: '#0a1628', 
          borderTopColor: '#1e3a5f',
          borderTopWidth: 1,
          height: 65,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#00d4ff',
        tabBarInactiveTintColor: '#6b7280',
        headerStyle: { backgroundColor: '#0a1628' },
        headerTintColor: '#fff',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginBottom: 5,

        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="home" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Players"
        component={PlayersScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="users" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="heart" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="user" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen 
            name="MatchDetails" 
            component={MatchDetailsScreen}
            options={{
              headerShown: true,
              headerStyle: { backgroundColor: '#0a1628' },
              headerTintColor: '#fff',
              title: 'Match Details',
            }}
          />
          <Stack.Screen 
            name="PlayerDetails" 
            component={PlayerDetailsScreen}
            options={{
              headerShown: true,
              headerStyle: { backgroundColor: '#0a1628' },
              headerTintColor: '#fff',
              title: 'Player Profile',
            }}
          />
          

        </>
      )}
    </Stack.Navigator>
  );
}