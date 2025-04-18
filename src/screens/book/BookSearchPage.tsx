import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import HeaderCustom from '../../components/HeaderCustom';
import NoDataComp from '../../components/NoDataComp';
import CustomFormInput from '../../components/customFormInput';
import ListItemBookCt from '../../containers/BookCt/ListItemBookCt';
import {
  ApplicationState,
  getAllBooksAction,
  getBookDetailAction,
} from '../../store';
import DimensionStyle from '../../styles/DimensionStyle';
import Colors from '../../styles/colors';

type Props = {
  navigation: {navigate: Function; goBack: Function};
  route: any;
  books: any;
  booksLatest: any;
  hasScrolledAll: any;
  nextLinkAll: any;
};

const BookSearchPage = ({
  navigation,
  route,
  books = useSelector((state: ApplicationState) => state.bookReducer.booksAll),
  hasScrolledAll = useSelector(
    (state: ApplicationState) => state.bookReducer.hasScrolledAll,
  ),
  nextLinkAll = useSelector(
    (state: ApplicationState) => state.bookReducer.nextLinkAll,
  ),
}: Props) => {
  const dispatch = useDispatch();

  const [type, setType] = useState(route?.params?.type);

  const [search, setSearch] = useState('');

  // scroll
  const loadMore = useRef(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [scrollY, setscrollY] = useState(new Animated.Value(0));

  // handle scolled
  const handleScroll = useCallback(
    ({contentOffset: {y}}: any) => {
      const offset = Math.round(y / (DimensionStyle.dimensionHeight * 1.8));

      setFocusedIndex(offset);
    },
    [setFocusedIndex],
  );

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: any) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  useEffect(() => {
    const fetching = async () => {
      dispatch(getAllBooksAction(route?.params?.type, 1, '', []) as any);
    };

    fetching();
  }, []);

  return (
    <View style={styles.container}>
      <HeaderCustom
        title={route?.params?.title}
        onBack={() => navigation.goBack()}
      />
      <CustomFormInput
        placholder="Cari buku...."
        val={search}
        change={(v: string) => setSearch(v)}
        onSubmitEditing={() =>
          search == ''
            ? dispatch(getAllBooksAction(type, 1, '', []) as any)
            : dispatch(getAllBooksAction(type, 1, search, []) as any)
        }
      />
      <FlatList
        data={books}
        renderItem={({item, index}) => (
          <ListItemBookCt
            item={item}
            index={index}
            type="column"
            onPress={(params: any) =>
              dispatch(getBookDetailAction(params?.id, navigation) as any)
            }
          />
        )}
        keyExtractor={(item: any) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 3}}
        ListEmptyComponent={() => {
          return <NoDataComp />;
        }}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        onMomentumScrollBegin={() => {
          loadMore.current = true;
        }}
        onMomentumScrollEnd={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            if (loadMore.current) {
              handleScroll(nativeEvent);

              dispatch(
                getAllBooksAction(type, nextLinkAll, search, books) as any,
              );
            }
            loadMore.current = false;
          }
        }}
        ListFooterComponent={() => {
          return hasScrolledAll == true ? (
            <View style={{alignItems: 'center', marginVertical: 16}}>
              <ActivityIndicator size="large" color={Colors.black} />
            </View>
          ) : null;
        }}
      />
    </View>
  );
};

export default BookSearchPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
