import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import BookBannerComp from '../../components/BookComp/BookBannerComp';
import BookButtonActionComp from '../../components/BookComp/BookButtonActionComp';
import BookInfoComp from '../../components/BookComp/BookInfoComp';
import BookReviewComp from '../../components/BookComp/BookReviewComp';
import HeaderCustom from '../../components/HeaderCustom';
import LoadingComp from '../../components/LoadingComp';
import NoDataComp from '../../components/NoDataComp';
import InputReviewComp from '../../components/ReviewComp/InputReviewComp';
import TextComp from '../../components/TextComp';
import ListItemBookCt from '../../containers/BookCt/ListItemBookCt';
import {
  ApplicationState,
  getBookDetailAction,
  getMeAction,
  getReviewsAction,
  postFavoriteAction,
  postReviewAction,
} from '../../store';
import DimensionStyle from '../../styles/DimensionStyle';
import Colors from '../../styles/colors';
import {getDataLoginHelper, messageHelper} from '../../utils/helpers';

type Props = {
  navigation: {goBack: Function; push: Function; navigate: Function};
  book: any;
  booksCategory: any;
  loading: boolean;
  user: any;
  loadingReview: boolean;
  bookPdf: any;
  reviews: any;
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
  user = useSelector((state: ApplicationState) => state.profileReducer.user),
  loadingReview = useSelector(
    (state: ApplicationState) => state.reviewReducer.loading,
  ),
  bookPdf = useSelector((state: ApplicationState) => state.bookReducer.bookPdf),
  reviews = useSelector(
    (state: ApplicationState) => state.reviewReducer.reviews,
  ),
}: Props) => {
  const dispacth = useDispatch();
  const [token, setToken] = useState<any>(null);

  const [visibleModal, setVisibleModal] = useState(false);
  const [textReview, setTextReview] = useState('');
  const [starReview, setStarReview] = useState(0);

  useEffect(() => {
    const fetching = async () => {
      let dataLogin = await getDataLoginHelper();
      setToken(dataLogin?.token);
      dispacth(getMeAction(dataLogin?.token) as any);
      if (dataLogin?.token != null || user == 'Unauthenticated') {
        dispacth(getReviewsAction(dataLogin?.token, book?.id) as any);
      }
    };

    fetching();
  }, []);

  const handelAddFavorite = () => {
    let body = {
      ebook_id: book?.id,
    };
    dispacth(postFavoriteAction(token, body) as any);
  };

  // handle review
  const handleReview = () => {
    if (textReview == '') {
      messageHelper('Harap isi pesan review', 'danger');
    } else {
      let body = {
        rating: starReview,
        comment: textReview,
        reviewer_name: user?.full_name,
      };

      dispacth(postReviewAction(token, body, book?.id) as any);

      setStarReview(0);
      setTextReview('');
      setVisibleModal(false);
    }
  };

  return (
    <View style={styles.container}>
      <LoadingComp loading={loading} />
      <LoadingComp loading={loadingReview} />
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
          onRead={() => navigation.navigate('BookPdf', {pdfLink: bookPdf})}
          onReport={() => {}}
        />
        <BookInfoComp desc={book?.metadata?.description} />
        <BookReviewComp
          userStatus={user}
          onAll={() => navigation.navigate('Review', {bookId: book?.id})}
          rating={book?.metadata?.rating}
          review={reviews?.length}
          onReview={() =>
            user == 'Unauthenticated'
              ? navigation.navigate('MainHome', {screen: 'Profile'})
              : setVisibleModal(true)
          }
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
          ListEmptyComponent={() => {
            return (
              <View style={{width: DimensionStyle.dimensionWidth * 1}}>
                <NoDataComp />
              </View>
            );
          }}
        />
      </ScrollView>
      <InputReviewComp
        visible={visibleModal}
        onVisible={() => setVisibleModal(false)}
        onFinishRating={(v: any) => setStarReview(v)}
        comment={textReview}
        onChangeText={(v: string) => setTextReview(v)}
        onSave={() => handleReview()}
      />
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
