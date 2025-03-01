import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Colors from '../../styles/colors';
import TextComp from '../TextComp';
import Icon from '@react-native-vector-icons/fontawesome6';

type Props = {
  onPress: Function;
};

const HeaderHome = ({onPress}: Props) => {
  return (
    <View style={styles.container}>
      <TextComp
        type="semibold"
        color={Colors.black}
        size={24}
        value="Ebook App"
      />
      <TouchableOpacity onPress={() => onPress()} style={styles.button}>
        <Icon name="gear" size={18} color={Colors.gray1} iconStyle="solid" />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderHome;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 70,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: Colors.lightPrimary,
    width: 32,
    height: 32,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
