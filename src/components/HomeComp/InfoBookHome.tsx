import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import DimensionStyle from '../../styles/DimensionStyle';
import Colors from '../../styles/colors';
import TextComp from '../TextComp';
import BtnCustom from '../btnCustom';
import Spacing from '../spacing';

type Props = {
  image: string;
  title: string;
  author: string;
  onPress: Function;
};

const InfoBookHome = ({image, title, author, onPress}: Props) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: image,
        }}
        style={styles.image}
        borderRadius={16}
      />
      <View style={{flex: 1, marginLeft: 16}}>
        <TextComp type="bold" color={Colors.black} size={18} value={title} />
        <Spacing size={4} />
        <TextComp
          type="semibold"
          color={Colors.primary}
          size={16}
          value={'By ' + author}
        />
        <Spacing size={8} />
        <BtnCustom
          backgroundColor={Colors.primary}
          title="Explore Now"
          textColor={Colors.white}
          fontSize={RFValue(12)}
          onPress={() => onPress()}
        />
      </View>
    </View>
  );
};

export default InfoBookHome;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    width: DimensionStyle.dimensionWidth - 32,
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: Colors.lightPrimary,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 130,
    height: 170,
    borderRadius: 16,
  },
});
