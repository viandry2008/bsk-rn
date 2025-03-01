import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../../styles/colors';
import HaederCategoryComp from '../../components/CategoryComp/HeaderCategoryComp';
import ListItemCategoryCt from '../../containers/CategoryCt/ListItemCategoryCt';

const CategoryPage = () => {
  const data = [
    {
      id: 1,
      title: 'Adventure',
      image:
        'https://fastly.picsum.photos/id/521/300/200.jpg?hmac=7afxWeC46WTzLykjvp38m6TXkqbJLvK8Hl_xYFYH7Hc',
    },
    {
      id: 2,
      title: 'Art & Photography',
      image:
        'https://fastly.picsum.photos/id/434/300/200.jpg?hmac=d_lsZvugLf5FBhJEHlA5W64vrusUmH_xFFt8zruga-E',
    },
    {
      id: 3,
      title: 'Biographies',
      image:
        'https://fastly.picsum.photos/id/130/300/200.jpg?hmac=JR5S7INkCpKPlC-wbuqF3U7zlZHwunJmKx4Q5IqbMfY',
    },
    {
      id: 4,
      title: 'Comedy',
      image:
        'https://fastly.picsum.photos/id/926/300/200.jpg?hmac=iIRDaWPlwjd-Baax-jLh-dwiOutfZYo5-skc-13pUIw',
    },
    {
      id: 5,
      title: 'Computer & Techs',
      image:
        'https://fastly.picsum.photos/id/755/300/200.jpg?hmac=VQgQ3e990R3mS00L7ezUKbK9wqmH4RDbK-_NARSvNaY',
    },
    {
      id: 6,
      title: 'Romance',
      image:
        'https://fastly.picsum.photos/id/846/300/200.jpg?hmac=6r8o1I6t8lwnAIKIKrcjBMLdig9RQCno8P8iYSwL4I4',
    },
    {
      id: 7,
      title: 'Mysteri',
      image:
        'https://fastly.picsum.photos/id/403/300/200.jpg?hmac=ssolG_wdQoIwOLka7GzEY9Iu164KIFFjK1uznx9-6mw',
    },
  ];

  return (
    <View style={styles.container}>
      <HaederCategoryComp onSearch={() => {}} />
      <FlatList
        data={data}
        renderItem={({item, index}) => (
          <ListItemCategoryCt item={item} index={index} onPress={() => {}} />
        )}
        keyExtractor={(item: any) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 3}}
      />
    </View>
  );
};

export default CategoryPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
