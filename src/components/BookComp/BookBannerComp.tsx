import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import DimensionStyle from '../../styles/DimensionStyle';
import Colors from '../../styles/colors';
import TextComp from '../TextComp';
import Spacing from '../spacing';
import Icon from '@react-native-vector-icons/fontawesome6';

type Props = {
  image: string;
  title: string;
  author: string;
  price: number;
  view: string;
};

const BookBannerComp = ({image, title, author, price, view}: Props) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: image}} style={styles.image} />
      <View style={styles.column}>
        <View>
          <TextComp
            type="medium"
            color={Colors.black}
            size={18}
            value={title}
          />
          <Spacing size={4} />
          <TextComp
            type="regular"
            color={Colors.placeholder}
            size={14}
            value={'By ' + author}
          />
        </View>
        <View style={[styles.rowcolumn, {justifyContent: 'space-between'}]}>
          <View
            style={[
              styles.cardprice,
              {
                backgroundColor:
                  price == 0 ? Colors.placeholder : Colors.primary,
              },
            ]}>
            <TextComp
              isPrice={price == 0 ? false : true}
              color={Colors.white}
              size={11}
              type={'medium'}
              value={price == 0 ? 'Free' : price.toString()}
            />
          </View>
          <View style={styles.rowcolumn}>
            <Icon
              name="eye"
              size={16}
              color={Colors.primary}
              iconStyle="solid"
            />
            <Spacing horizontal size={8} />
            <TextComp
              type="regular"
              color={Colors.placeholder}
              size={11}
              value={view}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default BookBannerComp;

const styles = StyleSheet.create({
  container: {
    width: DimensionStyle.dimensionWidth - 32,
    alignSelf: 'center',
    backgroundColor: Colors.lightPrimary,
    borderRadius: 16,
    marginVertical: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  image: {
    width: 140,
    height: 210,
    borderRadius: 16,
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginLeft: 16,
  },
  rowcolumn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardprice: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
});
