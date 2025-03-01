import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import TextComp from '../../components/TextComp';
import DimensionStyle from '../../styles/DimensionStyle';
import Colors from '../../styles/colors';

type Props = {
  item: any;
  onPress: Function;
  index: number;
};

const ListItemAuthorCt = ({item, onPress, index}: Props) => {
  return (
    <TouchableOpacity
      key={index}
      onPress={() => onPress}
      style={styles.container}>
      <Image source={{uri: item?.image}} style={styles.image} />
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
    width: DimensionStyle.dimensionWidth * 0.2,
    paddingVertical: 8,
    marginHorizontal: 8,
    marginVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 70,
    marginBottom: 2,
  },
});
