import React, {useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import HeaderAuthorComp from '../../components/AuthorComp/HeaderAuthorComp';
import ListItemAuthorCt from '../../containers/AuthorCt/ListItemAuthorCt';
import {
  ApplicationState,
  getAuthorDetailAction,
  getAuthorsAction,
} from '../../store';
import Colors from '../../styles/colors';
import LoadingComp from '../../components/LoadingComp';

type Props = {
  navigation: {navigate: Function};
  authors: any;
  loading: boolean;
};

const AuthorPage = ({
  navigation,
  authors = useSelector(
    (state: ApplicationState) => state.authorReducer.authors,
  ),
  loading = useSelector(
    (state: ApplicationState) => state.authorReducer.loading,
  ),
}: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetching = async () => {
      dispatch(getAuthorsAction(1) as any);
    };

    fetching();
  }, []);

  return (
    <View style={styles.container}>
      <LoadingComp loading={loading} />
      <HeaderAuthorComp onSearch={() => navigation.navigate('AuthorSearch')} />
      <FlatList
        data={authors}
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
