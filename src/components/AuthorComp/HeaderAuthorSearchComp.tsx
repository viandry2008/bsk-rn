import Icon from '@react-native-vector-icons/fontawesome6';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Colors from '../../styles/colors';
import CustomFormInput from '../customFormInput';

type Props = {
  search: string;
  onSearch: Function;
  onSubmitEditing: Function;
  onBack: Function;
};

const HeaderAuthorSearchComp = ({
  search,
  onSearch,
  onSubmitEditing,
  onBack,
}: Props) => {
  return (
    <View style={styles.container}>
      <Icon
        name="arrow-left"
        size={24}
        iconStyle="solid"
        onPress={() => onBack()}
        style={{marginRight: 16, marginTop: 10}}
      />
      <View style={{flex: 1}}>
        <CustomFormInput
          placholder={'Cari author'}
          val={search}
          change={(v: string) => onSearch(v)}
          onSubmitEditing={() => onSubmitEditing()}
        />
      </View>
    </View>
  );
};

export default HeaderAuthorSearchComp;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 32,
    height: 100,
    backgroundColor: Colors.white,
    elevation: 2,
  },
});
