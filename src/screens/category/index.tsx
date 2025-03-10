import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import HaederCategoryComp from '../../components/CategoryComp/HeaderCategoryComp';
import ListItemCategoryCt from '../../containers/CategoryCt/ListItemCategoryCt';
import {ApplicationState, getCategoriesAction} from '../../store';
import Colors from '../../styles/colors';

type Props = {
  categories: any;
};

const CategoryPage = ({
  categories = useSelector(
    (state: ApplicationState) => state.categoryReducer.categories,
  ),
}: Props) => {
  const dispatch = useDispatch();
  const [statusSearch, setStatusSearch] = useState(false);

  useEffect(() => {
    const fetching = async () => {
      dispatch(getCategoriesAction() as any);
    };

    fetching();
  }, []);

  return (
    <View style={styles.container}>
      <HaederCategoryComp
        onSearch={() => setStatusSearch(true)}
        statusSearch={statusSearch}
        onLeft={() => setStatusSearch(false)}
      />
      <FlatList
        data={categories}
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
