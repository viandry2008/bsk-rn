import React from 'react';
import {
    FlatList,
    StyleSheet,
    View
} from 'react-native';
import ListItemBookCover from '../../containers/BookCover/ListItemBookCover';
import Colors from '../../styles/colors';

const MyFav = ({ navigation }: any) => {

  const books = [
    {
      id: 1,
      image: 'https://assets1.bmstatic.com/assets/books-covers/98/be/tUOBGULx-ipad.jpg?height=352',
      title: 'I am Malala',
      isFav: true
    },
    {
      id: 2,
      image: 'https://assets1.bmstatic.com/assets/books-covers/e4/40/hpCPjcnN-ipad.jpg?height=352',
      title: 'Kreativitas Tanpa Batas',
      isFav: true
    },
    {
      id: 3,
      image: 'https://assets1.bmstatic.com/assets/books-covers/c4/80/sJPnaHJP-ipad.jpg?height=352',
      title: 'Catatan Indah untuk Tuhan',
      isFav: true
    }
  ];

  return (
    <View style={styles.containerMain}>
       <FlatList
          data={books}
          numColumns={3}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => <ListItemBookCover item={item} index={index} onPress={() => {}} />}
          contentContainerStyle={styles.listContainer}
        />
    </View>
  );
};

export default MyFav;

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  listContainer: {
    paddingBottom: 16,
    marginTop:16
  },
});
