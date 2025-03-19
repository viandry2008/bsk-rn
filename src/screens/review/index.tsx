import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import HeaderCustom from '../../components/HeaderCustom';
import {ApplicationState, getReviewsAction} from '../../store';
import Colors from '../../styles/colors';
import {getDataLoginHelper} from '../../utils/helpers';
import {FlatList} from 'react-native-gesture-handler';
import NoDataComp from '../../components/NoDataComp';
import ListItemReviewCt from '../../containers/ReviewCt/ListItemReviewCt';

type Props = {
  navigation: {goBack: Function};
  route: any;
  reviews: any;
};

const ReviewPage = ({
  navigation,
  route,
  reviews = useSelector(
    (state: ApplicationState) => state.reviewReducer.reviews,
  ),
}: Props) => {
  const dispacth = useDispatch();

  useEffect(() => {
    const fetching = async () => {
      let user = await getDataLoginHelper();
      // dispacth(getReviewsAction(user?.token, route?.params?.bookId) as any);
    };

    fetching();
  }, []);

  return (
    <View style={styles.container}>
      <HeaderCustom title="Review" onBack={() => navigation.goBack()} />
      <FlatList
        data={reviews}
        renderItem={({item, index}) => <ListItemReviewCt item={item} />}
        keyExtractor={(item: any) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingVertical: 16}}
        ListEmptyComponent={() => {
          return <NoDataComp />;
        }}
      />
    </View>
  );
};

export default ReviewPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
