import Icon from '@react-native-vector-icons/fontawesome6';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Colors from '../../styles/colors';
import TextComp from '../TextComp';
import CustomFormInput from '../customFormInput';
import DimensionStyle from '../../styles/DimensionStyle';

type Props = {
  onSearch: Function;
  statusSearch: boolean;
  onLeft: Function;
};

const HaederCategoryComp = ({onSearch, statusSearch, onLeft}: Props) => {
  return (
    <View style={styles.container}>
      <TextComp
        type="semibold"
        color={Colors.black}
        size={18}
        value="Kategori"
      />
      {/* {statusSearch == false ? (
        <View style={{flex: 1}}>
          <TextComp
            type="semibold"
            color={Colors.black}
            size={18}
            value="Categories"
          />
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => onLeft()}
          style={{marginRight: 16, marginTop: 8}}>
          <Icon
            name="arrow-left"
            size={18}
            color={Colors.black}
            iconStyle="solid"
          />
        </TouchableOpacity>
      )}
      {statusSearch == false ? (
        <TouchableOpacity onPress={() => onSearch()} style={styles.button}>
          <Icon
            name="magnifying-glass"
            size={18}
            color={Colors.gray1}
            iconStyle="solid"
          />
        </TouchableOpacity>
      ) : (
        <View style={{width: '90%'}}>
          <CustomFormInput
            placholder={'Cari kategori'}
            val={''}
            change={(text: string) => {}}
          />
        </View>
      )} */}
    </View>
  );
};

export default HaederCategoryComp;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    elevation: 2,
    paddingTop: DimensionStyle.dimensionHeight * 0.05,
  },
  button: {
    width: 32,
    height: 32,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
