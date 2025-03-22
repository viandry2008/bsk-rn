import React, {useCallback, useRef, useState} from 'react';
import {ActivityIndicator, Animated, StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import HeaderAuthorSearchComp from '../../components/AuthorComp/HeaderAuthorSearchComp';
import NoDataComp from '../../components/NoDataComp';
import ListItemAuthorCt from '../../containers/AuthorCt/ListItemAuthorCt';
import {ApplicationState, getAllAuthorsAction} from '../../store';
import Colors from '../../styles/colors';
import DimensionStyle from '../../styles/DimensionStyle';

type Props = {
  navigation: {navigate: Function; goBack: Function};
  authors: any;
  allAuthors: any;
  hasScrolledAll: any;
  nextLinkAll: any;
};

const AuthorSearchPage = ({
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
}: Props) => {
  const dispatch = useDispatch();

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

  return (
    <View style={styles.container}>
      <HeaderAuthorSearchComp
        onBack={() => navigation.goBack()}
        onSearch={(v: string) => setSearch(v)}
        search={search}
        onSubmitEditing={() =>
          search == ''
            ? dispatch(getAllAuthorsAction(1, '', [], null) as any)
            : dispatch(getAllAuthorsAction(1, search, [], null) as any)
        }
      />
      <FlatList
        data={allAuthors}
        renderItem={({item, index}) => (
          <ListItemAuthorCt
            item={item}
            index={index}
            onPress={() => navigation.navigate('AuthorDetail')}
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
                getAllAuthorsAction(
                  nextLinkAll,
                  search == '' ? '' : search,
                  allAuthors,
                  null,
                ) as any,
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

export default AuthorSearchPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
