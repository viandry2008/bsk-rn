import React, {useEffect} from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ButtonSearch from '../../components/HomeComp/ButtonSearch';
import HeaderHome from '../../components/HomeComp/HeaderHome';
import InfoBookHome from '../../components/HomeComp/InfoBookHome';
import TitleSectionHome from '../../components/HomeComp/TitleSectionHome';
import ListItemAuthorCt from '../../containers/AuthorCt/ListItemAuthorCt';
import ListItemBookCt from '../../containers/BookCt/ListItemBookCt';
import {
  ApplicationState,
  getAuthorDetailAction,
  getAuthorHomeAction,
  getBookDetailAction,
  getBooksByCategoryAction,
  getBooksFeaturedActions,
  getBooksTrendingAction,
} from '../../store';
import Colors from '../../styles/colors';
import {getDataLoginHelper} from '../../utils/helpers';

type Props = {
  navigation: {navigate: Function};
  banner: any;
  booksTrending: any;
  authorHome: any;
  booksFeaured: any;
};

const HomePage = ({
  navigation,
  banner = useSelector((state: ApplicationState) => state.bookReducer.banner),
  booksTrending = useSelector(
    (state: ApplicationState) => state.bookReducer.booksTrending,
  ),
  authorHome = useSelector(
    (state: ApplicationState) => state.authorReducer.authorHome,
  ),
  booksFeaured = useSelector(
    (state: ApplicationState) => state.bookReducer.booksFeaured,
  ),
}: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetching = async () => {
      let user = await getDataLoginHelper();
      dispatch(getBooksByCategoryAction('', 1, null) as any);
      dispatch(getBooksTrendingAction(5) as any);
      dispatch(getAuthorHomeAction() as any);
      dispatch(getBooksFeaturedActions(5) as any);
    };

    fetching();
  }, []);

  return (
    <View style={styles.container}>
      <HeaderHome onPress={() => {}} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ButtonSearch onPress={() => {}} />
        <InfoBookHome
          image={banner?.resources}
          title={banner?.metadata?.title}
          author={banner?.metadata?.author}
          onPress={() =>
            dispatch(getBookDetailAction(banner?.id, navigation) as any)
          }
        />
        <TitleSectionHome title="Buku Populer" onPress={() => {}} />
        <FlatList
          data={booksTrending}
          renderItem={({item, index}) => (
            <ListItemBookCt
              item={item}
              index={index}
              type="row"
              onPress={() => navigation.navigate('BookDetail')}
            />
          )}
          keyExtractor={(item: any) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 8}}
        />
        <TitleSectionHome title="Autor" onPress={() => {}} />
        <FlatList
          data={authorHome}
          renderItem={({item, index}) => (
            <ListItemAuthorCt
              item={item}
              index={index}
              onPress={(params: any) =>
                dispatch(getAuthorDetailAction(params?.id, navigation) as any)
              }
              type="row"
            />
          )}
          keyExtractor={(item: any) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 8}}
        />
        <TitleSectionHome title="Buku Unggulan" onPress={() => {}} />
        <FlatList
          data={booksFeaured}
          renderItem={({item, index}) => (
            <ListItemBookCt
              item={item}
              index={index}
              type="row"
              onPress={() => navigation.navigate('BookDetail')}
            />
          )}
          keyExtractor={(item: any) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 8}}
        />
      </ScrollView>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
