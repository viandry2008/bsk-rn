import { StyleSheet, Text, View, SafeAreaView, StatusBar, Image } from 'react-native'
import React, { useState } from 'react'
import BtnCustom from '../../components/btnCustom'
import CustomFormInput from '../../components/customFormInput'
import Spacing from '../../components/spacing'
import Colors from '../../styles/colors'

const Login = ({ navigation }: any) => {
    const [form, setForm] = useState({
        role: '',
        username: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);

    const onInputChange = (value: string, input: string) => {
        setForm({
            ...form,
            [input]: value,
        });
    };

    return (
        <SafeAreaView style={styles.wrap}>
            {/* <Loading spinner={loading} /> */}
            <StatusBar
                backgroundColor="transparent"
                barStyle={'dark-content'}
                translucent
            />
            {/* <ScrollView showsVerticalScrollIndicator={false}> */}
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                {/* <Image
                    source={require('../../../assets/Images/title2.png')}
                    style={{ width: '50%', height: 70, resizeMode: 'contain' }}
                />
                <Spacing /> */}
                <View
                    style={{
                        backgroundColor: Colors.white,
                        borderRadius: 16,
                        padding: 16,
                        width: '80%',
                    }}>
                    <Text style={[{ textAlign: 'center' }]}>
                        Welcome Back!
                    </Text>
                    <View style={{ height: 16 }} />
                    <CustomFormInput
                        title='Username'
                    // placeholder="Input Username"
                    // backgroundColor={Colors.white}
                    // borderColor={Colors.container}
                    // leftIcon={
                    //     <Image
                    //         source={require('../../../assets/Icons/user.png')}
                    //         style={styles.size24}
                    //     />
                    // }
                    // value={form.username}
                    // onChangeText={value => onInputChange(value, 'username')}
                    />
                    <Spacing />
                    <CustomFormInput
                        title='Password'
                    // placeholder="Input Password"
                    // backgroundColor={Colors.white}
                    // borderColor={Colors.container}
                    // leftIcon={
                    //     <Image
                    //         source={require('../../../assets/Icons/lock.png')}
                    //         style={styles.size24}
                    //     />
                    // }
                    // value={form.password}
                    // onChangeText={value => onInputChange(value, 'password')}
                    // secureTextEntry
                    />
                    <Spacing />
                    <BtnCustom
                        title={'Login'}
                        onPress={() => {
                            // onSubmit();
                            // navigation.navigate('login')
                        }}
                    />
                </View>
            </View>
            {/* </ScrollView> */}
        </SafeAreaView>
    );
};

export default Login

const styles = StyleSheet.create({
    wrap: { flex: 1, backgroundColor: Colors.primary },
    size24: { width: 24, height: 24 },
    modalBtnList: {
        marginTop: 8,
        paddingVertical: 8,
        width: '100%',
        alignItems: 'center',
    },
});