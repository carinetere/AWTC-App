// src/screens/WelcomeScreen.js
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  StatusBar,
  TouchableOpacity,
  Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  const handleStart = () => {
    // Navigation vers l'écran suivant
    navigation.navigate('Auth'); // Décommenter quand vous aurez un écran suivant
    console.log('Commencer pressed');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Arrière-plan blanc */}
      <View style={styles.background}>
        
        {/* Logo AWTC */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/degra_court.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Texte de bienvenue */}
        <View style={styles.welcomeTextContainer}>
          <Text style={styles.welcomeText}>
            Bienvenue sur l'application de{'\n'}
            Abidjan Women in Tech{'\n'}
            Conference
          </Text>
        </View>

        {/* Bouton Commencer */}
        <TouchableOpacity style={styles.startButton} onPress={handleStart}>
          <LinearGradient
            colors={['#c2185b','#972eaf', '#6041c9']}
            style={styles.buttonGradient}
            start={{ x: 0, y: 1 }}
            end={{ x: 1.5, y: 0 }}
          >
            <Text style={styles.buttonText}>COMMENCER</Text>
          </LinearGradient>
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  background: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logoContainer: {
    marginBottom: height * 0.08,
    alignItems: 'center',
  },
  logo: {
    width: width * 0.6, // 60% de la largeur de l'écran
    height: height * 0.12, // 12% de la hauteur de l'écran
    maxWidth: 240,
    maxHeight: 100,
  },
  welcomeTextContainer: {
    marginBottom: height * 0.12,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 22,
    color: '#333333',
    textAlign: 'center',
    lineHeight: 26,
    fontWeight: 'bold',
  },
  startButton: {
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#e91e63',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 35,
    borderRadius: 25,
    minWidth: 160,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 0,
  },
});

export default WelcomeScreen;