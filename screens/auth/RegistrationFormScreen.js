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
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const RegistrationFormScreen = ({ navigation }) => {
  const [nom, setNom] = useState('');
  const [prenoms, setPrenoms] = useState('');
  const [nomEntreprise, setNomEntreprise] = useState('');
  const [numeroTelephone, setNumeroTelephone] = useState('');

  const handleRegister = () => {
    // Logique d'inscription finale
    navigation.navigate('Home')
    console.log('Register with:', { nom, prenoms, nomEntreprise, numeroTelephone });
    // Navigation vers la page suivante ou succès
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
            {/* Logo Section */}
            <View style={styles.logoContainer}>
              <Image
                source={require('../../assets/images/degra_court.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            {/* Form Section */}
            <View style={styles.formContainer}>
              {/* Nom Input */}
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Nom"
                  placeholderTextColor="#9CA3AF"
                  value={nom}
                  onChangeText={setNom}
                  autoCapitalize="words"
                />
              </View>

              {/* Prénoms Input */}
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Prénoms"
                  placeholderTextColor="#9CA3AF"
                  value={prenoms}
                  onChangeText={setPrenoms}
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
                  value={numeroTelephone}
                  onChangeText={setNumeroTelephone}
                  keyboardType="phone-pad"
                />
              </View>

              {/* Register Button */}
              <LinearGradient
                colors={['#c72599', '#972eaf', '#6041c9' ]}
                start={{ x: 0.5, y: 1 }}
                end={{ x: 0, y: 1 }}
                style={styles.registerButton}
              >
                <TouchableOpacity style={styles.registerButtonInner} onPress={handleRegister}>
                  <Text style={styles.registerButtonText}>S'INSCRIRE</Text>
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