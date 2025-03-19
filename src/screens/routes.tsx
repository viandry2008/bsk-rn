// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import SplashScreen from './splashScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Onboard from './onboarding';
import Login from './auth/login';
import MainTabNavigation from './MainTabNavigation';
import Register from './auth/register';
import ForgotPassword from './auth/ForgotPassword';
import Privacy from './auth/Privacy';
import BookDetailPage from './book/BookDetailPage';
import AuthorDetailPage from './author/AuthorDetailPage';
import MyFav from './profile/MyFav';
import EditProfile from './profile/EditProfile';
import {getDataLoginHelper} from '../utils/helpers';
import AuthorSearchPage from './author/AuthorSearchPage';
import BookCategoryPage from './book/BookCategoryPage';
import BookSearchPage from './book/BookSearchPage';
import ReviewPage from './review';
import BookPdfPage from './book/BookPdfPage';
// import Colors from '../styles/colors';
// import Font from '../styles/fonts';

const Stack = createNativeStackNavigator();
// const Tab = createMaterialBottomTabNavigator();

const MainNavigation = (props: any) => {
  return (
    <Stack.Navigator
      initialRouteName={props.token !== null ? 'MainHome' : 'Onboard'}>
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
      <Stack.Screen name="Register" component={Register} />
      {/* main home */}
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />

      <Stack.Screen
        name="MainHome"
        component={MainTabNavigation}
        options={{
          headerShown: false,
        }}
      />

      {/* book */}
      <Stack.Screen
        name="BookDetail"
        component={BookDetailPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BookCategory"
        component={BookCategoryPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BookSearch"
        component={BookSearchPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BookPdf"
        component={BookPdfPage}
        options={{
          headerShown: false,
        }}
      />

      {/* author */}
      <Stack.Screen
        name="AuthorDetail"
        component={AuthorDetailPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AuthorSearch"
        component={AuthorSearchPage}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="MyFav"
        component={MyFav}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        // options={{
        //   headerShown: false,
        // }}
      />

      {/* review */}
      <Stack.Screen
        name="Review"
        component={ReviewPage}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen name="Privacy" component={Privacy} />
    </Stack.Navigator>
  );
};

// Komponen Utama (Routes)
const Routes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<any>(null);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(!isLoading);
    }, 3000);

    const fetching = async () => {
      let user = await getDataLoginHelper();
      setToken(user?.token);
    };

    fetching();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <MainNavigation token={token} />
    </NavigationContainer>
  );
};

export default Routes;
