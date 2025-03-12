import Icon from '@react-native-vector-icons/fontawesome6';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import DimensionStyle from '../../styles/DimensionStyle';
import Colors from '../../styles/colors';
import TextComp from '../TextComp';
import Spacing from '../spacing';

type Props = {
  image: string;
  name: string;
  desc: string;
};

const CardInfoAuthorComp = ({image, name, desc}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {image == null ? (
          <Image
            source={{uri: 'https://fakeimg.pl/70x70?text=not+found'}}
            style={styles.image}
          />
        ) : (
          <Image source={{uri: image}} style={styles.image} />
        )}
        <View style={{flex: 1}}>
          <TextComp
            type="semibold"
            color={Colors.black}
            size={14}
            value={name}
          />
          <Spacing size={8} />
          {/* <View style={styles.row}>
            <Icon
              name="youtube"
              size={18}
              color={Colors.black}
              iconStyle="brand"
              onPress={() => {}}
              style={{marginRight: 10}}
            />
            <Icon
              name="facebook"
              size={18}
              color={Colors.black}
              iconStyle="brand"
              onPress={() => {}}
              style={{marginRight: 10}}
            />
            <Icon
              name="twitter"
              size={18}
              color={Colors.black}
              iconStyle="brand"
              onPress={() => {}}
              style={{marginRight: 10}}
            />
            <Icon
              name="instagram"
              size={18}
              color={Colors.black}
              iconStyle="brand"
              onPress={() => {}}
              style={{marginRight: 10}}
            />
          </View> */}
        </View>
      </View>
      <Spacing size={8} />
      <TextComp
        type="regular"
        color={Colors.placeholder}
        size={12}
        value={desc}
      />
    </View>
  );
};

export default CardInfoAuthorComp;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginVertical: 8,
    backgroundColor: Colors.lightPrimary,
    width: DimensionStyle.dimensionWidth - 32,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 70,
    marginRight: 8,
  },
});
