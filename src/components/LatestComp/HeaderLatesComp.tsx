import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Colors from '../../styles/colors';
import TextComp from '../TextComp';
import Icon from '@react-native-vector-icons/fontawesome6';
import Spacing from '../spacing';

type Props = {
  onSearch: Function;
  onMenu: Function;
};

const HeaderLatesComp = ({onSearch, onMenu}: Props) => {
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <TextComp
          type="semibold"
          color={Colors.black}
          size={18}
          value="Latest"
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
      <Spacing horizontal size={8} />
      <TouchableOpacity onPress={() => onMenu} style={styles.button}>
        <Icon name="bars" size={18} color={Colors.gray1} iconStyle="solid" />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderLatesComp;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  button: {
    width: 32,
    height: 32,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
