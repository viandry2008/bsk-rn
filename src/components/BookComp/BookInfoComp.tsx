import React from 'react';
import {StyleSheet, View} from 'react-native';
import Colors from '../../styles/colors';
import TextComp from '../TextComp';
import Spacing from '../spacing';

type Props = {
  desc: string;
};

const BookInfoComp = ({desc}: Props) => {
  return (
    <View style={styles.container}>
      <TextComp
        type="semibold"
        color={Colors.black}
        size={14}
        value="Deskripsi"
      />
      <Spacing size={4} />
      <TextComp
        type="regular"
        color={Colors.gray1}
        size={11}
        value={desc}
        isRender={true}
      />
    </View>
  );
};

export default BookInfoComp;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginVertical: 8,
  },
});
