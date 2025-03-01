import Icon from '@react-native-vector-icons/fontawesome6';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import DimensionStyle from '../../styles/DimensionStyle';
import Colors from '../../styles/colors';
import TextComp from '../TextComp';

type Props = {
  onPress: Function;
};

const ButtonSearch = ({onPress}: Props) => {
  return (
    <TouchableOpacity onPress={() => onPress()} style={styles.container}>
      <TextComp
        type="regular"
        color={Colors.placeholder}
        size={12}
        value="Search book here..."
      />
      <Icon
        name="magnifying-glass"
        size={18}
        color={Colors.placeholder}
        iconStyle="solid"
      />
    </TouchableOpacity>
  );
};

export default ButtonSearch;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    width: DimensionStyle.dimensionWidth - 32,
    alignSelf: 'center',
    backgroundColor: Colors.container,
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
