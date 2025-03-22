import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import HeaderAuthorComp from '../../components/AuthorComp/HeaderAuthorComp';
import LoadingComp from '../../components/LoadingComp';
import NoDataComp from '../../components/NoDataComp';
import ListItemAuthorCt from '../../containers/AuthorCt/ListItemAuthorCt';
import {
  ApplicationState,
  getAllAuthorsAction,
  getAuthorDetailAction,
} from '../../store';
import DimensionStyle from '../../styles/DimensionStyle';
import Colors from '../../styles/colors';
import {all} from 'axios';

type Props = {
  navigation: {navigate: Function; addListener: Function};
  authors: any;
  loading: boolean;
  allAuthors: any;
  nextLinkAll: any;
  hasScrolledAll: any;
};

const AuthorPage = ({
  navigation,
  allAuthors = useSelector(
    (state: ApplicationState) => state.authorReducer.allAuthors,
  ),
  hasScrolledAll = useSelector(
    (state: ApplicationState) => state.authorReducer.hasScrolledAll,
  ),
  nextLinkAll = useSelector(
    (state: ApplicationState) => state.authorReducer.nextLinkAll,
  ),
  loading = useSelector(
    (state: ApplicationState) => state.authorReducer.loading,
  ),
}: Props) => {
  const dispatch = useDispatch();

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
      dispatch(getAllAuthorsAction(1, '', [], null) as any);
    };

    fetching();

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      <LoadingComp loading={loading} />
      <HeaderAuthorComp
        onSearch={() =>
          dispatch(getAllAuthorsAction(1, '', [], navigation) as any)
        }
      />
      <FlatList
        data={allAuthors}
        renderItem={({item, index}) => (
          <ListItemAuthorCt
            item={item}
            index={index}
            onPress={(params: any) =>
              dispatch(getAuthorDetailAction(params?.id, navigation) as any)
            }
            type="column"
          />
        )}
        keyExtractor={(item: any) => item.id}
        numColumns={3}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 8}}
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
                getAllAuthorsAction(nextLinkAll, '', allAuthors, null) as any,
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

export default AuthorPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
