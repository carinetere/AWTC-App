// PublicationPage.js

import React, { useState } from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ChevronLeft,
  Camera,
  Video,
  Image as ImageIcon,
  Heart,
  MessageCircle,
  Share,
  MoreHorizontal,
  X,
  Smile,
  Paperclip,
} from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const PublicationPage = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  
  const [showPostModal, setShowPostModal] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(205);
  const [commentCount, setCommentCount] = useState(12);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleCloseComments = () => {
    setShowComments(false);
  };

  const handleGoBack = () => {
    if (navigation && navigation.goBack) {
      navigation.goBack();
    }
  };

  const comments = [
    { id: 1, name: 'Alex Emmanuel', text: 'Félicitations', time: '2h' },
    { id: 2, name: 'Marie Edith Koua', text: 'Une belle vibe de fin de formation!', time: '1h' },
    { id: 3, name: 'Kouadio Briden', text: 'Inspirant !', time: '35min' },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={['#c72599', '#972eaf', '#6041c9']} style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={handleGoBack}>
            <ChevronLeft size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Publications</Text>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Input: Quoi de neuf ? */}
        <View style={styles.inputCard}>
          <TouchableOpacity style={styles.inputRow} onPress={() => setShowPostModal(true)}>
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>U</Text>
            </View>
            <Text style={styles.placeholderText}>Quoi de neuf ?</Text>
          </TouchableOpacity>
          <View style={styles.inputActions}>
            <TouchableOpacity>
              <Camera size={18} color="#8B5CF6" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Video size={18} color="#8B5CF6" />
            </TouchableOpacity>
            <TouchableOpacity>
              <ImageIcon size={18} color="#8B5CF6" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Filters */}
        <View style={styles.filters}>
          {['Actualité', 'Direct', 'Mon réseau'].map((label, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.filterBtn, i === 0 && styles.activeFilter]}
            >
              <Text style={[styles.filterText, i === 0 && styles.activeFilterText]}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Post */}
        <View style={styles.postCard}>
          <View style={styles.postHeader}>
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>U</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>Nom d'utilisateur</Text>
              <Text style={styles.role}>Entreprise</Text>
            </View>
            <TouchableOpacity>
              <MoreHorizontal size={20} color="#555" />
            </TouchableOpacity>
          </View>
          <Text style={styles.postText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quam felis, malesuada porttitor malesuada.
            {'\n'}#AWTC2025 #WomanInTech
          </Text>
          <View style={styles.postImagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>Image de publication</Text>
          </View>
          <View style={styles.postActions}>
            <TouchableOpacity onPress={handleLike} style={styles.actionBtn}>
              <Heart
                size={20}
                color={isLiked ? '#EF4444' : '#555'}
                fill={isLiked ? '#EF4444' : 'none'}
              />
              <Text style={styles.actionText}>{likeCount}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowComments(true)} style={styles.actionBtn}>
              <MessageCircle size={20} color="#555" />
              <Text style={styles.actionText}>{commentCount}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Share size={20} color="#555" />
              <Text style={styles.actionText}>Partager</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.likes}>Aimée par Kouadio Ama et {likeCount} autres</Text>
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

      {/* Post Modal */}
      <Modal visible={showPostModal} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setShowPostModal(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modalBox}>
                <View style={styles.modalHeader}>
                  <View style={styles.avatarPlaceholder}>
                    <Text style={styles.avatarText}>U</Text>
                  </View>
                  <Text style={styles.name}>Nom d'utilisateur</Text>
                  <TouchableOpacity onPress={() => setShowPostModal(false)}>
                    <X size={20} color="#999" />
                  </TouchableOpacity>
                </View>
                <TextInput
                  placeholder="Écrivez quelque chose..."
                  placeholderTextColor="#999"
                  style={styles.textArea}
                  multiline
                />
                <Text style={styles.hashtags}>@AWTC2025 #AWTC2025</Text>
                <View style={styles.modalActions}>
                  <View style={{ flexDirection: 'row', gap: 16 }}>
                    <TouchableOpacity>
                      <Smile size={20} color="#555" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Camera size={20} color="#555" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Paperclip size={20} color="#555" />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity style={styles.publishBtn} onPress={() => setShowPostModal(false)}>
                    <Text style={{ color: 'white', fontWeight: '600' }}>Publier</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Comments Modal */}
      <Modal visible={showComments} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={handleCloseComments}>
          <View style={styles.commentsOverlay}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.commentsModal}>
                {/* Barre de glissement pour fermer */}
                <View style={styles.dragHandle} />
                
                <View style={styles.commentsHeader}>
                  <Text style={styles.commentsTitle}>Commentaires</Text>
                  <TouchableOpacity onPress={handleCloseComments}>
                    <X size={20} color="#999" />
                  </TouchableOpacity>
                </View>
                
                <ScrollView style={styles.commentsScroll}>
                  {comments.map((c) => (
                    <View key={c.id} style={styles.commentRow}>
                      <View style={styles.commentAvatarPlaceholder}>
                        <Text style={styles.commentAvatarText}>
                          {c.name.charAt(0)}
                        </Text>
                      </View>
                      <View style={styles.commentContent}>
                        <Text style={styles.commentName}>{c.name}</Text>
                        <Text style={styles.commentText}>{c.text}</Text>
                        <Text style={styles.commentTime}>{c.time}</Text>
                      </View>
                    </View>
                  ))}
                </ScrollView>
                
                <View style={styles.commentInputContainer}>
                  <View style={styles.commentInputRow}>
                    <View style={styles.commentAvatarPlaceholder}>
                      <Text style={styles.commentAvatarText}>U</Text>
                    </View>
                    <TextInput
                      style={styles.commentInput}
                      placeholder="Ajouter un commentaire..."
                      placeholderTextColor="#999"
                      value={newComment}
                      onChangeText={setNewComment}
                      multiline
                    />
                    <TouchableOpacity style={styles.sendButton}>
                      <Text style={styles.sendButtonText}>Envoyer</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  headerTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  content: {
    paddingBottom: hp('12%'), // Espace pour la navigation du bas
  },
  inputCard: {
    margin: 16,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  placeholderText: {
    color: '#999',
    fontSize: 16,
  },
  inputActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  filterBtn: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#8B5CF6',
  },
  filterText: {
    color: '#8B5CF6',
    fontSize: 14,
  },
  activeFilter: {
    backgroundColor: '#8B5CF6',
  },
  activeFilterText: {
    color: 'white',
  },
  postCard: {
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  name: {
    fontWeight: '600',
    fontSize: 14,
  },
  role: {
    fontSize: 12,
    color: '#999',
  },
  postText: {
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#333',
    marginBottom: 12,
    lineHeight: 20,
  },
  postImagePlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  imagePlaceholderText: {
    color: '#999',
    fontSize: 14,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  actionText: {
    fontSize: 13,
    color: '#555',
  },
  likes: {
    paddingHorizontal: 16,
    fontSize: 12,
    color: '#777',
    paddingBottom: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  modalBox: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 16,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  textArea: {
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    textAlignVertical: 'top',
    fontSize: 16,
  },
  hashtags: {
    color: '#8B5CF6',
    marginTop: 8,
    fontSize: 14,
  },
  modalActions: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  publishBtn: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
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
  // Styles pour les commentaires
  commentsOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  commentsModal: {
    backgroundColor: '#fff',
    height: height * 0.8,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 8,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#ddd',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  commentsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  commentsScroll: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  commentRow: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 12,
  },
  commentAvatarPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentAvatarText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentName: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 2,
  },
  commentText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  commentTime: {
    fontSize: 12,
    color: '#999',
  },
  commentInputContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  commentInputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 100,
    fontSize: 14,
  },
  sendButton: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default PublicationPage;