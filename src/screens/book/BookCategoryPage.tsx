import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import HeaderCustom from '../../components/HeaderCustom';
import NoDataComp from '../../components/NoDataComp';
import CustomFormInput from '../../components/customFormInput';
import ListItemBookCt from '../../containers/BookCt/ListItemBookCt';
import {
  ApplicationState,
  getBookDetailAction,
  getBooksByCategoryAction,
} from '../../store';
import Colors from '../../styles/colors';

type Props = {
  navigation: {navigate: Function; goBack: Function};
  route: any;
  books: any;
};

const BookCategoryPage = ({
  navigation,
  route,
  books = useSelector(
    (state: ApplicationState) => state.bookReducer.booksCategory,
  ),
}: Props) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  return (
    <View style={styles.container}>
      <HeaderCustom
        title={route?.params?.text}
        onBack={() => navigation.goBack()}
      />
      <CustomFormInput
        val={search}
        placholder="Cari buku"
        change={(v: string) => setSearch(v)}
        onSubmitEditing={() =>
          dispatch(
            getBooksByCategoryAction(
              route?.params,
              1,
              search == '' ? '' : search,
              null,
            ) as any,
          )
        }
      />
      <FlatList
        data={books}
        renderItem={({item, index}) => (
          <ListItemBookCt
            item={item}
            index={index}
            type="column"
            onPress={(params: any) =>
              dispatch(getBookDetailAction(params?.id, navigation) as any)
            }
          />
        )}
        keyExtractor={(item: any) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 3}}
        ListEmptyComponent={() => {
          return <NoDataComp />;
        }}
      />
    </View>
  );
};

export default BookCategoryPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
