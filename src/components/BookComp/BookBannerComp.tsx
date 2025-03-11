import Icon from '@react-native-vector-icons/fontawesome6';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import DimensionStyle from '../../styles/DimensionStyle';
import Colors from '../../styles/colors';
import TextComp from '../TextComp';
import Spacing from '../spacing';

type Props = {
  image: any;
  title: string;
  author: string;
  year: string;
  view: string;
};

const BookBannerComp = ({image, title, author, year, view}: Props) => {
  return (
    <View style={styles.container}>
      {image?.map((item: any) => {
        if (item?.rel == 'cover') {
          return <Image source={{uri: item?.href}} style={styles.image} />;
        }
      })}
      <View style={styles.column}>
        <View>
          <TextComp
            type="medium"
            color={Colors.black}
            size={18}
            value={title}
          />
          <Spacing size={4} />
          {author == null ? null : (
            <TextComp
              type="regular"
              color={Colors.placeholder}
              size={14}
              value={'Oleh ' + author}
            />
          )}
        </View>
        <View style={[styles.rowcolumn, {justifyContent: 'space-between'}]}>
          <View
            style={[
              styles.cardprice,
              {
                backgroundColor: Colors.primary,
              },
            ]}>
            <TextComp
              color={Colors.white}
              size={11}
              type={'medium'}
              value={year}
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
