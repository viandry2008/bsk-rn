import Icon from '@react-native-vector-icons/fontawesome6';
import React, {useEffect, useRef} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {useDispatch, useSelector} from 'react-redux';
import LoadingComp from '../../components/LoadingComp';
import TextComp from '../../components/TextComp';
import ListItemBookCover from '../../containers/BookCover/ListItemBookCover';
import {ApplicationState, getMeAction, postLogoutAppAction} from '../../store';
import Colors from '../../styles/colors';
import {getDataLoginHelper} from '../../utils/helpers';

type Props = {
  loading: boolean;
  navigation: {navigate: Function};
  user: any;
};

const ProfilePage = ({
  navigation,
  loading = useSelector((state: ApplicationState) => state.authReducer.loading),
  user = useSelector((state: ApplicationState) => state.profileReducer.user),
}: Props) => {
  const dispatch = useDispatch();
  const modalizeRef = useRef<Modalize>(null);

  const books = [
    {
      id: 1,
      image:
        'https://assets1.bmstatic.com/assets/books-covers/98/be/tUOBGULx-ipad.jpg?height=352',
      title: 'I am Malala',
    },
    {
      id: 2,
      image:
        'https://assets1.bmstatic.com/assets/books-covers/e4/40/hpCPjcnN-ipad.jpg?height=352',
      title: 'Kreativitas Tanpa Batas',
    },
    {
      id: 3,
      image:
        'https://assets1.bmstatic.com/assets/books-covers/c4/80/sJPnaHJP-ipad.jpg?height=352',
      title: 'Catatan Indah untuk Tuhan',
    },
  ];

  useEffect(() => {
    const fetching = async () => {
      let user = await getDataLoginHelper();
      dispatch(getMeAction(user?.token) as any);
    };

    fetching();
  }, []);

  return (
    <View style={styles.containerMain}>
      <LoadingComp loading={loading} />
      {/* Header */}
      <View style={styles.container}>
        <TextComp
          type="semibold"
          color={Colors.white}
          size={18}
          value="Profile"
        />
        <TouchableOpacity
          onPress={() => modalizeRef.current?.open()}
          style={styles.button}>
          <Icon
            name="ellipsis-vertical"
            size={18}
            color={Colors.white}
            iconStyle="solid"
          />
        </TouchableOpacity>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        {user?.thumbnail == null ? (
          <Image
            source={{uri: 'https://fakeimg.pl/60x60?text=not+found'}}
            style={styles.profileImage}
          />
        ) : (
          <Image source={{uri: user?.thumbnail}} style={styles.profileImage} />
        )}
        <View>
          <Text style={styles.profileName}>{user?.full_name}</Text>
          <Text style={styles.profileEmail}>{user?.email}</Text>
        </View>
      </View>

      {/* Content Section */}
      <View style={styles.contentSection}>
        <View style={styles.continueBookContainer}>
          <Text style={styles.continueBookText}>Continue Book</Text>
          <View style={styles.continueBookUnderline} />
        </View>

        <FlatList
          data={books}
          numColumns={3}
          keyExtractor={item => item.id.toString()}
          renderItem={({item, index}) => (
            <ListItemBookCover item={item} index={index} onPress={() => {}} />
          )}
          contentContainerStyle={styles.listContainer}
        />
      </View>

      {/* Modalize */}
      <Modalize ref={modalizeRef} modalHeight={250}>
        <FlatList
          data={[
            // {
            //   id: 1,
            //   title: 'Edit Profile',
            //   onPress: () => {
            //     navigation.navigate('EditProfile');
            //   },
            // },
            {
              id: 2,
              title: 'My Favourite',
              onPress: () => {
                navigation.navigate('MyFav');
              },
            },
            {
              id: 3,
              title: 'Logout',
              onPress: () => dispatch(postLogoutAppAction(navigation) as any),
            },
          ]}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}: any) => (
            <TouchableOpacity style={styles.modalItem} onPress={item.onPress}>
              <Text style={styles.modalText}>{item.title}</Text>
              <Icon
                name="chevron-right"
                size={16}
                color={Colors.primary}
                iconStyle="solid"
              />
            </TouchableOpacity>
          )}
        />
      </Modalize>
    </View>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    width: '100%',
    height: 100,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  button: {
    width: 32,
    height: 32,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.white,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingBottom: 60,
    paddingTop: 16,
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
    paddingTop: 32,
  },
  listContainer: {
    paddingBottom: 16,
  },
  continueBookContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  continueBookText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  continueBookUnderline: {
    width: '40%',
    height: 2,
    backgroundColor: Colors.primary,
    marginTop: 4,
  },
  modalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalText: {
    fontSize: 16,
  },
});
