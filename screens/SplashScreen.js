// src/screens/SplashScreen.js
import React, { useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  Dimensions, 
  StatusBar,
  Image 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Simuler un temps de chargement puis naviguer vers l'écran principal
    const timer = setTimeout(() => {
      navigation.replace('Welcome')
      // navigation.replace('Main'); // Décommenter quand la navigation sera configurée
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#c72599" />
      <LinearGradient
        colors={['#c72599', '#972eaf', '#6041c9']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.logoContainer}>
          <Image
            source={require('./assets/images/longblanc.png')} // Vous devrez ajouter le logo dans assets/images/
            style={styles.logo}
            resizeMode="contain"
          />
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
    width: width * 0.8, // 80% de la largeur de l'écran
    height: height * 0.15, // 15% de la hauteur de l'écran
    maxWidth: 300,
    maxHeight: 100,
  },
});

export default SplashScreen;