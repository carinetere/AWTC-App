// screens/AuthScreen.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const AuthScreen = ({ navigation }) => {
  const [imageError, setImageError] = useState(false);

  const handleSignUp = () => {
    // Navigation vers l'écran d'inscription
     navigation.navigate('Register');
    console.log('S\'inscrire pressed');
  };

  const handleSignIn = () => {
    // Navigation vers l'écran de connexion
    navigation.navigate('Login');
    console.log('Se connecter pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <View style={styles.content}>
          {/* Logo Section */}
          <View style={styles.logoSection}>
            {!imageError ? (
              <Image
                source={require('../../assets/images/degra_court.png')}
                style={styles.logo}
                resizeMode="contain"
                onError={() => setImageError(true)}
              />
            ) : (
              // Fallback en cas d'erreur
              <Text style={styles.logoText}>
                <Text style={styles.logoA}>a</Text>
                <Text style={styles.logoW}>w</Text>
                <Text style={styles.logoT}>t</Text>
                <Text style={styles.logoC}>c</Text>
              </Text>
            )}
          </View>

          {/* Buttons Section */}
        <View style={styles.buttonsSection}>
          {/* S'inscrire Button */}
          <TouchableOpacity 
            style={styles.signUpButton}
            onPress={handleSignUp}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#c2185b','#972eaf', '#6041c9']}
              style={styles.buttonGradient}
              start={{ x: 0, y: 1 }}
              end={{ x: 1.5, y: 0 }}
            >
              <Text style={styles.signUpButtonText}>S'INSCRIRE</Text>
            </LinearGradient>
          </TouchableOpacity>

            {/* Separator */}
            <View style={styles.separatorContainer}>
              <View style={styles.separatorLine} />
              <Text style={styles.separatorText}>ou</Text>
              <View style={styles.separatorLine} />
            </View>

            {/* Se connecter Button */}
          <TouchableOpacity 
            style={styles.signInButton}
            onPress={handleSignIn}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#c2185b','#972eaf', '#6041c9']}
              style={styles.buttonGradient}
              start={{ x: 0, y: 1 }}
              end={{ x: 1.5, y: 0 }}
            >
              <Text style={styles.signInButtonText}>SE CONNECTER</Text>
            </LinearGradient>
          </TouchableOpacity>
          </View>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    backgroundColor: '#FFFFFF',
  },
  logoSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: width * 0.6,
    height: height * 0.15,
    maxWidth: 250,
    maxHeight: 100,
  },
  logoText: {
    fontSize: 80,
    fontWeight: 'bold',
    letterSpacing: 3,
  },
  logoA: {
    color: '#ff6b47', // Orange
  },
  logoW: {
    color: '#e91e63', // Rose/Magenta
  },
  logoT: {
    color: '#9c27b0', // Violet
  },
  logoC: {
    color: '#673ab7', // Violet foncé
  },
  buttonsSection: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 80,
  },
  signUpButton: {
    borderRadius: 30,
    overflow: 'hidden',
    width: '80%',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: 'center',
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginBottom: 30,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#808080',
    opacity: 0.3,
  },
  separatorText: {
    color: '#808080',
    fontSize: 16,
    marginHorizontal: 20,
    fontWeight: '300',
  },
  signInButton: {
    borderRadius: 30,
    overflow: 'hidden',
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default AuthScreen;