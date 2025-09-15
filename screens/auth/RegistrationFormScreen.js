import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { register } from '../../services/authService';

const { width, height } = Dimensions.get('window');

const RegistrationFormScreen = ({ navigation, route }) => {
  // Correction: Vérifier si route.params existe et contient les données nécessaires
  const email = route?.params?.email || '';
  const password = route?.params?.password || '';

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nomEntreprise, setNomEntreprise] = useState('');
  const [telephone, setTelephone] = useState('');
  // Ajout d'états pour email et password si ils ne viennent pas des params
  const [localEmail, setLocalEmail] = useState(email);
  const [localPassword, setLocalPassword] = useState(password);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    // Utiliser les valeurs locales ou celles des params
    const emailToUse = localEmail || email;
    const passwordToUse = localPassword || password;

    // Client-side validation
    if (!emailToUse || !passwordToUse || !firstName || !lastName) {
      Alert.alert('Erreur', 'Des informations requises sont manquantes.');
      return;
    }
    
    console.log('Tentative d\'inscription avec:', {
      email: emailToUse,
      firstName,
      lastName,
      nomEntreprise,
      telephone
    });
    
    setIsLoading(true);

    try {
      // Data to send to the Django API.
      const userData = {
        first_name: firstName,
        last_name: lastName,
        email: emailToUse,
        password: passwordToUse,
        telephone: telephone,
        nom_entreprise: nomEntreprise,
      };

      console.log('Données envoyées:', userData);

      const response = await register(userData);
      
      console.log('Inscription réussie !', response.data);
      Alert.alert(
        'Succès', 
        'Votre inscription a été effectuée avec succès !',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login')
          }
        ]
      );
      
    } catch (error) {
      console.error('Erreur complète lors de l\'inscription:', error);

      let errorMessage = 'Une erreur est survenue lors de l\'inscription.';
      
      // Gestion des erreurs réseau
      if (error.code === 'NETWORK_ERROR' || error.message === 'Network Error') {
        errorMessage = 'Erreur de réseau. Vérifiez votre connexion internet.';
      } else if (error.response?.data) {
        console.log('Error data:', error.response.data);
        
        if (error.response.data.detail) {
          errorMessage = error.response.data.detail;
        } else if (error.response.data.email) {
          errorMessage = 'Erreur email : ' + (Array.isArray(error.response.data.email) ? error.response.data.email[0] : error.response.data.email);
        } else if (error.response.data.username) {
          errorMessage = 'Nom d\'utilisateur : ' + (Array.isArray(error.response.data.username) ? error.response.data.username[0] : error.response.data.username);
        } else if (error.response.data.password) {
          errorMessage = 'Erreur mot de passe : ' + (Array.isArray(error.response.data.password) ? error.response.data.password[0] : error.response.data.password);
        } else {
          const firstErrorKey = Object.keys(error.response.data)[0];
          if (firstErrorKey) {
            const errorValue = error.response.data[firstErrorKey];
            errorMessage = `${firstErrorKey}: ${Array.isArray(errorValue) ? errorValue[0] : errorValue}`;
          }
        }
      } else if (error.message) {
        errorMessage = error.message;
      }

      Alert.alert('Erreur d\'inscription', errorMessage);
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.background}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.logoContainer}>
              <Image
                source={require('../../assets/images/degra_court.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            <View style={styles.formContainer}>
              {/* Email Input - Si pas dans les params */}
              {!email && (
                <View style={styles.inputContainer}>
                  <Ionicons name="mail-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    placeholderTextColor="#9CA3AF"
                    value={localEmail}
                    onChangeText={setLocalEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              )}

              {/* Password Input - Si pas dans les params */}
              {!password && (
                <View style={styles.inputContainer}>
                  <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Mot de passe"
                    placeholderTextColor="#9CA3AF"
                    value={localPassword}
                    onChangeText={setLocalPassword}
                    secureTextEntry
                  />
                </View>
              )}

              {/* Prénoms Input */}
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Prénoms"
                  placeholderTextColor="#9CA3AF"
                  value={firstName}
                  onChangeText={setFirstName}
                  autoCapitalize="words"
                />
              </View>

              {/* Nom Input */}
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Nom"
                  placeholderTextColor="#9CA3AF"
                  value={lastName}
                  onChangeText={setLastName}
                  autoCapitalize="words"
                />
              </View>

              {/* Nom de l'entreprise Input */}
              <View style={styles.inputContainer}>
                <Ionicons name="business-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Nom de l'entreprise"
                  placeholderTextColor="#9CA3AF"
                  value={nomEntreprise}
                  onChangeText={setNomEntreprise}
                  autoCapitalize="words"
                />
              </View>

              {/* Numéro de téléphone Input */}
              <View style={styles.inputContainer}>
                <Ionicons name="call-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Numéro de téléphone"
                  placeholderTextColor="#9CA3AF"
                  value={telephone}
                  onChangeText={setTelephone}
                  keyboardType="phone-pad"
                />
              </View>

              <LinearGradient
                colors={['#c72599', '#972eaf', '#6041c9']}
                start={{ x: 0.5, y: 1 }}
                end={{ x: 0, y: 1 }}
                style={styles.registerButton}
              >
                <TouchableOpacity
                  style={styles.registerButtonInner}
                  onPress={handleRegister}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <Text style={styles.registerButtonText}>S'INSCRIRE</Text>
                  )}
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
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
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: height * 0.08,
    marginBottom: height * 0.01,
  },
  logo: {
    width: width * 0.7,
    height: 100,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 25,
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputIcon: {
    marginRight: 15,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
  },
  registerButton: {
    borderRadius: 25,
    marginTop: 40,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  registerButtonInner: {
    paddingVertical: 20,
    alignItems: 'center',
    borderRadius: 25,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default RegistrationFormScreen;