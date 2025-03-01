import Icon from '@react-native-vector-icons/fontawesome6';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Colors from '../../styles/colors';
import TextComp from '../TextComp';

type Props = {
  onSearch: Function;
};

const HaederCategoryComp = ({onSearch}: Props) => {
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <TextComp
          type="semibold"
          color={Colors.black}
          size={18}
          value="Categories"
        />
      </View>
      <TouchableOpacity onPress={() => onSearch()} style={styles.button}>
        <Icon
          name="magnifying-glass"
          size={18}
          color={Colors.gray1}
          iconStyle="solid"
        />
      </TouchableOpacity>
    </View>
  );
};

export default HaederCategoryComp;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 70,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  button: {
    width: 32,
    height: 32,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
