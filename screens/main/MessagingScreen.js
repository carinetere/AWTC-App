import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MessagingScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messageText, setMessageText] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'Marie-Aude Adala',
      lastMessage: 'Bonjour, Enchantée de vous rencontrer',
      time: '12:30',
      avatar: require('../../assets/images/profile.png'),
      hasNotification: true,
      status: 'online'
    },
    {
      id: 2,
      name: 'Stephanie Lore',
      lastMessage: '👍',
      time: '11:05',
      avatar: require('../../assets/images/profile.png'),
      hasNotification: true,
      status: 'online'
    },
    {
      id: 3,
      name: 'Touré Elodie',
      lastMessage: 'Je vous en prie.',
      time: '09:02',
      avatar: require('../../assets/images/profile.png'),
      hasNotification: false,
      status: 'offline'
    },
    {
      id: 4,
      name: 'Amstrong Sharon',
      lastMessage: 'Oui, demain',
      time: 'Hier',
      avatar: require('../../assets/images/profile.png'),
      hasNotification: false,
      status: 'offline'
    },
    {
      id: 5,
      name: 'Finn Rose',
      lastMessage: "D'accord côté bien noté.",
      time: 'Vendredi',
      avatar: require('../../assets/images/profile.png'),
      hasNotification: true,
      status: 'away'
    }
  ];

  const messages = {
    1: [
      {
        id: 1,
        text: 'Bonjour, Enchantée de vous rencontrer',
        time: '12:30',
        sender: 'other'
      },
      {
        id: 2,
        text: 'Bonjour, Enchantée également',
        time: '12:40',
        sender: 'me'
      }
    ]
  };

  const renderConversationsList = () => {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#c72599" />
        
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
            
            <Text style={styles.headerTitle}>Messages</Text>
            <View style={styles.headerRight} />
          </View>
        </LinearGradient>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Discussions</Text>
          
          <View style={styles.searchContainer}>
            <MaterialCommunityIcons name="magnify" size={wp('5%')} color="#999" />
            <TextInput
              style={styles.searchInput}
              placeholder="Recherche"
              placeholderTextColor="#999"
            />
          </View>

          <ScrollView 
            style={styles.conversationsList}
            showsVerticalScrollIndicator={false}
          >
            {conversations.map((conversation) => (
              <TouchableOpacity
                key={conversation.id}
                style={styles.conversationItem}
                onPress={() => setSelectedConversation(conversation)}
                activeOpacity={0.7}
              >
                <View style={styles.avatarContainer}>
                  <Text style={styles.avatar}>{conversation.avatar}</Text>
                  {conversation.status === 'online' && (
                    <View style={[styles.statusDot, styles.onlineStatus]} />
                  )}
                </View>
                
                <View style={styles.conversationContent}>
                  <View style={styles.conversationHeader}>
                    <Text style={styles.conversationName}>{conversation.name}</Text>
                    <Text style={styles.conversationTime}>{conversation.time}</Text>
                  </View>
                  <Text style={styles.lastMessage} numberOfLines={1}>
                    {conversation.lastMessage}
                  </Text>
                </View>
                
                {conversation.hasNotification && (
                  <View style={styles.notificationDot} />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

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

            <TouchableOpacity style={styles.bottomNavItem}>
              <MaterialCommunityIcons name="message-text" size={wp('6%')} color="#fff" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.bottomNavItem}
              onPress={() => navigation.navigate('Settings')}
            >
              <MaterialCommunityIcons name="cog" size={wp('6%')} color="rgba(255,255,255,0.7)" />
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <TouchableOpacity style={styles.fab}>
          <LinearGradient
            colors={['#c72599', '#8b5cf6']}
            style={styles.fabGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <MaterialCommunityIcons name="plus" size={wp('6%')} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  };

  const renderConversationDetail = () => {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#c72599" />
        
        <LinearGradient
          colors={['#c72599', '#8b5cf6']}
          style={[styles.header, { paddingTop: insets.top }]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <View style={styles.headerContent}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => setSelectedConversation(null)}
            >
              <MaterialCommunityIcons name="arrow-left" size={wp('6%')} color="#fff" />
            </TouchableOpacity>
            
            <View style={styles.conversationDetailHeader}>
              <Text style={styles.conversationAvatar}>{selectedConversation.avatar}</Text>
              <Text style={styles.headerTitle}>{selectedConversation.name}</Text>
            </View>
            
            <TouchableOpacity style={styles.infoButton}>
              <MaterialCommunityIcons name="information-outline" size={wp('6%')} color="#fff" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <ScrollView style={styles.messagesContainer}>
          <View style={styles.messagesContent}>
            {messages[selectedConversation.id] && messages[selectedConversation.id].map((message) => (
              <View
                key={message.id}
                style={[
                  styles.messageContainer,
                  message.sender === 'me' ? styles.myMessage : styles.otherMessage
                ]}
              >
                <View
                  style={[
                    styles.messageBubble,
                    message.sender === 'me' ? styles.myMessageBubble : styles.otherMessageBubble
                  ]}
                >
                  <Text
                    style={[
                      styles.messageText,
                      message.sender === 'me' ? styles.myMessageText : styles.otherMessageText
                    ]}
                  >
                    {message.text}
                  </Text>
                </View>
                <Text style={styles.messageTime}>{message.time}</Text>
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={[styles.messageInputContainer, { paddingBottom: insets.bottom || hp('1%') }]}>
          <TouchableOpacity style={styles.attachButton}>
            <MaterialCommunityIcons name="paperclip" size={wp('5%')} color="#999" />
          </TouchableOpacity>
          
          <TextInput
            style={styles.messageInput}
            placeholder="Écrivez un message"
            placeholderTextColor="#999"
            value={messageText}
            onChangeText={setMessageText}
            multiline
          />
          
          <TouchableOpacity style={styles.sendButton}>
            <MaterialCommunityIcons name="send" size={wp('5%')} color="#c72599" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return selectedConversation ? renderConversationDetail() : renderConversationsList();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  
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
  conversationDetailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  conversationAvatar: {
    fontSize: wp('8%'),
    marginRight: wp('2%'),
  },
  infoButton: {
    padding: wp('2%'),
  },
  
  content: {
    flex: 1,
    paddingTop: hp('2%'),
  },
  sectionTitle: {
    fontSize: wp('5%'),
    fontWeight: '600',
    color: '#333',
    marginBottom: hp('2%'),
    marginHorizontal: wp('4%'),
  },
  
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: wp('4%'),
    marginBottom: hp('2%'),
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.5%'),
    borderRadius: wp('6%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: wp('2%'),
    fontSize: wp('4%'),
    color: '#333',
  },
  
  conversationsList: {
    flex: 1,
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('2%'),
    backgroundColor: '#fff',
    marginHorizontal: wp('4%'),
    marginBottom: hp('1%'),
    borderRadius: wp('3%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: wp('3%'),
  },
  avatar: {
    fontSize: wp('10%'),
  },
  statusDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: wp('3%'),
    height: wp('3%'),
    borderRadius: wp('1.5%'),
    borderWidth: 2,
    borderColor: '#fff',
  },
  onlineStatus: {
    backgroundColor: '#4CAF50',
  },
  conversationContent: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  conversationName: {
    fontSize: wp('4.2%'),
    fontWeight: '600',
    color: '#333',
  },
  conversationTime: {
    fontSize: wp('3.2%'),
    color: '#999',
  },
  lastMessage: {
    fontSize: wp('3.5%'),
    color: '#666',
    marginTop: hp('0.5%'),
  },
  notificationDot: {
    width: wp('2.5%'),
    height: wp('2.5%'),
    borderRadius: wp('1.25%'),
    backgroundColor: '#c72599',
    marginLeft: wp('2%'),
  },
  
  messagesContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  messagesContent: {
    padding: wp('4%'),
    paddingBottom: hp('10%'),
  },
  messageContainer: {
    marginBottom: hp('2%'),
  },
  myMessage: {
    alignItems: 'flex-end',
  },
  otherMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.5%'),
    borderRadius: wp('4%'),
  },
  myMessageBubble: {
    backgroundColor: '#c72599',
    borderBottomRightRadius: wp('1%'),
  },
  otherMessageBubble: {
    backgroundColor: '#e1bee7',
    borderBottomLeftRadius: wp('1%'),
  },
  messageText: {
    fontSize: wp('4%'),
  },
  myMessageText: {
    color: '#fff',
  },
  otherMessageText: {
    color: '#333',
  },
  messageTime: {
    fontSize: wp('3%'),
    color: '#999',
    marginTop: hp('0.5%'),
  },
  
  messageInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('2%'),
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  attachButton: {
    padding: wp('2%'),
    marginRight: wp('2%'),
  },
  messageInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: wp('6%'),
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.5%'),
    fontSize: wp('4%'),
    maxHeight: hp('12%'),
  },
  sendButton: {
    padding: wp('2%'),
    marginLeft: wp('2%'),
  },
  
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
  
  fab: {
    position: 'absolute',
    bottom: hp('12%'),
    right: wp('6%'),
    width: wp('14%'),
    height: wp('14%'),
    borderRadius: wp('7%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  fabGradient: {
    width: '100%',
    height: '100%',
    borderRadius: wp('7%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MessagingScreen;