import Icon from '@react-native-vector-icons/fontawesome6';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {useDispatch, useSelector} from 'react-redux';
import HeaderLatesComp from '../../components/LatestComp/HeaderLatesComp';
import NoDataComp from '../../components/NoDataComp';
import TextComp from '../../components/TextComp';
import ListItemBookCt from '../../containers/BookCt/ListItemBookCt';
import {
  ApplicationState,
  getBookDetailAction,
  getBooksLatestAction,
  getCategoriesAction,
} from '../../store';
import Colors from '../../styles/colors';
import DimensionStyle from '../../styles/DimensionStyle';

type Props = {
  navigation: {navigate: Function; addListener: Function};
  booksLatest: any;
  categories: any;
  nextLinkLatest: any;
  hasScrolledLates: any;
};

const LatestPage = ({
  navigation,
  booksLatest = useSelector(
    (state: ApplicationState) => state.bookReducer.booksLatest,
  ),
  nextLinkLatest = useSelector(
    (state: ApplicationState) => state.bookReducer.nextLinkLatest,
  ),
  hasScrolledLates = useSelector(
    (state: ApplicationState) => state.bookReducer.hasScrolledLates,
  ),
  categories = useSelector(
    (state: ApplicationState) => state.categoryReducer.categories,
  ),
}: Props) => {
  const dispatch = useDispatch();

  const modalizeRef = useRef<Modalize>(null);

  const [category, setCategory] = useState<any>({});

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
    const unsubscribe = navigation.addListener('focus', () => {
      fetching();
    });

    const fetching = async () => {
      dispatch(getCategoriesAction() as any);
      dispatch(getBooksLatestAction('', 1, [], 'first') as any);
    };

    fetching();

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      <HeaderLatesComp
        onSearch={() =>
          navigation.navigate('BookSearch', {
            type: 'latest',
            title: 'Cari Buku',
          })
        }
        onMenu={() => modalizeRef.current?.open()}
      />
      <FlatList
        data={booksLatest}
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
                getBooksLatestAction(
                  category?.slug == undefined ? '' : category?.slug,
                  nextLinkLatest,
                  booksLatest,
                  'paging',
                ) as any,
              );
            }
            loadMore.current = false;
          }
        }}
        ListFooterComponent={() => {
          return hasScrolledLates == true ? (
            <View style={{alignItems: 'center', marginVertical: 16}}>
              <ActivityIndicator size="large" color={Colors.black} />
            </View>
          ) : null;
        }}
      />

      <Modalize ref={modalizeRef} modalHeight={400}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 16, paddingVertical: 16}}>
          <TouchableOpacity
            onPress={() => {
              modalizeRef.current?.close();
              setCategory({});
              dispatch(getBooksLatestAction('', 1, [], 'first') as any);
            }}
            style={styles.listCat}>
            <View style={{flex: 1}}>
              <TextComp
                type="semibold"
                color={Colors.black}
                size={12}
                value={'Semua'}
              />
            </View>
            {category?.id == undefined ? (
              <Icon
                name="check"
                size={18}
                color={Colors.black}
                iconStyle="solid"
              />
            ) : null}
          </TouchableOpacity>
          <FlatList
            data={categories}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => {
                  modalizeRef.current?.close();
                  setCategory(item);
                  dispatch(
                    getBooksLatestAction(item?.slug, 1, [], 'first') as any,
                  );
                }}
                style={styles.listCat}>
                <View style={{flex: 1}}>
                  <TextComp
                    type="semibold"
                    color={Colors.black}
                    size={12}
                    value={item?.text}
                  />
                </View>
                {category?.id == item?.id ? (
                  <Icon
                    name="check"
                    size={18}
                    color={Colors.black}
                    iconStyle="solid"
                  />
                ) : null}
              </TouchableOpacity>
            )}
            keyExtractor={(item: any) => item.id}
            showsVerticalScrollIndicator={false}
          />
        </ScrollView>
      </Modalize>
    </View>
  );
};

export default LatestPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  listCat: {
    width: '100%',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: Colors.container,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
