// Test des APIs YouTube et Twitch
console.log('🔍 Test des APIs...');

// Configuration depuis les variables d'environnement
import dotenv from 'dotenv';
dotenv.config();

const YOUTUBE_API_KEY = process.env.VITE_YOUTUBE_API_KEY;
const YOUTUBE_CHANNEL_ID = process.env.VITE_YOUTUBE_CHANNEL_ID;
const TWITCH_CLIENT_ID = process.env.VITE_TWITCH_CLIENT_ID;
const TWITCH_CLIENT_SECRET = process.env.VITE_TWITCH_CLIENT_SECRET;
const TWITCH_USERNAME = process.env.VITE_TWITCH_USERNAME;

// Test YouTube API
async function testYouTubeAPI() {
  console.log('📺 Test YouTube API...');
  
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${YOUTUBE_CHANNEL_ID}&key=${YOUTUBE_API_KEY}`
    );
    
    const data = await response.json();
    
    if (data.error) {
      console.error('❌ Erreur YouTube API:', data.error);
      return false;
    }
    
    if (data.items && data.items.length > 0) {
      console.log('✅ YouTube API fonctionne !');
      console.log('📊 Chaîne:', data.items[0].snippet.title);
      console.log('👥 Abonnés:', data.items[0].statistics.subscriberCount);
      console.log('📹 Vidéos:', data.items[0].statistics.videoCount);
      return true;
    } else {
      console.error('❌ Aucune chaîne trouvée avec cet ID');
      return false;
    }
  } catch (error) {
    console.error('❌ Erreur de connexion YouTube:', error);
    return false;
  }
}

// Test Twitch API
async function testTwitchAPI() {
  console.log('🟣 Test Twitch API...');
  
  try {
    // Obtenir un token d'accès
    const authResponse = await fetch('https://id.twitch.tv/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: TWITCH_CLIENT_ID,
        client_secret: TWITCH_CLIENT_SECRET,
        grant_type: 'client_credentials'
      })
    });

    const authData = await authResponse.json();
    
    if (authData.error) {
      console.error('❌ Erreur auth Twitch:', authData.error);
      return false;
    }

    const accessToken = authData.access_token;
    console.log('🔑 Token Twitch obtenu');

    // Tester l'API utilisateur
    const userResponse = await fetch(`https://api.twitch.tv/helix/users?login=${TWITCH_USERNAME}`, {
      headers: {
        'Client-ID': TWITCH_CLIENT_ID,
        'Authorization': `Bearer ${accessToken}`,
      }
    });

    const userData = await userResponse.json();
    
    if (userData.error) {
      console.error('❌ Erreur utilisateur Twitch:', userData.error);
      return false;
    }
    
    if (userData.data && userData.data.length > 0) {
      console.log('✅ Twitch API fonctionne !');
      console.log('🎮 Utilisateur:', userData.data[0].display_name);
      console.log('👁️ Vues totales:', userData.data[0].view_count);
      return true;
    } else {
      console.error('❌ Utilisateur Twitch non trouvé');
      return false;
    }
    
  } catch (error) {
    console.error('❌ Erreur de connexion Twitch:', error);
    return false;
  }
}

// Exécuter les tests
async function runTests() {
  console.log('🚀 Début des tests API...');
  
  const youtubeOK = await testYouTubeAPI();
  const twitchOK = await testTwitchAPI();
  
  console.log('\n📋 Résultats des tests:');
  console.log(`YouTube: ${youtubeOK ? '✅' : '❌'}`);
  console.log(`Twitch: ${twitchOK ? '✅' : '❌'}`);
  
  if (youtubeOK && twitchOK) {
    console.log('🎉 Toutes les APIs fonctionnent !');
  } else {
    console.log('⚠️ Certaines APIs ont des problèmes');
  }
}

// Exécuter si dans le navigateur
if (typeof window !== 'undefined') {
  runTests();
}

// Exporter pour Node.js
if (typeof module !== 'undefined') {
  module.exports = { testYouTubeAPI, testTwitchAPI, runTests };
} 