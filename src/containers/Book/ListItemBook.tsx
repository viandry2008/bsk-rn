import Icon from '@react-native-vector-icons/fontawesome6';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import TextComp from '../../components/TextComp';
import Spacing from '../../components/spacing';
import DimensionStyle from '../../styles/DimensionStyle';
import Colors from '../../styles/colors';

type Props = {
  item: any;
  index: number;
  type: 'row' | 'column';
  onPress: Function;
};

const ListItemBook = ({item, index, type, onPress}: Props) => {
  return (
    <TouchableOpacity
      key={index}
      onPress={() => onPress()}
      style={[
        styles.container,
        {
          width:
            type == 'row'
              ? DimensionStyle.dimensionWidth * 0.35
              : DimensionStyle.dimensionWidth * 0.45,
          marginVertical: type == 'row' ? 4 : 8,
        },
      ]}>
      <Image
        source={{uri: item?.image}}
        style={[
          styles.image,
          {
            width:
              type == 'row'
                ? DimensionStyle.dimensionWidth * 0.35
                : DimensionStyle.dimensionWidth * 0.45,
            height: type == 'row' ? 210 : 260,
          },
        ]}
      />
      <View style={styles.content}>
        <TextComp
          type="semibold"
          color={Colors.gray1}
          size={14}
          value={item?.title}
        />
        <Spacing size={4} />
        <TextComp
          type="regular"
          color={Colors.placeholder}
          size={12}
          value={'by ' + item?.author}
        />
        <View style={styles.row}>
          <View style={styles.rowrating}>
            <Icon
              name="star"
              size={12}
              color={Colors.yellow}
              iconStyle="solid"
            />
            <Spacing horizontal size={8} />
            <TextComp
              type="regular"
              size={11}
              value={item?.rating}
              color={Colors.placeholder}
            />
          </View>
          <View
            style={[
              styles.cardprice,
              {
                backgroundColor:
                  item?.price == 0 ? Colors.placeholder : Colors.primary,
              },
            ]}>
            <TextComp
              isPrice={item?.price == 0 ? false : true}
              color={Colors.white}
              size={11}
              type={'medium'}
              value={item?.price == 0 ? 'Free' : item?.price}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListItemBook;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginHorizontal: 8,
    elevation: 1,
  },
  image: {
    borderRadius: 16,
  },
  content: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  rowrating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardprice: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
});
