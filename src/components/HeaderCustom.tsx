import Icon from '@react-native-vector-icons/fontawesome6';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Colors from '../styles/colors';
import TextComp from './TextComp';
import Spacing from './spacing';

type Props = {
  onBack?: any;
  title: string;
  onRight?: any;
  iconRight?: any;
};

const HeaderCustom = ({onBack, title, onRight, iconRight}: Props) => {
  return (
    <View style={styles.container}>
      {onBack == undefined ? null : (
        <TouchableOpacity onPress={() => onBack()}>
          <Icon
            name="arrow-left"
            size={18}
            color={Colors.black}
            iconStyle="solid"
          />
        </TouchableOpacity>
      )}
      <Spacing horizontal size={16} />
      <View style={{flex: 1}}>
        <TextComp
          type="semibold"
          color={Colors.black}
          size={14}
          value={title}
        />
      </View>
      {onRight == undefined ? null : (
        <TouchableOpacity onPress={() => onRight()}>
          <Icon
            name={iconRight}
            size={18}
            color={Colors.black}
            iconStyle="solid"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HeaderCustom;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    backgroundColor: Colors.white,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 32,
  },
});
