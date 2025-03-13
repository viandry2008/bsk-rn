import React from 'react';
import {StyleSheet, View} from 'react-native';
import Colors from '../../styles/colors';
import TextComp from '../TextComp';

const HeaderHome = () => {
  return (
    <View style={styles.container}>
      <TextComp
        type="semibold"
        color={Colors.black}
        size={24}
        value="Ebook App"
      />
    </View>
  );
};

export default HeaderHome;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 32,
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
