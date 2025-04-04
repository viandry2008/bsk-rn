import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import TextComp from '../../components/TextComp';
import DimensionStyle from '../../styles/DimensionStyle';
import Colors from '../../styles/colors';

type Props = {
  item: any;
  onPress: Function;
  index: number;
  type: 'row' | 'column';
};

const ListItemAuthorCt = ({item, onPress, index, type}: Props) => {
  return (
    <TouchableOpacity
      key={index}
      onPress={() => onPress(item)}
      style={[
        styles.container,
        {
          marginVertical: type == 'row' ? 4 : 8,
          width:
            type == 'row'
              ? DimensionStyle.dimensionWidth * 0.2
              : DimensionStyle.dimensionWidth * 0.28,
        },
      ]}>
      {item?.thumbnail == null ? (
        <Image
          source={{
            uri: 'https://fakeimg.pl/120x120?text=not+found',
          }}
          style={[
            styles.image,
            {
              width: type == 'row' ? 70 : 120,
              height: type == 'row' ? 70 : 120,
              borderRadius: type == 'row' ? 70 : 120,
            },
          ]}
        />
      ) : (
        <Image
          source={{
            uri: item?.thumbnail,
          }}
          style={[
            styles.image,
            {
              width: type == 'row' ? 70 : 120,
              height: type == 'row' ? 70 : 120,
              borderRadius: type == 'row' ? 70 : 120,
            },
          ]}
        />
      )}
      <TextComp
        type="semibold"
        color={Colors.black}
        size={12}
        value={item?.name}
        textAlign="center"
        numberOfLines={1}
      />
    </TouchableOpacity>
  );
};

export default ListItemAuthorCt;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginBottom: 4,
  },
});
