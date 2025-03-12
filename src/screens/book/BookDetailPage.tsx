import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import BookBannerComp from '../../components/BookComp/BookBannerComp';
import BookButtonActionComp from '../../components/BookComp/BookButtonActionComp';
import BookInfoComp from '../../components/BookComp/BookInfoComp';
import BookReviewComp from '../../components/BookComp/BookReviewComp';
import HeaderCustom from '../../components/HeaderCustom';
import TextComp from '../../components/TextComp';
import ListItemBookCt from '../../containers/BookCt/ListItemBookCt';
import {
  ApplicationState,
  getBookDetailAction,
  postFavoriteAction,
} from '../../store';
import Colors from '../../styles/colors';
import {getDataLoginHelper} from '../../utils/helpers';
import LoadingComp from '../../components/LoadingComp';

type Props = {
  navigation: {goBack: Function; push: Function};
  book: any;
  booksCategory: any;
  loading: boolean;
};

const BookDetailPage = ({
  navigation,
  book = useSelector((state: ApplicationState) => state.bookReducer.bookDetail),
  booksCategory = useSelector(
    (state: ApplicationState) => state.bookReducer.booksCategory,
  ),
  loading = useSelector(
    (state: ApplicationState) => state.favoriteReducer.loading,
  ),
}: Props) => {
  const dispacth = useDispatch();
  const [token, setToken] = useState<any>(null);

  useEffect(() => {
    const fetching = async () => {
      let user = await getDataLoginHelper();
      setToken(user?.token);
    };

    fetching();
  }, []);

  const handelAddFavorite = () => {
    let body = {
      ebook_id: book?.id,
    };
    dispacth(postFavoriteAction(token, body) as any);
  };

  return (
    <View style={styles.container}>
      <LoadingComp loading={loading} />
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
          onFavorite={() => handelAddFavorite()}
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
              onPress={(params: any) =>
                dispacth(getBookDetailAction(params?.id, navigation) as any)
              }
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
