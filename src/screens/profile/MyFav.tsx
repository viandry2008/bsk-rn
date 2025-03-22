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
import ListItemBookCover from '../../containers/BookCover/ListItemBookCover';
import {
  ApplicationState,
  getBookDetailAction,
  getFavoritesAction,
} from '../../store';
import Colors from '../../styles/colors';
import {getDataLoginHelper} from '../../utils/helpers';
import DimensionStyle from '../../styles/DimensionStyle';

type Props = {
  navigation: {navigate: Function; goBack: Function};
  favorites: any;
  nextLink: any;
  hasScrolled: any;
};

const MyFav = ({
  navigation,
  favorites = useSelector(
    (state: ApplicationState) => state.favoriteReducer.favorites,
  ),
  nextLink = useSelector(
    (state: ApplicationState) => state.favoriteReducer.nextLink,
  ),
  hasScrolled = useSelector(
    (state: ApplicationState) => state.favoriteReducer.hasScrolled,
  ),
}: Props) => {
  const dispacth = useDispatch();

  const [token, setToken] = useState<any>(null);

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
      let user = await getDataLoginHelper();
      setToken(user?.token);
      dispacth(getFavoritesAction(user?.token, 1, []) as any);
    };

    fetching();
  }, []);

  return (
    <View style={styles.containerMain}>
      <HeaderCustom title="Favorit" onBack={() => navigation.goBack()} />
      <FlatList
        data={favorites}
        numColumns={3}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => (
          <ListItemBookCover
            isFav={true}
            item={item}
            index={index}
            onPress={(params: any) =>
              dispacth(getBookDetailAction(params?.id, navigation) as any)
            }
          />
        )}
        contentContainerStyle={styles.listContainer}
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

              dispacth(getFavoritesAction(token, nextLink, favorites) as any);
            }
            loadMore.current = false;
          }
        }}
        ListFooterComponent={() => {
          return hasScrolled == true ? (
            <View style={{alignItems: 'center', marginVertical: 16}}>
              <ActivityIndicator size="large" color={Colors.black} />
            </View>
          ) : null;
        }}
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
    marginTop: 16,
  },
});
