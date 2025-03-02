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
      onPress={() => onPress()}
      style={[
        styles.container,
        {
          width:
            type == 'row'
              ? DimensionStyle.dimensionWidth * 0.2
              : DimensionStyle.dimensionWidth * 0.28,
        },
      ]}>
      <Image
        source={{uri: item?.image}}
        style={[
          styles.image,
          {
            width: type == 'row' ? 70 : 100,
            height: type == 'row' ? 70 : 100,
            borderRadius: type == 'row' ? 70 : 100,
          },
        ]}
      />
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
    marginVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginBottom: 2,
  },
});
