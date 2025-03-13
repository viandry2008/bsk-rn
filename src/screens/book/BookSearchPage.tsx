import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import HeaderCustom from '../../components/HeaderCustom';
import NoDataComp from '../../components/NoDataComp';
import CustomFormInput from '../../components/customFormInput';
import ListItemBookCt from '../../containers/BookCt/ListItemBookCt';
import {
  ApplicationState,
  getAllBooksAction,
  getBookDetailAction,
} from '../../store';
import Colors from '../../styles/colors';

type Props = {
  navigation: {navigate: Function; goBack: Function};
  route: any;
  books: any;
  booksLatest: any;
};

const BookSearchPage = ({
  navigation,
  route,
  books = useSelector((state: ApplicationState) => state.bookReducer.booksAll),
}: Props) => {
  const dispatch = useDispatch();

  const [type, setType] = useState(route?.params?.type);

  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetching = async () => {
      dispatch(getAllBooksAction(route?.params?.type, 1, '') as any);
    };

    fetching();
  }, []);

  return (
    <View style={styles.container}>
      <HeaderCustom
        title={route?.params?.title}
        onBack={() => navigation.goBack()}
      />
      <CustomFormInput
        placholder="Cari buku...."
        val={search}
        change={(v: string) => setSearch(v)}
        onSubmitEditing={() =>
          search == ''
            ? dispatch(getAllBooksAction(type, 1, '') as any)
            : dispatch(getAllBooksAction(type, 1, search) as any)
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

export default BookSearchPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
