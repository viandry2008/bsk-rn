import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import HeaderLatesComp from '../../components/LatestComp/HeaderLatesComp';
import ListItemBookCt from '../../containers/BookCt/ListItemBookCt';
import Colors from '../../styles/colors';

type Props = {
  navigation: {navigate: Function};
};

const LatestPage = ({navigation}: Props) => {
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
    <View style={styles.container}>
      <HeaderLatesComp onSearch={() => {}} onMenu={() => {}} />
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
  );
};

export default LatestPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
