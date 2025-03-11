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

const ListItemBookCt = ({item, index, type, onPress}: Props) => {
  return (
    <TouchableOpacity
      key={index}
      onPress={() => onPress(item)}
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
      {item?.resources?.map((item: any) => {
        if (item?.rel == 'cover') {
          return (
            <Image
              source={{uri: item?.href}}
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
          );
        }
      })}
      <View style={styles.content}>
        <TextComp
          type="semibold"
          color={Colors.gray1}
          size={14}
          value={item?.metadata?.title}
          numberOfLines={3}
        />
        <Spacing size={4} />
        <TextComp
          type="regular"
          color={Colors.placeholder}
          size={12}
          value={'Oleh ' + item?.metadata?.author}
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
              value={item?.metadata?.rating}
              color={Colors.placeholder}
            />
          </View>
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
              value={item?.metadata?.['tahun terbit']}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListItemBookCt;

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
