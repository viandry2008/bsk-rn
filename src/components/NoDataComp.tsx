import React from 'react';
import {View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import TextComp from './TextComp';

const NoDataComp = () => {
  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingVertical: 16,
        alignItems: 'center',
      }}>
      <TextComp
        type="semibold"
        color={Colors.black}
        size={14}
        value="Data Belum Tersedia"
      />
    </View>
  );
};

export default NoDataComp;
