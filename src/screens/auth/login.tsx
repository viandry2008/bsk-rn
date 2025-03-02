import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import BtnCustom from '../../components/btnCustom';
import CustomFormInput from '../../components/customFormInput';
import Spacing from '../../components/spacing';
import Colors from '../../styles/colors';
// import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const Login = ({navigation}: any) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);

  const onInputChange = (value: string, input: string) => {
    setForm({
      ...form,
      [input]: value,
    });
  };

  return (
    <SafeAreaView style={styles.wrap}>
      <StatusBar
        backgroundColor="transparent"
        barStyle={'dark-content'}
        translucent
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flex: 1}}>
          <View style={styles.skipButton}>
            <BtnCustom title={'Skip'} onPress={() => {}} paddingVertical={8} />
          </View>
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Login in to continue</Text>

          <View style={{flex: 1, marginTop: 50}}>
            <CustomFormInput
              placholder={'Email*'}
              val={form.email}
              change={(text: string) => onInputChange(text, 'email')}
            />
            <CustomFormInput
              placholder={'Password'}
              val={form.password}
              change={(text: string) => onInputChange(text, 'password')}
              scureText
            />
          </View>

          <View style={styles.rememberForgotRow}>
            <View style={styles.rememberMeContainer}>
              {/* <RadioButton
                            status={rememberMe ? 'checked' : 'unchecked'}
                            onPress={() => setRememberMe(!rememberMe)}
                        /> */}
              <Text>Remember me</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <BtnCustom title={'LOG IN'} onPress={() => navigation.navigate('MainHome')} />

          <View style={styles.policyContainer}>
            {/* <RadioButton status={'checked'} /> */}
            <Text>By Signing in you accept </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Privacy')}>
              <Text style={styles.policyText}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.orText}>Or continue with</Text>

          <TouchableOpacity style={styles.googleButton}>
            {/* <Icon name="google" size={20} color={'white'} /> */}
            <Text style={styles.googleText}>Login with Google</Text>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.signupText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrap: {flex: 1, backgroundColor: Colors.lightPrimary, padding: 16},
  skipButton: {alignSelf: 'flex-end'},
  title: {fontSize: 24, fontWeight: 'bold', marginTop: 16},
  subtitle: {fontSize: 16, color: 'gray', marginBottom: 16},
  rememberForgotRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 16,
  },
  rememberMeContainer: {flexDirection: 'row', alignItems: 'center'},
  forgotText: {color: Colors.gray3, fontWeight: 'bold'},
  policyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    alignSelf: 'center',
  },
  policyText: {color: Colors.gray3, fontWeight: 'bold'},
  orText: {
    marginVertical: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 30,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginVertical: 16,
  },
  googleText: {color: 'white', marginLeft: 10},
  signupContainer: {flexDirection: 'row', marginTop: 16, alignSelf: 'center'},
  signupText: {color: Colors.gray3, fontWeight: 'bold'},
});

export default Login;
