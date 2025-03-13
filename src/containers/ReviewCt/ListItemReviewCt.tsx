import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../../styles/colors';
import TextComp from '../../components/TextComp';
import {Rating} from 'react-native-ratings';
import DimensionStyle from '../../styles/DimensionStyle';

type Props = {
  item: any;
};

const ListItemReviewCt = ({item}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={{flex: 1}}>
          <TextComp
            type="medium"
            size={12}
            color={Colors.black}
            value={item?.reviewer_name}
            numberOfLines={1}
          />
          <View style={{position: 'absolute', right: 0}}>
            <Rating
              type="star"
              ratingCount={5}
              imageSize={15}
              readonly={true}
              startingValue={item?.rating}
              style={{padding: 0, margin: 0}}
            />
          </View>
        </View>
      </View>
      <TextComp
        type="regular"
        color={Colors.placeholder}
        size={11}
        value={item?.comment}
      />
    </View>
  );
};

export default ListItemReviewCt;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: Colors.lightPrimary,
    borderRadius: 16,
    marginVertical: 8,
    width: DimensionStyle.dimensionWidth - 32,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
});
