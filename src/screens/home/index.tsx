import React from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import ButtonSearch from '../../components/HomeComp/ButtonSearch';
import HeaderHome from '../../components/HomeComp/HeaderHome';
import InfoBookHome from '../../components/HomeComp/InfoBookHome';
import Colors from '../../styles/colors';
import TitleSectionHome from '../../components/HomeComp/TitleSectionHome';
import ListItemBookCt from '../../containers/BookCt/ListItemBookCt';
import ListItemAuthorCt from '../../containers/AuthorCt/ListItemAuthorCt';

const HomePage = () => {
  const books = [
    {
      id: 1,
      image:
        'https://assets1.bmstatic.com/assets/books-covers/98/be/tUOBGULx-ipad.jpg?height=352',
      title: 'i am Malala',
      author: 'Malala Yousafzai',
      rating: 4,
      price: 0,
    },
    {
      id: 2,
      image:
        'https://assets1.bmstatic.com/assets/books-covers/e4/40/hpCPjcnN-ipad.jpg?height=352',
      title: 'Kreativitas Tanpa Batas',
      author: 'Tim Kick Andy',
      rating: 5,
      price: 10000,
    },
    {
      id: 3,
      image:
        'https://assets1.bmstatic.com/assets/books-covers/c4/80/sJPnaHJP-ipad.jpg?height=352',
      title: 'Catatan Indah untuk Tuhan',
      author: 'Saptuari Sugiharto',
      rating: 4,
      price: 11000,
    },
  ];

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
      <HeaderHome onPress={() => {}} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ButtonSearch onPress={() => {}} />
        <InfoBookHome
          image="https://assets1.bmstatic.com/assets/books-covers/a3/dc/Qee8N5gZ-ipad.jpg?height=352"
          title="Lorem ipsum Dolor is Amet"
          author="User"
          onPress={() => {}}
        />
        <TitleSectionHome title="Trending Books" onPress={() => {}} />
        <FlatList
          data={books}
          renderItem={({item, index}) => (
            <ListItemBookCt item={item} index={index} type="row" />
          )}
          keyExtractor={(item: any) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 8}}
        />
        <TitleSectionHome title="Best Authors" onPress={() => {}} />
        <FlatList
          data={authors}
          renderItem={({item, index}) => (
            <ListItemAuthorCt item={item} index={index} onPress={() => {}} />
          )}
          keyExtractor={(item: any) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 8}}
        />
        <TitleSectionHome title="Popular Books" onPress={() => {}} />
        <FlatList
          data={books}
          renderItem={({item, index}) => (
            <ListItemBookCt item={item} index={index} type="row" />
          )}
          keyExtractor={(item: any) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 8}}
        />
      </ScrollView>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
