import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import HeaderAuthorSearchComp from '../../components/AuthorComp/HeaderAuthorSearchComp';
import ListItemAuthorCt from '../../containers/AuthorCt/ListItemAuthorCt';
import {ApplicationState, getAuthorsSearchAction} from '../../store';
import Colors from '../../styles/colors';
import {messageHelper} from '../../utils/helpers';

type Props = {
  navigation: {navigate: Function; goBack: Function};
  authors: any;
};

const AuthorSearchPage = ({
  navigation,
  authors = useSelector(
    (state: ApplicationState) => state.authorReducer.authorsSearch,
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
            ? messageHelper('Harap masukan pencarian', 'danger')
            : dispatch(getAuthorsSearchAction(search, 1) as any)
        }
      />
      <FlatList
        data={authors}
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
