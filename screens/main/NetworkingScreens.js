import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const NetworkingScreens = () => {
  const [currentScreen, setCurrentScreen] = useState('list');
  const [selectedProfile, setSelectedProfile] = useState(null);

  // Mock data for profiles
  const profiles = [
    {
      id: 1,
      name: 'Amstrong Sharon',
      title: 'Entrepreneur',
      role: 'CEO MeltaAuto',
      image: require('../../assets/images/img4.png'),
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed porta, ultrices in porttitor ut, accumsan non quam. Nam consectetur porttitor rhoncus.'
    },
    {
      id: 2,
      name: 'Toure Elodie',
      title: 'Expertise - Finance',
      image: require('../../assets/images/img1.png'),
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed porta, ultrices in porttitor ut, accumsan non quam. Nam consectetur porttitor rhoncus.'
    },
    {
      id: 3,
      name: 'Marie-Aude Adala',
      title: '',
      image: require('../../assets/images/img2.png'),
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed porta, ultrices in porttitor ut, accumsan non quam. Nam consectetur porttitor rhoncus.'
    },
    {
      id: 4,
      name: 'Stephanie Lore',
      title: '',
      image: require('../../assets/images/img3.png'),
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed porta, ultrices in porttitor ut, accumsan non quam. Nam consectetur porttitor rhoncus.'
    },
    {
      id: 5,
      name: 'Bamba Miriam',
      title: '',
      image: require('../../assets/images/img5.png'),
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed porta, ultrices in porttitor ut, accumsan non quam. Nam consectetur porttitor rhoncus.'
    },
    {
      id: 6,
      name: 'Finn Rose',
      title: '',
      image: require('../../assets/images/img6.png'),
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed porta, ultrices in porttitor ut, accumsan non quam. Nam consectetur porttitor rhoncus.'
    }
  ];

  const handleProfilePress = (profile) => {
    setSelectedProfile(profile);
    setCurrentScreen('detail');
  };

  const handleBackPress = () => {
    setCurrentScreen('list');
    setSelectedProfile(null);
  };

  const ProfileCard = ({ profile, onPress }) => (
    <TouchableOpacity style={styles.profileCard} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={profile.image} style={styles.profileImage} />
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={16} color="white" />
        </TouchableOpacity>
      </View>
      <Text style={styles.profileName}>{profile.name}</Text>
      <Text style={styles.profileTitle}>{profile.title}</Text>
    </TouchableOpacity>
  );

  const NetworkingList = () => (
    <View style={styles.container}>
      <LinearGradient
        colors={['#E91E63', '#9C27B0', '#673AB7']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <SafeAreaView style={styles.headerContent}>
          <TouchableOpacity>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Networking</Text>
          <View style={{ width: 24 }} />
        </SafeAreaView>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.sortContainer}>
          <Text style={styles.sortText}>Trier par</Text>
          <Ionicons name="chevron-down" size={16} color="#666" />
        </View>

        <ScrollView style={styles.profilesContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.profilesGrid}>
            {profiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onPress={() => handleProfilePress(profile)}
              />
            ))}
          </View>
        </ScrollView>
      </View>

      <LinearGradient
        colors={['#E91E63', '#9C27B0', '#673AB7']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.bottomNav}
      >
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="chatbubble-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="settings-outline" size={24} color="white" />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );

  const ProfileDetail = () => (
    <View style={styles.container}>
      <LinearGradient
        colors={['#E91E63', '#9C27B0', '#673AB7']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <SafeAreaView style={styles.headerContent}>
          <TouchableOpacity onPress={handleBackPress}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Networking</Text>
          <TouchableOpacity>
            <Ionicons name="ellipsis-horizontal" size={24} color="white" />
          </TouchableOpacity>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView style={styles.detailContent} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <View style={styles.profileImageLarge}>
            <Image source={selectedProfile?.image} style={styles.profileImageLargeImg} />
          </View>
          <Text style={styles.profileNameLarge}>{selectedProfile?.name}</Text>
          <Text style={styles.profileRoleLarge}>{selectedProfile?.role}</Text>
          <Text style={styles.profileDescription}>{selectedProfile?.description}</Text>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followButtonText}>Ajouter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton}>
              <Text style={styles.shareButtonText}>Partager</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.actualitesSection}>
          <Text style={styles.actualitesTitle}>Actualités</Text>
          <Text style={styles.publicationsSubtitle}>Publications</Text>

          <View style={styles.postContainer}>
            <View style={styles.postHeader}>
              <Image source={selectedProfile?.image} style={styles.postAvatar} />
              <View style={styles.postInfo}>
                <Text style={styles.postAuthor}>{selectedProfile?.name}</Text>
                <Text style={styles.postDescription}>Lorem ipsum dolor sit amet consectetur adipiscing elit...</Text>
              </View>
            </View>
            <Image source={require('../../assets/images/caroussel2.jpg')} style={styles.postImage} />
          </View>

          <View style={styles.postContainer}>
            <View style={styles.postHeader}>
              <Image source={selectedProfile?.image} style={styles.postAvatar} />
              <View style={styles.postInfo}>
                <Text style={styles.postAuthor}>{selectedProfile?.name}</Text>
                <Text style={styles.postDescription}>Lorem ipsum dolor sit amet consectetur adipiscing elit...</Text>
              </View>
            </View>
            <LinearGradient
              colors={['#E91E63', '#9C27B0']}
              style={styles.postImageGradient}
            >
              <Text style={styles.postGradientText}>BIENVENUE{'\n'}CHEZ{'\n'}DUBAICOIN</Text>
            </LinearGradient>
          </View>
        </View>
      </ScrollView>

      <LinearGradient
        colors={['#E91E63', '#9C27B0', '#673AB7']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.bottomNav}
      >
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="chatbubble-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="settings-outline" size={24} color="white" />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );

  return currentScreen === 'list' ? <NetworkingList /> : <ProfileDetail />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingVertical: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sortText: {
    color: '#666',
    marginRight: 4,
    fontSize: 14,
  },
  profilesContainer: {
    flex: 1,
  },
  profilesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
  },
  profileCard: {
    width: '50%',
    padding: 8,
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e0e0e0',
  },
  addButton: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E91E63',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  profileName: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 2,
  },
  profileTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingBottom: 20,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  detailContent: {
    flex: 1,
    backgroundColor: 'white',
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  profileImageLarge: {
    marginBottom: 16,
  },
  profileImageLargeImg: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e0e0e0',
  },
  profileNameLarge: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
  profileRoleLarge: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  profileDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  followButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#E91E63',
  },
  followButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  shareButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E91E63',
  },
  shareButtonText: {
    color: '#E91E63',
    fontWeight: '600',
  },
  actualitesSection: {
    padding: 16,
  },
  actualitesTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  publicationsSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  postContainer: {
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
  },
  postHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#e0e0e0',
  },
  postInfo: {
    flex: 1,
  },
  postAuthor: {
    fontWeight: '600',
    marginBottom: 2,
  },
  postDescription: {
    color: '#666',
    fontSize: 12,
  },
  postImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
  },
  postImageGradient: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postGradientText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default NetworkingScreens;