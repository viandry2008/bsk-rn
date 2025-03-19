import React, {useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
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
import Colors from '../../styles/colors';

type Props = {
  navigation: {navigate: Function; addListener: Function};
  authors: any;
  loading: boolean;
  allAuthors: any;
};

const AuthorPage = ({
  navigation,
  allAuthors = useSelector(
    (state: ApplicationState) => state.authorReducer.allAuthors,
  ),
  loading = useSelector(
    (state: ApplicationState) => state.authorReducer.loading,
  ),
}: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetching();
    });

    const fetching = async () => {
      dispatch(getAllAuthorsAction(1, '') as any);
    };

    fetching();

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      <LoadingComp loading={loading} />
      <HeaderAuthorComp onSearch={() => navigation.navigate('AuthorSearch')} />
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
