import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';

const SidebarMenu = ({ navigation, onClose }) => {
  const menuItems = [
    { icon: 'home', label: 'Accueil', route: 'Home' },
    { icon: 'calendar-month', label: 'Agenda', route: 'Agenda' },
    { icon: 'map-marker-radius', label: 'Map', route: 'Map' },
    { icon: 'account-voice', label: 'Panelistes', route: 'Panelistes' },
    { icon: 'account-group', label: 'Networking', route: 'Networking' },
    { icon: 'file-document', label: 'Publications', route: 'Publication' },
    { icon: 'cog', label: 'Paramètres', route: 'Settings' },
  ];

  const handleMenuPress = (route) => {
    onClose();
    navigation.navigate(route);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#c72599', '#8b5cf6']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <Image
              source={require('../../assets/images/profile.png')}
              style={styles.profileImage}
            />
            <Text style={styles.profileName}>Utilisateur</Text>
            <Text style={styles.profileEmail}>user@example.com</Text>
          </View>
          
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <MaterialCommunityIcons name="close" size={wp('6%')} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => handleMenuPress(item.route)}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons 
                name={item.icon} 
                size={wp('5%')} 
                color="#fff" 
              />
              <Text style={styles.menuText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.logoutButton}>
            <MaterialCommunityIcons name="logout" size={wp('5%')} color="#fff" />
            <Text style={styles.logoutText}>Déconnexion</Text>
            onPress={() => navigation.navigate('Login')}
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: wp('75%'),
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('2%'),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)',
  },
  profileSection: {
    alignItems: 'center',
    flex: 1,
  },
  profileImage: {
    width: wp('15%'),
    height: wp('15%'),
    borderRadius: wp('7.5%'),
    marginBottom: hp('1%'),
  },
  profileName: {
    color: '#fff',
    fontSize: wp('4%'),
    fontWeight: '600',
    marginBottom: hp('0.5%'),
  },
  profileEmail: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: wp('3%'),
  },
  closeButton: {
    padding: wp('2%'),
  },
  menuContainer: {
    flex: 1,
    paddingTop: hp('2%'),
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('4%'),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  menuText: {
    color: '#fff',
    fontSize: wp('4%'),
    marginLeft: wp('4%'),
    fontWeight: '500',
  },
  footer: {
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('2%'),
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('1.5%'),
  },
  logoutText: {
    color: '#fff',
    fontSize: wp('4%'),
    marginLeft: wp('4%'),
    fontWeight: '500',
  },
});

export default SidebarMenu;