import Icon from '@react-native-vector-icons/fontawesome6';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import DimensionStyle from '../../styles/DimensionStyle';
import Colors from '../../styles/colors';
import TextComp from '../TextComp';

type Props = {
  title: string;
  onPress?: any;
};

const TitleSectionHome = ({title, onPress}: Props) => {
  return (
    <View style={styles.container}>
      <TextComp type="semibold" color={Colors.black} size={16} value={title} />
      {onPress == undefined ? null : (
        <TouchableOpacity onPress={() => onPress()}>
          <Icon
            name="arrow-right"
            color={Colors.primary}
            size={16}
            iconStyle="solid"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TitleSectionHome;

const styles = StyleSheet.create({
  container: {
    width: DimensionStyle.dimensionWidth - 32,
    alignSelf: 'center',
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
