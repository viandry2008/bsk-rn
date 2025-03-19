import Icon from '@react-native-vector-icons/fontawesome6';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import DimensionStyle from '../../styles/DimensionStyle';
import Colors from '../../styles/colors';
import TextComp from '../TextComp';

type Props = {
  onFavorite: Function;
  onRead: Function;
  onReport: Function;
};

const BookButtonActionComp = ({onFavorite, onRead, onReport}: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onFavorite()} style={styles.card}>
        <Icon name="heart" size={24} color={Colors.black} iconStyle="regular" />
        <TextComp
          type="regular"
          color={Colors.gray2}
          size={11}
          value="Favorit"
        />
      </TouchableOpacity>
      <View style={styles.line} />
      <TouchableOpacity onPress={() => onRead()} style={styles.card}>
        <Icon
          name="book-open-reader"
          size={24}
          color={Colors.black}
          iconStyle="solid"
        />
        <TextComp type="regular" color={Colors.gray2} size={11} value="Baca" />
      </TouchableOpacity>
      {/* <View style={styles.line} />
      <TouchableOpacity onPress={() => onReport()} style={styles.card}>
        <Icon
          name="circle-exclamation"
          size={24}
          color={Colors.black}
          iconStyle="solid"
        />
        <TextComp
          type="regular"
          color={Colors.gray2}
          size={11}
          value="Report"
        />
      </TouchableOpacity> */}
    </View>
  );
};

export default BookButtonActionComp;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.placeholder,
    width: DimensionStyle.dimensionWidth - 32,
    alignSelf: 'center',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
  },
  card: {
    width: 50,
    height: 50,
    // backgroundColor: Colors.successContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    height: 50,
    width: 1,
    backgroundColor: Colors.placeholder,
  },
});
