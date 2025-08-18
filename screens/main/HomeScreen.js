import React, { useRef, useState, useEffect } from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
  Modal,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SidebarMenu from './SidebarMenu'; // Importez votre composant SidebarMenu

const { width, height } = Dimensions.get('window');

// Données du carousel principal
const carouselData1 = [
  require('../../assets/images/caroussel1.jpg'),
  require('../../assets/images/caroussel2.jpg'),
];

// Données du carousel secondaire
const carouselData2 = [
  require('../../assets/images/caroussel1.jpg'),
  require('../../assets/images/caroussel2.jpg'),
];

const menuItems = [
  { icon: 'calendar-month', label: 'Agenda', route: 'Agenda' },
  { icon: 'map-marker-radius', label: 'Map', route: 'Map' },
  { icon: 'account-voice', label: 'Panelistes', route: 'Panelistes' },
  { icon: 'account-group', label: 'Networking', route: 'Networking' },
  { icon: 'file-document', label: 'Publications', route: 'Publication' },
  // { icon: 'lightbulb-on-outline', label: 'Quiz', route: 'Quiz' },
];

// Composant Carousel Principal
const MainCarousel = ({ data }) => {
  const [index, setIndex] = useState(0);
  const flatListRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (index + 1) % data.length;
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
      }
      setIndex(nextIndex);
    }, 4000);

    return () => clearInterval(interval);
  }, [index, data.length]);

  const renderMainCarouselItem = ({ item }) => (
    <Image source={item} style={styles.mainCarouselImage} />
  );

  return (
    <View style={styles.mainCarouselWrapper}>
      <FlatList
        ref={flatListRef}
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, i) => i.toString()}
        renderItem={renderMainCarouselItem}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(event.nativeEvent.contentOffset.x / (width - wp('8%')));
          setIndex(newIndex);
        }}
      />
      
      {/* Indicateurs */}
      <View style={styles.indicators}>
        {data.map((_, i) => (
          <View
            key={i}
            style={[
              styles.indicator,
              { backgroundColor: i === index ? '#fff' : 'rgba(255,255,255,0.5)' }
            ]}
          />
        ))}
      </View>
    </View>
  );
};

// Composant Carousel Secondaire
const SecondaryCarousel = ({ data }) => {
  const [index, setIndex] = useState(0);
  const flatListRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (index + 1) % data.length;
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
      }
      setIndex(nextIndex);
    }, 3500);

    return () => clearInterval(interval);
  }, [index, data.length]);

  const renderSecondaryCarouselItem = ({ item }) => (
    <Image source={item} style={styles.secondaryCarouselImage} />
  );

  return (
    <View style={styles.secondaryCarouselWrapper}>
      <FlatList
        ref={flatListRef}
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, i) => i.toString()}
        renderItem={renderSecondaryCarouselItem}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(event.nativeEvent.contentOffset.x / (width - wp('8%')));
          setIndex(newIndex);
        }}
      />
      
      {/* Indicateurs */}
      <View style={styles.secondaryIndicators}>
        {data.map((_, i) => (
          <View
            key={i}
            style={[
              styles.secondaryIndicator,
              { backgroundColor: i === index ? '#fff' : 'rgba(255,255,255,0.5)' }
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default function HomeScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-width)).current;

  const openSidebar = () => {
    setSidebarVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeSidebar = () => {
    Animated.timing(slideAnim, {
      toValue: -width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setSidebarVisible(false);
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <ScrollView 
        style={[styles.scrollContainer, { paddingTop: insets.top }]} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={require('../../assets/images/profile.png')}
              style={styles.avatar}
            />
          </View>
          
          <View style={styles.headerCenter}>
            <Image
              source={require('../../assets/images/degra_long.png')}
              style={styles.logo}
            />
          </View>
          
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.menuButton} onPress={openSidebar}>
              <Image
                source={require('../../assets/images/menu.png')}
                style={styles.menuIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Carousel Principal */}
        <MainCarousel data={carouselData1} />

        {/* Section "À ne pas manquer" */}
        <Text style={styles.sectionTitle}>À ne pas manquer aujourd'hui</Text>
        <SecondaryCarousel data={carouselData2} />

        {/* Menu */}
        <Text style={styles.sectionTitle}>Menu</Text>
        <View style={styles.menuContainer}>
          {menuItems.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={styles.menuItem}
              onPress={() => navigation.navigate(item.route)}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons name={item.icon} size={wp('8%')} color="#c72599" />
              <Text style={styles.menuLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Navigation du bas */}
      <View style={styles.bottomNav}>
        <LinearGradient
          colors={['#c72599', '#8b5cf6']}
          style={[styles.bottomNavGradient, { paddingBottom: insets.bottom || hp('1%') }]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <TouchableOpacity style={styles.bottomNavItem}>
            <MaterialCommunityIcons name="home" size={wp('6%')} color="#fff" />
            <Text style={styles.bottomNavText}>Accueil</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.bottomNavItem}
            onPress={() => navigation.navigate('Notifications')}
          >
            <MaterialCommunityIcons name="bell-outline" size={wp('6%')} color="rgba(255,255,255,0.7)" />
            <Text style={styles.bottomNavTextInactive}>Notifications</Text>
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

      {/* Sidebar Menu */}
      <Modal
        visible={sidebarVisible}
        transparent={true}
        animationType="none"
        onRequestClose={closeSidebar}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity 
            style={styles.overlay} 
            onPress={closeSidebar}
            activeOpacity={1}
          />
          <Animated.View
            style={[
              styles.sidebarContainer,
              {
                transform: [{ translateX: slideAnim }]
              }
            ]}
          >
            <SidebarMenu navigation={navigation} onClose={closeSidebar} />
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: hp('12%'),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.5%'),
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  headerLeft: {
    width: wp('10%'),
  },
  avatar: {
    width: wp('9%'),
    height: wp('9%'),
    borderRadius: wp('4.5%'),
  },
  logo: {
    height: hp('4%'),
    width: wp('50%'),
    resizeMode: 'contain',
  },
  menuIcon: {
    width: wp('6%'),
    height: wp('6%'),
    resizeMode: 'contain',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerRight: {
    width: wp('10%'),
    alignItems: 'flex-end',
  },
  menuButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Carousel Principal
  mainCarouselWrapper: {
    height: hp('22%'),
    marginHorizontal: wp('4%'),
    marginTop: hp('2%'),
    marginBottom: hp('2.5%'),
    borderRadius: wp('3%'),
    overflow: 'hidden',
  },
  mainCarouselImage: {
    width: width - wp('8%'),
    height: hp('22%'),
    borderRadius: wp('3%'),
    resizeMode: 'cover',
  },
  indicators: {
    position: 'absolute',
    bottom: hp('1.5%'),
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    width: wp('2%'),
    height: wp('2%'),
    borderRadius: wp('1%'),
    marginHorizontal: wp('1%'),
  },
  
  // Carousel Secondaire
  secondaryCarouselWrapper: {
    height: hp('16%'),
    marginHorizontal: wp('4%'),
    marginBottom: hp('2.5%'),
    borderRadius: wp('3%'),
    overflow: 'hidden',
  },
  secondaryCarouselImage: {
    width: width - wp('8%'),
    height: hp('16%'),
    borderRadius: wp('3%'),
    resizeMode: 'cover',
  },
  secondaryIndicators: {
    position: 'absolute',
    bottom: hp('1%'),
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryIndicator: {
    width: wp('1.5%'),
    height: wp('1.5%'),
    borderRadius: wp('0.75%'),
    marginHorizontal: wp('0.8%'),
  },
  
  // Sections
  sectionTitle: {
    fontSize: wp('4.5%'),
    fontWeight: '600',
    marginBottom: hp('1.5%'),
    marginHorizontal: wp('4%'),
    color: '#333',
  },
  
  // Menu
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: wp('4%'),
  },
  menuItem: {
    width: wp('28%'),
    aspectRatio: 1,
    marginBottom: hp('2%'),
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#c72599',
    borderRadius: wp('3%'),
    justifyContent: 'center',
    alignItems: 'center', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuLabel: {
    fontSize: wp('3%'),
    fontWeight: '600',
    textAlign: 'center',
    marginTop: hp('1%'),
    color: '#333',
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
  
  // Sidebar Modal
  modalContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sidebarContainer: {
    width: width,
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
  },
});