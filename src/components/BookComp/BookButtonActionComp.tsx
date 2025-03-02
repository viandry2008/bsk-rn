import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Colors from '../../styles/colors';
import DimensionStyle from '../../styles/DimensionStyle';
import Icon from '@react-native-vector-icons/fontawesome6';
import TextComp from '../TextComp';

type Props = {
  onFavorite: Function;
  onDownload: Function;
  onRead: Function;
  onReport: Function;
};

const BookButtonActionComp = ({
  onFavorite,
  onDownload,
  onRead,
  onReport,
}: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card}>
        <Icon name="heart" size={24} color={Colors.black} iconStyle="regular" />
        <TextComp
          type="regular"
          color={Colors.gray2}
          size={11}
          value="Favorit"
        />
      </TouchableOpacity>
      <View style={styles.line} />
      <TouchableOpacity style={styles.card}>
        <Icon
          name="download"
          size={24}
          color={Colors.black}
          iconStyle="solid"
        />
        <TextComp
          type="regular"
          color={Colors.gray2}
          size={11}
          value="Download"
        />
      </TouchableOpacity>
      <View style={styles.line} />
      <TouchableOpacity style={styles.card}>
        <Icon
          name="book-open-reader"
          size={24}
          color={Colors.black}
          iconStyle="solid"
        />
        <TextComp type="regular" color={Colors.gray2} size={11} value="Baca" />
      </TouchableOpacity>
      <View style={styles.line} />
      <TouchableOpacity style={styles.card}>
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
      </TouchableOpacity>
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
    justifyContent: 'space-between',
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
