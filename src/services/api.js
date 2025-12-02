import axios from 'axios';

const API_BASE = 'https://www.thesportsdb.com/api/v1/json/3';

export const fetchUpcomingMatches = async () => {
  try {
    const response = await axios.get(`${API_BASE}/eventsseason.php?id=4328&s=2024-2025`);
    return response.data.events || [];
  } catch (error) {
    console.error('Error fetching matches:', error);
    return [];
  }
};

export const fetchMatchDetails = async (eventId) => {
  try {
    const response = await axios.get(`${API_BASE}/lookupevent.php?id=${eventId}`);
    return response.data.events ? response.data.events[0] : null;
  } catch (error) {
    console.error('Error fetching match details:', error);
    return null;
  }
};

export const fetchTeamDetails = async (teamId) => {
  try {
    const response = await axios.get(`${API_BASE}/lookupteam.php?id=${teamId}`);
    return response.data.teams ? response.data.teams[0] : null;
  } catch (error) {
    console.error('Error fetching team details:', error);
    return null;
  }
};

export const fetchTopPlayers = async () => {
  try {
    // Fetch players from top teams
    const teamIds = [133604, 133602, 133613, 133612, 133739]; // Arsenal, Man City, Chelsea, Liverpool, Real Madrid
    const allPlayers = [];
    
    for (const teamId of teamIds) {
      const response = await axios.get(`${API_BASE}/lookup_all_players.php?id=${teamId}`);
      if (response.data.player) {
        allPlayers.push(...response.data.player.slice(0, 6));
      }
    }
    
    return allPlayers;
  } catch (error) {
    console.error('Error fetching players:', error);
    return [];
  }
};

export const fetchPlayerDetails = async (playerId) => {
  try {
    const response = await axios.get(`${API_BASE}/lookupplayer.php?id=${playerId}`);
    return response.data.players ? response.data.players[0] : null;
  } catch (error) {
    console.error('Error fetching player details:', error);
    return null;
  }
};