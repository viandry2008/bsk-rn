import Icon from '@react-native-vector-icons/fontawesome6';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Rating} from 'react-native-ratings';
import Colors from '../../styles/colors';
import TextComp from '../TextComp';
import Spacing from '../spacing';

type Props = {
  onAll: Function;
  rating: any;
  review: any;
  onReview: Function;
};

const BookReviewComp = ({onAll, rating, review, onReview}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={{flex: 1}}>
          <TextComp
            type="semibold"
            color={Colors.black}
            size={14}
            value="Ratings & Reviews"
          />
        </View>
        <TouchableOpacity onPress={() => onAll()}>
          <Icon
            name="arrow-right"
            size={18}
            color={Colors.primary}
            iconStyle="solid"
          />
        </TouchableOpacity>
      </View>
      <Spacing size={8} />
      <View style={styles.row}>
        <TextComp
          type="regular"
          color={Colors.black}
          size={12}
          value={rating}
        />
        <Spacing horizontal size={8} />
        <Rating
          type="star"
          ratingCount={5}
          imageSize={18}
          readonly={true}
          startingValue={rating}
        />
        <Spacing horizontal size={8} />
        <TextComp
          type="regular"
          color={Colors.black}
          size={12}
          value={review + ' (Reviews)'}
        />
      </View>
      <Spacing size={16} />
      <TouchableOpacity onPress={() => onReview()} style={styles.btn}>
        <TextComp
          type="semibold"
          color={Colors.primary}
          size={11}
          value="Write a reviw"
        />
      </TouchableOpacity>
    </View>
  );
};

export default BookReviewComp;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 100,
    height: 40,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
