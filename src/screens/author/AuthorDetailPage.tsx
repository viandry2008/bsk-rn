import React from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import CardInfoAuthorComp from '../../components/AuthorComp/CardInfoAuthorComp';
import HeaderCustom from '../../components/HeaderCustom';
import TextComp from '../../components/TextComp';
import ListItemBookCt from '../../containers/BookCt/ListItemBookCt';
import Colors from '../../styles/colors';

type Props = {
  navigation: {goBack: Function; navigate: Function};
};

const AuthorDetailPage = ({navigation}: Props) => {
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
      <HeaderCustom title="Author Info" onBack={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <CardInfoAuthorComp
          image="https://randomuser.me/api/portraits/men/44.jpg"
          name="John Thor"
          desc="Integer molestie ante sed turpis ornare, ac bibendum ante varius. Aliquam commodo ultrices metus nec placerat. Aliquam iaculis neque ut faucibus tempus. Nullam ullamcorper lorem dui, in laoreet tellus vulputate sed."
        />
        <View style={{marginVertical: 8, paddingHorizontal: 16}}>
          <TextComp
            type="semibold"
            color={Colors.black}
            size={14}
            value="Author Books"
          />
        </View>
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
      </ScrollView>
    </View>
  );
};

export default AuthorDetailPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
