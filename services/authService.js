import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Fonction pour sauvegarder les tokens
export const saveTokens = async (accessToken, refreshToken = null) => {
  try {
    await AsyncStorage.setItem('accessToken', accessToken);
    if (refreshToken) {
      await AsyncStorage.setItem('refreshToken', refreshToken);
    }
    console.log('Tokens sauvegardés avec succès');
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des tokens:', error);
    throw error;
  }
};

// Fonction pour récupérer le token d'accès
export const getAccessToken = async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    return token;
  } catch (error) {
    console.error('Erreur lors de la récupération du token:', error);
    return null;
  }
};

// Fonction pour récupérer le refresh token
export const getRefreshToken = async () => {
  try {
    const token = await AsyncStorage.getItem('refreshToken');
    return token;
  } catch (error) {
    console.error('Erreur lors de la récupération du refresh token:', error);
    return null;
  }
};

// Fonction pour supprimer les tokens
export const removeTokens = async () => {
  try {
    await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
    console.log('Tokens supprimés avec succès');
  } catch (error) {
    console.error('Erreur lors de la suppression des tokens:', error);
  }
};

// Fonction pour vérifier si l'utilisateur est connecté
export const isAuthenticated = async () => {
  try {
    const token = await getAccessToken();
    return !!token;
  } catch (error) {
    console.error('Erreur lors de la vérification d\'authentification:', error);
    return false;
  }
};

// Fonction pour l'inscription
export const register = async (userData) => {
  try {
    console.log("URL de l'API utilisée:", api.defaults.baseURL);
    console.log("Données d'inscription envoyées:", userData);
    
    const response = await api.post('users/register/', userData);
    
    console.log("Réponse d'inscription reçue:", response.data);
    
    // Si l'API renvoie des tokens après l'inscription
    if (response.data.access_token || response.data.access) {
      const accessToken = response.data.access_token || response.data.access;
      const refreshToken = response.data.refresh_token || response.data.refresh;
      
      await saveTokens(accessToken, refreshToken);
    }
    
    return response;
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    
    // Log détaillé de l'erreur pour le débogage
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
      console.error('Headers:', error.response.headers);
    } else if (error.request) {
      console.error('Request:', error.request);
    } else {
      console.error('Message:', error.message);
    }
    
    throw error;
  }
};

// 🔧 FONCTION DE LOGIN CORRIGÉE
export const login = async (credentials) => {
  try {
    console.log("Tentative de connexion avec:", credentials);
    
    // ✅ Utiliser l'endpoint JWT token au lieu de users/login/
    const response = await api.post('token/', {
      email: credentials.email,    // Votre serializer attend 'email'
      password: credentials.password
    });
    
    console.log("Réponse de connexion reçue:", response.data);
    
    // ✅ Les tokens JWT sont dans 'access' et 'refresh' (pas 'access_token')
    if (response.data.access && response.data.refresh) {
      await saveTokens(response.data.access, response.data.refresh);
      console.log("Tokens JWT sauvegardés");
    }
    
    return response;
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    
    // Debug détaillé
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
    
    throw error;
  }
};

// Fonction alternative si l'endpoint token ne fonctionne pas
export const loginAlternative = async (credentials) => {
  try {
    console.log("Tentative de connexion alternative avec:", credentials);
    
    // Tester différents endpoints possibles
    const possibleEndpoints = [
      'auth/login/',
      'api/token/',
      'token/',
      'users/token/',
    ];
    
    let lastError;
    
    for (const endpoint of possibleEndpoints) {
      try {
        console.log(`Essai de l'endpoint: ${endpoint}`);
        
        const response = await api.post(endpoint, {
          email: credentials.email,
          password: credentials.password
        });
        
        console.log(`✅ Succès avec l'endpoint: ${endpoint}`, response.data);
        
        // Sauvegarder les tokens
        if (response.data.access && response.data.refresh) {
          await saveTokens(response.data.access, response.data.refresh);
        } else if (response.data.access_token && response.data.refresh_token) {
          await saveTokens(response.data.access_token, response.data.refresh_token);
        }
        
        return response;
        
      } catch (endpointError) {
        console.log(`❌ Échec avec ${endpoint}:`, endpointError.response?.status || endpointError.message);
        lastError = endpointError;
        continue;
      }
    }
    
    throw lastError; // Si tous les endpoints échouent
    
  } catch (error) {
    console.error('Erreur lors de la connexion alternative:', error);
    throw error;
  }
};

// Fonction pour la déconnexion
export const logout = async () => {
  try {
    // Optionnel: Appeler l'endpoint de logout de l'API
    // await api.post('users/logout/');
    
    // Supprimer les tokens du stockage local
    await removeTokens();
    
    console.log('Déconnexion réussie');
    return true;
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
    // Même en cas d'erreur, on supprime les tokens localement
    await removeTokens();
    return false;
  }
};

// Fonction pour récupérer le profil de l'utilisateur
export const getProfile = async (username) => {
  try {
    const response = await api.get(`users/profile/${username}/`);
    return response;
  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error);
    throw error;
  }
};

// 🔧 FONCTION DE REFRESH TOKEN CORRIGÉE
export const refreshAccessToken = async () => {
  try {
    const refreshToken = await getRefreshToken();
    
    if (!refreshToken) {
      throw new Error('Aucun refresh token disponible');
    }
    
    // ✅ Utiliser l'endpoint JWT refresh standard
    const response = await api.post('token/refresh/', {
      refresh: refreshToken
    });
    
    if (response.data.access) {
      await AsyncStorage.setItem('accessToken', response.data.access);
      return response.data.access;
    }
    
    throw new Error('Impossible de rafraîchir le token');
  } catch (error) {
    console.error('Erreur lors du rafraîchissement du token:', error);
    // En cas d'erreur, supprimer tous les tokens
    await removeTokens();
    throw error;
  }
};