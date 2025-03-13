import React from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import DimensionStyle from '../../styles/DimensionStyle';
import Colors from '../../styles/colors';
import TextComp from '../TextComp';
import Spacing from '../spacing';
import {Rating} from 'react-native-ratings';
import Icon from '@react-native-vector-icons/fontawesome6';
import CustomFormInput from '../customFormInput';
import BtnCustom from '../btnCustom';

type Props = {
  visible: boolean;
  onVisible: Function;
  onFinishRating: Function;
  comment: string;
  onChangeText: Function;
  onSave: Function;
};

const InputReviewComp = ({
  visible,
  onVisible,
  onFinishRating,
  comment,
  onChangeText,
  onSave,
}: Props) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {}}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TextComp
              type="semibold"
              color={Colors.black}
              size={16}
              value="Berikan Review Anda"
            />
            <Icon
              name="xmark"
              size={18}
              color={Colors.black}
              iconStyle="solid"
              onPress={() => onVisible()}
            />
          </View>
          <Spacing size={16} />
          <Rating
            type="star"
            ratingCount={5}
            imageSize={32}
            onFinishRating={(rating: any) => onFinishRating(rating)}
            startingValue={0}
          />
          <Spacing size={16} />
          <CustomFormInput
            placholder={'Masukan komen'}
            val={comment}
            change={(v: string) => onChangeText(v)}
          />
          <Spacing size={16} />
          <BtnCustom
            title="Tambah Review"
            onPress={() => onSave()}
            backgroundColor={Colors.primary}
          />
        </View>
      </View>
    </Modal>
  );
};

export default InputReviewComp;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000070',
  },
  modalView: {
    width: DimensionStyle.dimensionWidth - 32,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
