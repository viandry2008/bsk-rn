import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import HeaderAuthorComp from '../../components/AuthorComp/HeaderAuthorComp';
import ListItemAuthorCt from '../../containers/AuthorCt/ListItemAuthorCt';
import Colors from '../../styles/colors';

type Props = {
  navigation: {navigate: Function};
};

const AuthorPage = ({navigation}: Props) => {
  const authors = [
    {
      id: 1,
      image: 'https://randomuser.me/api/portraits/men/10.jpg',
      name: 'John',
    },
    {
      id: 2,
      image: 'https://randomuser.me/api/portraits/men/89.jpg',
      name: 'Due',
    },
    {
      id: 3,
      image: 'https://randomuser.me/api/portraits/men/12.jpg',
      name: 'Alicent',
    },
    {
      id: 4,
      image: 'https://randomuser.me/api/portraits/men/82.jpg',
      name: 'Tigreal',
    },
    {
      id: 5,
      image: 'https://randomuser.me/api/portraits/men/77.jpg',
      name: 'Baltakost',
    },
  ];
  return (
    <View style={styles.container}>
      <HeaderAuthorComp onSearch={() => {}} />
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

export default AuthorPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
