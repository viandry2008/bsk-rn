import React from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import BookBannerComp from '../../components/BookComp/BookBannerComp';
import BookButtonActionComp from '../../components/BookComp/BookButtonActionComp';
import BookInfoComp from '../../components/BookComp/BookInfoComp';
import BookReviewComp from '../../components/BookComp/BookReviewComp';
import HeaderCustom from '../../components/HeaderCustom';
import TextComp from '../../components/TextComp';
import ListItemBookCt from '../../containers/BookCt/ListItemBookCt';
import {ApplicationState} from '../../store';
import Colors from '../../styles/colors';

type Props = {
  navigation: {goBack: Function; push: Function};
  book: any;
  booksCategory: any;
};

const BookDetailPage = ({
  navigation,
  book = useSelector((state: ApplicationState) => state.bookReducer.bookDetail),
  booksCategory = useSelector(
    (state: ApplicationState) => state.bookReducer.booksCategory,
  ),
}: Props) => {
  return (
    <View style={styles.container}>
      <HeaderCustom onBack={() => navigation.goBack()} title="Detail" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <BookBannerComp
          image={book?.resources}
          title={book?.metadata?.title}
          author={book?.metadata?.author}
          year={book?.metadata?.year}
          view={book?.metadata?.viewed}
        />
        <BookButtonActionComp
          onFavorite={() => {}}
          onRead={() => {}}
          onReport={() => {}}
        />
        <BookInfoComp desc={book?.metadata?.description} />
        <BookReviewComp
          onAll={() => {}}
          rating={book?.metadata?.rating}
          review={0}
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
          data={booksCategory}
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
