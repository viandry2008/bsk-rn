import Icon from '@react-native-vector-icons/fontawesome6';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View} from 'react-native';
import Colors from '../styles/colors';
import AuthorPage from './author';
import CategoryPage from './category';
import HomePage from './home';
import LatestPage from './latest';
import ProfilePage from './profile';

// const tab
const Tab = createBottomTabNavigator();

const MainTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}: any) => ({
        tabBarIcon: ({focused}: any) => {
          let iconName: any;
          let iconColor: any;

          if (route.name === 'Home') {
            iconName = 'house';
            iconColor = focused ? Colors.primary : Colors.placeholder;
          } else if (route.name === 'Latest') {
            iconName = 'book-open';
            iconColor = focused ? Colors.primary : Colors.placeholder;
          } else if (route.name === 'Category') {
            iconName = 'grip';
            iconColor = focused ? Colors.primary : Colors.placeholder;
          } else if (route.name === 'Author') {
            iconName = 'user-group';
            iconColor = focused ? Colors.primary : Colors.placeholder;
          } else if (route.name === 'Profile') {
            iconName = 'user';
            iconColor = focused ? Colors.primary : Colors.placeholder;
          }

          return (
            <View style={{marginBottom: 4}}>
              <Icon
                name={iconName}
                size={18}
                iconStyle="solid"
                color={iconColor}
              />
            </View>
          );
        },
        tabBarShowLabel: true,
        tabBarStyle: {
          height: 70,
          backgroundColor: Colors.white,
          paddingTop: 8,
        },
        tabBarActiveTintColor: Colors.primary,
      })}>
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Latest"
        component={LatestPage}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Category"
        component={CategoryPage}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Author"
        component={AuthorPage}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigation;
