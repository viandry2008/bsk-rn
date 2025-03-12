import React from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CardInfoAuthorComp from '../../components/AuthorComp/CardInfoAuthorComp';
import HeaderCustom from '../../components/HeaderCustom';
import TextComp from '../../components/TextComp';
import ListItemBookCt from '../../containers/BookCt/ListItemBookCt';
import {ApplicationState, getBookDetailAction} from '../../store';
import Colors from '../../styles/colors';
import NoDataComp from '../../components/NoDataComp';

type Props = {
  navigation: {goBack: Function; navigate: Function};
  author: any;
  authorBooks: any;
};

const AuthorDetailPage = ({
  navigation,
  author = useSelector(
    (state: ApplicationState) => state.authorReducer.authorDetail,
  ),
  authorBooks = useSelector(
    (state: ApplicationState) => state.authorReducer.authorBooks,
  ),
}: Props) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <HeaderCustom title="Author Info" onBack={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <CardInfoAuthorComp
          image={author?.thumbnail}
          name={author?.name}
          desc="Integer molestie ante sed turpis ornare, ac bibendum ante varius. Aliquam commodo ultrices metus nec placerat. Aliquam iaculis neque ut faucibus tempus. Nullam ullamcorper lorem dui, in laoreet tellus vulputate sed."
        />
        <View style={{marginVertical: 8, paddingHorizontal: 16}}>
          <TextComp
            type="semibold"
            color={Colors.black}
            size={14}
            value="Author Books"
          />
        </View>
        <FlatList
          data={authorBooks}
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
      </ScrollView>
    </View>
  );
};

export default AuthorDetailPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
