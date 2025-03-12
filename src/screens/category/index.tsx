import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import HaederCategoryComp from '../../components/CategoryComp/HeaderCategoryComp';
import ListItemCategoryCt from '../../containers/CategoryCt/ListItemCategoryCt';
import {
  ApplicationState,
  getBooksByCategoryAction,
  getCategoriesAction,
} from '../../store';
import Colors from '../../styles/colors';
import NoDataComp from '../../components/NoDataComp';

type Props = {
  categories: any;
  navigation: {navigate: Function};
};

const CategoryPage = ({
  categories = useSelector(
    (state: ApplicationState) => state.categoryReducer.categories,
  ),
  navigation,
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
          <ListItemCategoryCt
            item={item}
            index={index}
            onPress={(params: any) =>
              dispatch(getBooksByCategoryAction(params, 1, navigation) as any)
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

export default CategoryPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
