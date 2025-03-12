import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import HeaderCustom from '../../components/HeaderCustom';
import ListItemBookCt from '../../containers/BookCt/ListItemBookCt';
import {
  ApplicationState,
  getBookDetailAction,
  getBooksAction,
} from '../../store';
import Colors from '../../styles/colors';
import CustomFormInput from '../../components/customFormInput';
import TextComp from '../../components/TextComp';
import {messageHelper} from '../../utils/helpers';
import NoDataComp from '../../components/NoDataComp';

type Props = {
  navigation: {navigate: Function; goBack: Function};
  route: any;
  books: any;
};

const BookSearchPage = ({
  navigation,
  route,
  books = useSelector((state: ApplicationState) => state.bookReducer.books),
}: Props) => {
  const [category, setCategory] = useState(route?.params);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');

  return (
    <View style={styles.container}>
      <HeaderCustom title={'Cari Buku'} onBack={() => navigation.goBack()} />
      <CustomFormInput
        placholder="Cari buku...."
        val={search}
        change={(v: string) => setSearch(v)}
        onSubmitEditing={() =>
          search == ''
            ? messageHelper('Masukan nama buku', 'danger')
            : dispatch(
                getBooksAction(
                  1,
                  category?.slug == undefined ? '' : category?.slug,
                  search,
                ) as any,
              )
        }
      />
      {route?.params?.text != undefined ? (
        <View style={{paddingHorizontal: 16, marginBottom: 8}}>
          <TextComp
            type="semibold"
            color={Colors.black}
            size={14}
            value={route?.params?.text}
          />
        </View>
      ) : null}
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
