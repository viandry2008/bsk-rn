import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import Colors from '../../styles/colors';
import Icon from '@react-native-vector-icons/fontawesome6';
import TextComp from '../../components/TextComp';
import CustomFormInput from '../../components/customFormInput';
import BtnCustom from '../../components/btnCustom';

type Props = {
  navigation: { navigate: Function };
};

const EditProfile = ({ navigation }: Props) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const onInputChange = (value: string, input: string) => {
    setForm({
      ...form,
      [input]: value,
    });
  };

  return (
    <View style={styles.containerMain}>
      {/* Gambar Profil dengan Ikon Edit */}
      <View style={styles.profileContainer}>
        <Image
          source={{uri:"https://assets1.bmstatic.com/assets/books-covers/a3/dc/Qee8N5gZ-ipad.jpg?height=352"}}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editIcon}>
          <Icon name="pen" size={14} color={Colors.white} iconStyle="solid" />
        </TouchableOpacity>
      </View>

      {/* Nama & Email */}
      <View style={{alignItems:"center"}}>
        <TextComp type="bold" color={Colors.black} size={18} value="John Doe" />
        <TextComp type="regular" color={Colors.gray2} size={14} value="johndoe@example.com" />
      </View>

      {/* Form Input */}
      <CustomFormInput placholder="Name*" val={form.name} change={(text: string) => onInputChange(text, 'name')} />
      <CustomFormInput placholder="Email*" val={form.email} change={(text: string) => onInputChange(text, 'email')} />
      <CustomFormInput placholder="Password" val={form.password} change={(text: string) => onInputChange(text, 'password')} scureText />
      <CustomFormInput placholder="Phone" val={form.phone} change={(text: string) => onInputChange(text, 'phone')} />

      {/* Tombol Simpan */}
      <View style={{ marginVertical: 16 }}>
        <BtnCustom title="SAVE CHANGES" onPress={() => {}} />
      </View>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 16,
  },
  profileContainer: {
    width:100,
    height:100,
    // alignItems: 'center',
    alignSelf:'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: Colors.primary,
    padding: 6,
    borderRadius: 16,
  },
  textName: {
    marginTop: 8,
  },
  textEmail: {
    marginBottom: 16,
  },
});
