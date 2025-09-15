// App.js - Version avec fallback texte si l'image ne charge pas
import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  Dimensions, 
  StatusBar,
  Text,
  Image 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/WelcomeScreen';
import AuthScreen from './screens/auth/AuthScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import RegistrationFormScreen from './screens/auth/RegistrationFormScreen';
import LoginScreen from './screens/auth/LoginScreen';
import HomeScreen from './screens/main/HomeScreen';
import AgendaScreen from './screens/main/AgendaScreen';
import NotificationsScreen from './screens/main/NotificationsScreen';
import MessagingScreen from './screens/main/MessagingScreen';
import PublicationScreen from './screens/main/PublicationScreen';
import NetworkingScreens from './screens/main/NetworkingScreens';


// Import du SettingsScreen avec gestion d'erreur
let SettingsScreen;
try {
  SettingsScreen = require('./screens/main/SettingsScreen').default;
} catch (error) {
  console.warn('Erreur lors du chargement de SettingsScreen:', error);
  // Composant de fallback temporaire
  SettingsScreen = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Erreur de chargement des paramètres</Text>
    </View>
  );
}

const { width, height } = Dimensions.get('window');
const Stack = createStackNavigator();

const SplashScreen = ({ navigation }) => {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Welcome');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#c72599" />
      <LinearGradient
        colors={['#c72599', '#972eaf', '#6041c9']}
        style={styles.gradient}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.logoContainer}>
          {!imageError ? (
            <Image
              source={require('./assets/images/longblanc.png')}
              style={styles.logo}
              resizeMode="contain"
              onError={() => setImageError(true)}
            />
          ) : (
            // Fallback en cas d'erreur
            <View style={styles.logoText}>
              <Text style={styles.logoAwtc}>awtc</Text>
              <Text style={styles.logoSubtext}>ABIDJAN WOMEN{'\n'}IN TECH CONFERENCE</Text>
            </View>
          )}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logo: {
    width: width * 0.8,
    height: height * 0.2,
    maxWidth: 320,
    maxHeight: 120,
  },
  logoText: {
    alignItems: 'center',
  },
  logoAwtc: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 2,
    marginBottom: 10,
  },
  logoSubtext: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '300',
    letterSpacing: 1,
    lineHeight: 22,
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="RegistrationForm" component={RegistrationFormScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Agenda" component={AgendaScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Messages" component={MessagingScreen} />
        <Stack.Screen name="Publication" component={PublicationScreen} />
        <Stack.Screen name="Networking" component={NetworkingScreens} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}