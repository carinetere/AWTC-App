import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
  Switch,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  const settingsItems = [
    {
      icon: 'account-outline',
      label: 'Mon profil',
      hasArrow: true,
    },
    {
      icon: 'shield-check-outline',
      label: 'Sécurité',
      hasArrow: true,
    },
    {
      icon: 'web',
      label: 'Langues',
      hasArrow: true,
    },
    {
      icon: 'help-circle-outline',
      label: 'Aides',
      hasArrow: true,
    },
    {
      icon: 'bell-outline',
      label: 'Notifications',
      hasSwitch: true,
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#c72599" />
      
      {/* Header */}
      <LinearGradient
        colors={['#c72599', '#8b5cf6']}
        style={[styles.header, { paddingTop: insets.top }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons name="arrow-left" size={wp('6%')} color="#fff" />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Parametres</Text>
          <View style={styles.headerRight} />
        </View>
      </LinearGradient>

      {/* Content */}
      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: hp('12%') }]}
      >
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={require('../../assets/images/profile.png')} // Ajustez le chemin selon votre structure
              style={styles.profileImage}
            />
          </View>
          <Text style={styles.userName}>Nom d'utilisateur</Text>
          <Text style={styles.userType}>Entreprise</Text>
        </View>

        {/* Settings Section */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Mes paramètres</Text>
          
          <View style={styles.settingsContainer}>
            {settingsItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.settingItem}
                activeOpacity={0.7}
              >
                <View style={styles.settingLeft}>
                  <MaterialCommunityIcons 
                    name={item.icon} 
                    size={wp('5.5%')} 
                    color="#666" 
                  />
                  <Text style={styles.settingLabel}>{item.label}</Text>
                </View>
                
                <View style={styles.settingRight}>
                  {item.hasArrow && (
                    <MaterialCommunityIcons 
                      name="chevron-right" 
                      size={wp('5%')} 
                      color="#999" 
                    />
                  )}
                  {item.hasSwitch && (
                    <Switch
                      value={notificationsEnabled}
                      onValueChange={setNotificationsEnabled}
                      trackColor={{ false: '#ccc', true: '#c72599' }}
                      thumbColor={notificationsEnabled ? '#fff' : '#f4f3f4'}
                      ios_backgroundColor="#ccc"
                    />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <LinearGradient
          colors={['#c72599', '#8b5cf6']}
          style={[styles.bottomNavGradient, { paddingBottom: insets.bottom || hp('1%') }]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <TouchableOpacity 
            style={styles.bottomNavItem}
            onPress={() => navigation.navigate('Home')}
          >
            <MaterialCommunityIcons name="home" size={wp('6%')} color="rgba(255,255,255,0.7)" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.bottomNavItem}
            onPress={() => navigation.navigate('Notifications')}
          >
            <MaterialCommunityIcons name="message-text" size={wp('6%')} color="rgba(255,255,255,0.7)" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.bottomNavItem}>
            <MaterialCommunityIcons name="cog" size={wp('6%')} color="#fff" />
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  
  // Header
  header: {
    paddingBottom: hp('2%'),
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('4%'),
    paddingTop: hp('2%'),
  },
  backButton: {
    padding: wp('2%'),
  },
  headerTitle: {
    color: '#fff',
    fontSize: wp('5%'),
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  headerRight: {
    width: wp('8%'),
  },
  
  // Content
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: hp('2%'),
  },
  
  // Profile Section
  profileSection: {
    alignItems: 'center',
    paddingVertical: hp('3%'),
    backgroundColor: '#fff',
    marginBottom: hp('2%'),
  },
  profileImageContainer: {
    width: wp('20%'),
    height: wp('20%'),
    borderRadius: wp('10%'),
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('2%'),
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: wp('10%'),
  },
  userName: {
    fontSize: wp('4.5%'),
    fontWeight: '600',
    color: '#fff',
    marginBottom: hp('0.5%'),
  },
  userType: {
    fontSize: wp('3.5%'),
    color: '#999',
  },
  
  // Settings Section
  settingsSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: wp('4.5%'),
    fontWeight: '600',
    color: '#333',
    marginBottom: hp('2%'),
    marginHorizontal: wp('4%'),
  },
  settingsContainer: {
    backgroundColor: '#8b5cf6',
    marginHorizontal: wp('4%'),
    borderRadius: wp('4%'),
    paddingVertical: hp('2%'),
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('2%'),
    backgroundColor: '#fff',
    marginHorizontal: wp('2%'),
    marginVertical: hp('0.5%'),
    borderRadius: wp('3%'),
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingLabel: {
    fontSize: wp('4%'),
    color: '#333',
    marginLeft: wp('3%'),
    fontWeight: '500',
  },
  settingRight: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Bottom Navigation
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomNavGradient: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: hp('2%'),
  },
  bottomNavItem: {
    alignItems: 'center',
    flex: 1,
  },
});

// AJOUT DE L'EXPORT PAR DÉFAUT
export default SettingsScreen;