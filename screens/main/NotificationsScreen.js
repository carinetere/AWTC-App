import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const NotificationsScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const notifications = [
    {
      id: 1,
      title: "L'activité Panel sur l'Intelligence Artificielle a débuté",
      time: "Il y a 3 minutes",
      isNew: true,
    },
    {
      id: 2,
      title: "Marie-Agnès a demandé à vous ajouter dans son réseau",
      time: "Il y a 8 minutes",
      isNew: true,
    },
    {
      id: 3,
      title: "Jean Koffi a liker votre publication",
      time: "Il y a 1 heure",
      isNew: true,
    },
    {
      id: 4,
      title: "L'activité Brunch de fin débute dans 30 minutes.",
      time: "Il y a 2 heures",
      isNew: true,
    },
  ];

  const NotificationItem = ({ notification }) => (
    <View style={styles.notificationItem}>
      <View style={styles.notificationContent}>
        <View style={styles.notificationDot} />
        <View style={styles.notificationTextContainer}>
          <Text style={styles.notificationTitle}>{notification.title}</Text>
          <Text style={styles.notificationTime}>{notification.time}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.menuButton}>
        <MaterialCommunityIcons name="dots-horizontal" size={wp('5%')} color="#666" />
      </TouchableOpacity>
    </View>
  );

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
          
          <Text style={styles.headerTitle}>Notifications</Text>
          
          <TouchableOpacity style={styles.filterButton}>
            <MaterialCommunityIcons name="tune" size={wp('5%')} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Notifications List */}
      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: hp('12%') }]}
      >
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
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
            style={[styles.bottomNavItem, styles.bottomNavItemInactive]}
            onPress={() => navigation.navigate('Home')}
          >
            <MaterialCommunityIcons name="home" size={wp('6%')} color="rgba(255,255,255,0.7)" />
            <Text style={styles.bottomNavTextInactive}>Accueil</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bottomNavItem}>
            <MaterialCommunityIcons name="bell-outline" size={wp('6%')} color="#fff" />
            <Text style={styles.bottomNavText}>Notifications</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.bottomNavItem, styles.bottomNavItemInactive]}
            onPress={() => navigation.navigate('Messages')}
          >
            <MaterialCommunityIcons name="message-text" size={wp('6%')} color="rgba(255,255,255,0.7)" />
            <Text style={styles.bottomNavTextInactive}>Messages</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.bottomNavItem, styles.bottomNavItemInactive]}
            onPress={() => navigation.navigate('Settings')}
          >
            <MaterialCommunityIcons name="cog" size={wp('6%')} color="rgba(255,255,255,0.7)" />
            <Text style={styles.bottomNavTextInactive}>Paramètres</Text>
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
    marginRight: wp('8%'),
  },
  filterButton: {
    padding: wp('2%'),
  },
  
  // Notifications
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: hp('1%'),
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('4%'),
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  notificationContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  notificationDot: {
    width: wp('2.5%'),
    height: wp('2.5%'),
    borderRadius: wp('1.25%'),
    backgroundColor: '#c72599',
    marginTop: hp('0.5%'),
    marginRight: wp('3%'),
  },
  notificationTextContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: wp('3.8%'),
    color: '#333',
    fontWeight: '500',
    lineHeight: wp('5%'),
    marginBottom: hp('0.5%'),
  },
  notificationTime: {
    fontSize: wp('3%'),
    color: '#999',
    fontWeight: '400',
  },
  menuButton: {
    padding: wp('2%'),
    marginLeft: wp('2%'),
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
    paddingVertical: hp('1.5%'),
    paddingTop: hp('2%'),
  },
  bottomNavItem: {
    alignItems: 'center',
    flex: 1,
  },
  bottomNavItemInactive: {
    opacity: 0.7,
  },
  bottomNavText: {
    color: '#fff',
    fontSize: wp('2.8%'),
    fontWeight: '600',
    marginTop: hp('0.5%'),
  },
  bottomNavTextInactive: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: wp('2.8%'),
    fontWeight: '600',
    marginTop: hp('0.5%'),
  },
});

export default NotificationsScreen;