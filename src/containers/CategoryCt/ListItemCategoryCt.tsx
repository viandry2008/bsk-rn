import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import TextComp from '../../components/TextComp';
import DimensionStyle from '../../styles/DimensionStyle';
import Colors from '../../styles/colors';

type Props = {
  item: any;
  onPress: Function;
  index: number;
};

const ListItemCategoryCt = ({item, onPress, index}: Props) => {
  return (
    <TouchableOpacity
      key={index}
      onPress={() => onPress()}
      style={styles.container}>
      <Image source={{uri: item?.thumbnail}} style={styles.image} />
      <View style={styles.bg} />
      <View style={{position: 'absolute', bottom: 8, left: 8, right: 8}}>
        <TextComp
          type="semibold"
          color={Colors.white}
          size={14}
          value={item?.text}
          numberOfLines={1}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ListItemCategoryCt;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginHorizontal: 8,
    width: DimensionStyle.dimensionWidth * 0.45,
  },
  image: {
    width: DimensionStyle.dimensionWidth * 0.45,
    height: 130,
    borderRadius: 16,
    resizeMode: 'contain',
  },
  bg: {
    width: DimensionStyle.dimensionWidth * 0.45,
    height: 130,
    borderRadius: 16,
    backgroundColor: Colors.black,
    position: 'absolute',
    opacity: 0.5,
  },
});
