import React, {useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
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

type Props = {
  navigation: {navigate: Function; goBack: Function};
  favorites: any;
};

const MyFav = ({
  navigation,
  favorites = useSelector(
    (state: ApplicationState) => state.favoriteReducer.favorites,
  ),
}: Props) => {
  const dispacth = useDispatch();

  useEffect(() => {
    const fetching = async () => {
      let user = await getDataLoginHelper();
      dispacth(getFavoritesAction(user?.token) as any);
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
