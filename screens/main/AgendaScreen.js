import React, { useState } from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const AgendaScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(27);
  const insets = useSafeAreaInsets();

  const dates = [
    { number: 27, label: 'Sep' },
    { number: 28, label: 'Sep' },
    { number: 29, label: 'Sep' },
  ];

  const events = [
    {
      id: 1,
      time: '10:00',
      duration: '1h30',
      status: 'En cours',
      title: 'Panel sur l\'intelligence Artificielle',
      room: 'Salle 10',
    },
    {
      id: 2,
      time: '11:30',
      duration: '1h30',
      status: 'A venir',
      title: 'Panel Technologies émergentes',
      room: 'Salle 12',
    },
    {
      id: 3,
      time: '12:30',
      duration: '1h30',
      status: 'A venir',
      title: 'Panel Women In Tech',
      room: 'Salle 8',
    },
    {
      id: 4,
      time: '13:00',
      duration: '1h30',
      status: 'A venir',
      title: 'Brunch de fin',
      room: 'Salle 10',
    },
  ];

  const renderDateSelector = () => (
    <View style={styles.dateSelector}>
      {dates.map((date, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.dateButton,
            selectedDate === date.number && styles.selectedDateButton,
          ]}
          onPress={() => setSelectedDate(date.number)}
        >
          <Text
            style={[
              styles.dateNumber,
              selectedDate === date.number && styles.selectedDateNumber,
            ]}
          >
            {date.number}
          </Text>
          <Text
            style={[
              styles.dateLabel,
              selectedDate === date.number && styles.selectedDateLabel,
            ]}
          >
            {date.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderEvent = (event) => (
    <View key={event.id} style={styles.eventCard}>
      <View style={styles.eventContent}>
        <View style={styles.timeContainer}>
          <Text style={styles.eventTime}>{event.time}</Text>
          <Text style={styles.eventDuration}>{event.duration}</Text>
          <Text style={styles.eventStatus}>{event.status}</Text>
        </View>
        
        <View style={styles.eventDetails}>
          <Text style={styles.eventTitle}>{event.title}</Text>
          <Text style={styles.eventRoom}>{event.room}</Text>
        </View>
        
        <TouchableOpacity style={styles.addButton}>
          <LinearGradient
            colors={['#c72599', '#972eaf']}
            style={styles.addButtonGradient}
          >
            <Ionicons name="add" size={20} color="white" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#c72599" />
      
      {/* Header */}
      <LinearGradient
        colors={['#c72599', '#6041c9']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity 
            onPress={() => navigation?.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Agenda</Text>
          
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Date Selector */}
      {renderDateSelector()}

      {/* Events List */}
      <ScrollView 
        style={styles.eventsContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.eventsContent, { paddingBottom: hp('12%') }]}
      >
        {events.map(renderEvent)}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <LinearGradient
          colors={['#c72599', '#8b5cf6']}
          style={[styles.bottomNavGradient, { paddingBottom: insets.bottom || hp('1%') }]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <TouchableOpacity style={styles.bottomNavItem}>
            <MaterialCommunityIcons name="home" size={wp('6%')} color="#fff" />
            <Text style={styles.bottomNavTextInactive}>Accueil</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bottomNavItem}>
            <MaterialCommunityIcons name="bell-outline" size={wp('6%')} color="#fff" />
            <Text style={styles.bottomNavTextInactive}>Notifications</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.bottomNavItem, styles.bottomNavItemInactive]}>
            <MaterialCommunityIcons name="message-text" size={wp('6%')} color="rgba(255,255,255,0.7)" />
            <Text style={styles.bottomNavTextInactive}>Messages</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.bottomNavItem, styles.bottomNavItemInactive]}>
            <MaterialCommunityIcons name="cog" size={wp('6%')} color="rgba(255,255,255,0.7)" />
            <Text style={styles.bottomNavTextInactive}>Paramètres</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingTop: StatusBar.currentHeight || 0,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  filterButton: {
    padding: 4,
  },
  dateSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    gap: 20,
  },
  dateButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.22,
    height: 60,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedDateButton: {
    backgroundColor: '#c72599',
    borderColor: '#c72599',
  },
  dateNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedDateNumber: {
    color: 'white',
  },
  dateLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  selectedDateLabel: {
    color: 'white',
  },
  eventsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  eventsContent: {
    paddingBottom: 20,
  },
  eventCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#c72599',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventContent: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  timeContainer: {
    alignItems: 'flex-start',
    marginRight: 15,
    minWidth: 60,
  },
  eventTime: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  eventDuration: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  eventStatus: {
    fontSize: 10,
    color: '#c72599',
    marginTop: 4,
    fontWeight: '500',
  },
  eventDetails: {
    flex: 1,
    marginLeft: 10,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  eventRoom: {
    fontSize: 12,
    color: '#666',
  },
  addButton: {
    marginLeft: 10,
  },
  addButtonGradient: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Navigation du bas
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

export default AgendaScreen;