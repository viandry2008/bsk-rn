import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import HeaderCustom from '../../components/HeaderCustom';
import ListItemBookCt from '../../containers/BookCt/ListItemBookCt';
import {ApplicationState} from '../../store';
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
  return (
    <View style={styles.container}>
      <HeaderCustom
        title={route?.params?.text}
        onBack={() => navigation.goBack()}
      />
      <FlatList
        data={books}
        renderItem={({item, index}) => (
          <ListItemBookCt
            item={item}
            index={index}
            type="column"
            onPress={() => navigation.navigate('BookDetail')}
          />
        )}
        keyExtractor={(item: any) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 3}}
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
