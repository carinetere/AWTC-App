import axios from 'axios';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Version temporaire pour tester différentes URLs
const possibleUrls = [
  'http://10.0.2.2:8000/api/',  
   'http://192.168.1.10:8000/api/',   // Émulateur Android
  'http://localhost:8000/api/',     // Local
  'http://127.0.0.1:8000/api/'      // Localhost
];

let baseURL;

if (Platform.OS === 'android') {
  baseURL = possibleUrls[0]; // Émulateur Android
} else if (Platform.OS === 'ios') {
  baseURL = possibleUrls[1]; // IP réseau
} else {
  baseURL = possibleUrls[2]; // Web
}

console.log(`Plateforme: ${Platform.OS}, URL API tentée: ${baseURL}`);

const api = axios.create({
  baseURL: baseURL,
  timeout: 10000, // Timeout de 10 secondes
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur de requêtes pour ajouter le token
api.interceptors.request.use(
  async (config) => {
    try {
      // Utilisation d'AsyncStorage au lieu de localStorage
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur de réponses pour gérer les erreurs d'authentification
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Token expiré ou invalide, supprimer le token stocké
      try {
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
      } catch (storageError) {
        console.error('Erreur lors de la suppression des tokens:', storageError);
      }
      
      // Optionnel: Rediriger vers la page de connexion
      // NavigationService.navigate('Login');
    }

    return Promise.reject(error);
  }
);

export default api;