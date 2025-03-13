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
  getBookBannerAction,
  getBookDetailAction,
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
      dispatch(getBookBannerAction() as any);
      dispatch(getBooksTrendingAction(5) as any);
      dispatch(getAuthorHomeAction() as any);
      dispatch(getBooksFeaturedActions(5) as any);
    };

    fetching();
  }, []);

  return (
    <View style={styles.container}>
      <HeaderHome />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ButtonSearch
          onPress={() =>
            navigation.navigate('BookSearch', {
              type: 'latest',
              title: 'Cari Buku',
            })
          }
        />
        {banner?.map((item: any) => {
          return (
            <InfoBookHome
              image={item?.resources}
              title={item?.metadata?.title}
              author={item?.metadata?.author}
              onPress={() =>
                dispatch(getBookDetailAction(item?.id, navigation) as any)
              }
            />
          );
        })}
        <TitleSectionHome
          title="Buku Populer"
          onPress={() =>
            navigation.navigate('BookSearch', {
              type: 'popular',
              title: 'Buku Populer',
            })
          }
        />
        <FlatList
          data={booksTrending}
          renderItem={({item, index}) => (
            <ListItemBookCt
              item={item}
              index={index}
              type="row"
              onPress={(params: any) =>
                dispatch(getBookDetailAction(params?.id, navigation) as any)
              }
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
        <TitleSectionHome
          title="Buku Unggulan"
          onPress={() =>
            navigation.navigate('BookSearch', {
              type: 'featured',
              title: 'Buku Unggulan',
            })
          }
        />
        <FlatList
          data={booksFeaured}
          renderItem={({item, index}) => (
            <ListItemBookCt
              item={item}
              index={index}
              type="row"
              onPress={(params: any) =>
                dispatch(getBookDetailAction(params?.id, navigation) as any)
              }
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
