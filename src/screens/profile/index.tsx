import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Modal
} from 'react-native';
import Colors from '../../styles/colors';
import Icon from '@react-native-vector-icons/fontawesome6';
import HeaderHome from '../../components/HomeComp/HeaderHome';
import TextComp from '../../components/TextComp';
import ListItemBookCt from '../../containers/BookCt/ListItemBookCt';


const ProfilePage = ({ navigation }:any) => {
  const [modalVisible, setModalVisible] = useState(false);

  const books = [
    {
      id: 1,
      image:
        'https://assets1.bmstatic.com/assets/books-covers/98/be/tUOBGULx-ipad.jpg?height=352',
      title: 'i am Malala',
      author: 'Malala Yousafzai',
      rating: 4,
      price: 0,
    },
    {
      id: 2,
      image:
        'https://assets1.bmstatic.com/assets/books-covers/e4/40/hpCPjcnN-ipad.jpg?height=352',
      title: 'Kreativitas Tanpa Batas',
      author: 'Tim Kick Andy',
      rating: 5,
      price: 10000,
    },
    {
      id: 3,
      image:
        'https://assets1.bmstatic.com/assets/books-covers/c4/80/sJPnaHJP-ipad.jpg?height=352',
      title: 'Catatan Indah untuk Tuhan',
      author: 'Saptuari Sugiharto',
      rating: 4,
      price: 11000,
    },
  ];
  return (
    <View style={{ flex: 1,
        backgroundColor: Colors.white}}>
     <View style={styles.container}>
      <TextComp
        type="semibold"
        color={Colors.white}
        size={18}
        value="Profile"
      />
      <TouchableOpacity onPress={() => setModalVisible(true)
      } style={styles.button}>
        <Icon name="ellipsis-vertical" size={18} color={Colors.white} iconStyle="solid" />
      </TouchableOpacity>
    </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={require('../../assets/images/sigma.jpg')}
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileEmail}>johndoe@example.com</Text>
        </View>
      </View>

      {/* Content Section */}
      <View style={styles.contentSection}>
      <FlatList
        data={books}
        renderItem={({item, index}) => (
          <ListItemBookCt
            item={item}
            index={index}
            type="column"
            onPress={() => navigation.navigate('BookDetail')}
          />
        )}
        keyExtractor={(item: any) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 3}}
      />
      </View>

      {/* Modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Profile Options</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeModal}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.white,
//   },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingBottom: 32,
    height: 150
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 40,
    marginRight: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
  },
  profileEmail: {
    fontSize: 14,
    color: Colors.white,
  },
  contentSection: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -32,
    padding: 16,
  },
  listItem: {
    padding: 16,
    borderBottomWidth: 1,
    // borderBottomColor: Colors.lightGray,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 10,
  },
  closeModal: {
    marginTop: 10,
    color: Colors.primary,
  },
  container: {
    width: '100%',
    height: 70,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  button: {
    // backgroundColor: Colors.lightPrimary,
    width: 32,
    height: 32,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth:1,
    borderColor:Colors.white
  },
});
