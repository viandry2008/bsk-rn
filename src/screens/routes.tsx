// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import SplashScreen from './splashScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboard from './onboarding';
import Login from './auth/login';
// import Colors from '../styles/colors';
// import Font from '../styles/fonts';

const Stack = createNativeStackNavigator();
// const Tab = createMaterialBottomTabNavigator();

const MainNavigation = () => {
    return (
        <Stack.Navigator
        // initialRouteName={props.token !== null ? 'BerandaAgen' : 'Onboard'}
        >
            <Stack.Screen
                name="Onboard"
                component={Onboard}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>)
}

// Komponen Utama (Routes)
const Routes = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState(null);
    const [typeAkun, setTypeAkun] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(!isLoading);
        }, 3000);

        //   async function getToken() {
        //     const token = await AsyncStorage.getItem('api_token');
        //     const typeAkun = await AsyncStorage.getItem('type_akun');
        //     setToken(token);
        //     setTypeAkun(typeAkun);
        //   }
        //   getToken();
    }, []);

    if (isLoading) {
        return <SplashScreen />;
    }

    return (
        <NavigationContainer >
            <MainNavigation />
        </NavigationContainer>
    );
};

export default Routes;
