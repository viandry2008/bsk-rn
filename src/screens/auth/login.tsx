import React, {useState} from 'react';
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BtnCustom from '../../components/btnCustom';
import CustomFormInput from '../../components/customFormInput';
import Colors from '../../styles/colors';
// import { RadioButton } from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import LoadingComp from '../../components/LoadingComp';
import Spacing from '../../components/spacing';
import {ApplicationState, postLoginAction} from '../../store';
import DimensionStyle from '../../styles/DimensionStyle';
import {messageHelper} from '../../utils/helpers';

type Props = {
  loading?: boolean;
  navigation?: {navigate: Function};
};

const Login = ({
  loading = useSelector((state: ApplicationState) => state.authReducer.loading),
  navigation,
}: Props) => {
  const dispacth = useDispatch();

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

  const handleLogin = () => {
    if (form.email == '' || form.password == '') {
      messageHelper('Emal dan Password tidak boleh kosong!', 'danger');
    } else {
      let body = {
        email: form.email,
        password: form.password,
      };

      dispacth(postLoginAction(body, navigation) as any);
    }
  };

  return (
    <View style={styles.wrap}>
      <LoadingComp loading={loading} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 16,
            paddingVertical: 16,
            marginTop: DimensionStyle.dimensionHeight * 0.03,
          }}>
          <View style={styles.skipButton}>
            <BtnCustom
              title={'Skip'}
              onPress={() => navigation?.navigate('MainHome')}
              paddingVertical={8}
            />
          </View>
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Login in to continue</Text>

          <View style={{flex: 1, marginTop: 16}}>
            <CustomFormInput
              placholder={'Email'}
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
          <Spacing size={16} />

          {/* <View style={styles.rememberForgotRow}>
            <View style={styles.rememberMeContainer}>
              <RadioButton
                            status={rememberMe ? 'checked' : 'unchecked'}
                            onPress={() => setRememberMe(!rememberMe)}
                        />
              <Text>Remember me</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation?.navigate('ForgotPassword')}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View> */}

          <BtnCustom title={'LOG IN'} onPress={() => handleLogin()} />

          <View style={styles.policyContainer}>
            {/* <RadioButton status={'checked'} /> */}
            <Text>By Signing in you accept </Text>
            <TouchableOpacity onPress={() => navigation?.navigate('Privacy')}>
              <Text style={styles.policyText}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>

          {/* <Text style={styles.orText}>Or continue with</Text> */}

          {/* <TouchableOpacity style={styles.googleButton}>
            <Icon name="google" size={20} color={'white'} iconStyle="brand" />
            <Text style={styles.googleText}>Login with Google</Text>
          </TouchableOpacity> */}

          <View style={styles.signupContainer}>
            <Text>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  'https://ebook-bsk-staging.resone.my.id/id/register',
                )
              }>
              <Text style={styles.signupText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {flex: 1, backgroundColor: Colors.lightPrimary},
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
