import React, {useEffect} from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ActivityIndicatorComp from '../../components/ActivityIndicatorComp';
import ButtonSearch from '../../components/HomeComp/ButtonSearch';
import HeaderHome from '../../components/HomeComp/HeaderHome';
import InfoBookHome from '../../components/HomeComp/InfoBookHome';
import TitleSectionHome from '../../components/HomeComp/TitleSectionHome';
import NoDataComp from '../../components/NoDataComp';
import ListItemAuthorCt from '../../containers/AuthorCt/ListItemAuthorCt';
import ListItemBookCt from '../../containers/BookCt/ListItemBookCt';
import {
  ApplicationState,
  getAuthorDetailAction,
  getAuthorHomeAction,
  getBookBannerAction,
  getBookDetailAction,
  getBooksByCategoryAction,
  getBooksByCategoryHomeAction,
  getBooksFeaturedActions,
  getBooksTrendingAction,
} from '../../store';
import Colors from '../../styles/colors';
import {getDataLoginHelper} from '../../utils/helpers';

type Props = {
  navigation: {navigate: Function; addListener: Function};
  banner: any;
  booksTrending: any;
  authorHome: any;
  booksFeaured: any;
  loadingBanner: boolean;
  loadingBooksTrending: boolean;
  loadingHome: boolean;
  loadingBooksFeaured: boolean;
  booksCategoriesHome: any;
  booksCategoriesHomeLoad: any;
};

const HomePage = ({
  navigation,
  banner = useSelector((state: ApplicationState) => state.bookReducer.banner),
  loadingBanner = useSelector(
    (state: ApplicationState) => state.bookReducer.loadingBanner,
  ),
  booksTrending = useSelector(
    (state: ApplicationState) => state.bookReducer.booksTrending,
  ),
  loadingBooksTrending = useSelector(
    (state: ApplicationState) => state.bookReducer.loadingBooksTrending,
  ),
  authorHome = useSelector(
    (state: ApplicationState) => state.authorReducer.authorHome,
  ),
  loadingHome = useSelector(
    (state: ApplicationState) => state.authorReducer.loadingHome,
  ),
  booksFeaured = useSelector(
    (state: ApplicationState) => state.bookReducer.booksFeaured,
  ),
  loadingBooksFeaured = useSelector(
    (state: ApplicationState) => state.bookReducer.loadingBooksFeaured,
  ),
  booksCategoriesHome = useSelector(
    (state: ApplicationState) => state.bookReducer.booksCategoriesHome,
  ),
  booksCategoriesHomeLoad = useSelector(
    (state: ApplicationState) => state.bookReducer.booksCategoriesHomeLoad,
  ),
}: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // const unsubscribe = navigation.addListener('focus', () => {
    //   fetching();
    // });

    const fetching = async () => {
      let user = await getDataLoginHelper();
      dispatch(getBookBannerAction() as any);
      dispatch(getBooksTrendingAction(5) as any);
      dispatch(getAuthorHomeAction() as any);
      dispatch(getBooksFeaturedActions(5) as any);
      dispatch(getBooksByCategoryHomeAction() as any);
    };

    fetching();

    // return () => {
    //   unsubscribe();
    // };
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
        {loadingBanner == true ? (
          <ActivityIndicatorComp />
        ) : (
          <>
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
          </>
        )}
        <TitleSectionHome
          title="Buku Populer"
          onPress={() =>
            navigation.navigate('BookSearch', {
              type: 'popular',
              title: 'Buku Populer',
            })
          }
        />
        {loadingBooksTrending == true ? (
          <ActivityIndicatorComp />
        ) : (
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
            ListEmptyComponent={() => {
              return <NoDataComp />;
            }}
          />
        )}
        <TitleSectionHome
          title="Autor"
          onPress={() => navigation.navigate('MainHome', {screen: 'Author'})}
        />
        {loadingHome == true ? (
          <ActivityIndicatorComp />
        ) : (
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
        )}
        <TitleSectionHome
          title="Buku Unggulan"
          onPress={() =>
            navigation.navigate('BookSearch', {
              type: 'featured',
              title: 'Buku Unggulan',
            })
          }
        />
        {loadingBooksFeaured == true ? (
          <ActivityIndicatorComp />
        ) : (
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
        )}

        {booksCategoriesHomeLoad == true ? (
          <ActivityIndicatorComp />
        ) : (
          <View style={{marginBottom: 24}}>
            <FlatList
              data={booksCategoriesHome}
              renderItem={({item, index}) => (
                <>
                  <TitleSectionHome
                    title={item?.text}
                    onPress={() =>
                      dispatch(
                        getBooksByCategoryAction(
                          item,
                          1,
                          '',
                          navigation,
                          [],
                        ) as any,
                      )
                    }
                  />
                  <FlatList
                    data={item?.books}
                    renderItem={({item, index}) => (
                      <ListItemBookCt
                        item={item}
                        index={index}
                        type="row"
                        onPress={(params: any) =>
                          dispatch(
                            getBookDetailAction(params?.id, navigation) as any,
                          )
                        }
                      />
                    )}
                    keyExtractor={(item: any) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{paddingHorizontal: 8}}
                  />
                </>
              )}
              keyExtractor={(item: any) => item.id}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}
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
