import React from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import BookBannerComp from '../../components/BookComp/BookBannerComp';
import BookButtonActionComp from '../../components/BookComp/BookButtonActionComp';
import HeaderCustom from '../../components/HeaderCustom';
import Colors from '../../styles/colors';
import BookInfoComp from '../../components/BookComp/BookInfoComp';
import BookReviewComp from '../../components/BookComp/BookReviewComp';
import TextComp from '../../components/TextComp';
import ListItemBookCt from '../../containers/BookCt/ListItemBookCt';

type Props = {
  navigation: {goBack: Function; push: Function};
};

const BookDetailPage = ({navigation}: Props) => {
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
      <HeaderCustom
        onBack={() => navigation.goBack()}
        title="Detail"
        iconRight="plane"
        onRight={() => {}}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <BookBannerComp
          image="https://assets1.bmstatic.com/assets/books-covers/e4/40/hpCPjcnN-ipad.jpg?height=352"
          title="Lorem ip sum dolor"
          author="John Doe"
          price={0}
          view="13k"
        />
        <BookButtonActionComp
          onFavorite={() => {}}
          onDownload={() => {}}
          onRead={() => {}}
          onReport={() => {}}
        />
        <BookInfoComp
          desc="Donec nec quam eu nisi efficitur volutpat vulputate iaculis 
        mauris. Ut eget sapien faucibus tortor fermentum mollis sit amet eget nulla. 
        Pellentesque sollicitudin faucibus mauris nec laoreet. Quisque viverra rutrum 
        orci ac vestibulum. Duis venenatis ornare dolor. Pellentesque mauris diam, 
        lacinia vel orci sed, rhoncus vestibulum urna. Sed scelerisque metus ex, in 
        eleifend ante lobortis vel. Pellentesque ut consequat dui, at accumsan leo. 
        Etiam facilisis vel arcu at tristique. Donec enim ex, tincidunt non posuere vel, 
        iaculis vel mi. Phasellus in sollicitudin nisl. Nunc sed nisi nunc."
        />
        <BookReviewComp
          onAll={() => {}}
          rating={4}
          review={337}
          onReview={() => {}}
        />
        <View style={{marginVertical: 8, paddingHorizontal: 16}}>
          <TextComp
            type="semibold"
            color={Colors.black}
            size={14}
            value="Rekated Books"
          />
        </View>
        <FlatList
          data={books}
          renderItem={({item, index}) => (
            <ListItemBookCt
              item={item}
              index={index}
              type="row"
              onPress={() => navigation.push('BookDetail')}
            />
          )}
          keyExtractor={(item: any) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 8, marginBottom: 16}}
        />
      </ScrollView>
    </View>
  );
};

export default BookDetailPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
