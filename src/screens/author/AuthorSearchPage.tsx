import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import HeaderAuthorSearchComp from '../../components/AuthorComp/HeaderAuthorSearchComp';
import NoDataComp from '../../components/NoDataComp';
import ListItemAuthorCt from '../../containers/AuthorCt/ListItemAuthorCt';
import {ApplicationState, getAllAuthorsAction} from '../../store';
import Colors from '../../styles/colors';

type Props = {
  navigation: {navigate: Function; goBack: Function};
  authors: any;
  allAuthors: any;
};

const AuthorSearchPage = ({
  navigation,
  allAuthors = useSelector(
    (state: ApplicationState) => state.authorReducer.allAuthors,
  ),
}: Props) => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');

  return (
    <View style={styles.container}>
      <HeaderAuthorSearchComp
        onBack={() => navigation.goBack()}
        onSearch={(v: string) => setSearch(v)}
        search={search}
        onSubmitEditing={() =>
          search == ''
            ? dispatch(getAllAuthorsAction(1, '') as any)
            : dispatch(getAllAuthorsAction(1, search) as any)
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
