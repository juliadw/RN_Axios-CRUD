import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from '../Home/HomeScreen';
import AddScreen from '../Add/AddScreen';
import EditScreen from '../Edit/EditScreen';
import DetailScreen from '../Detail/DetailScreen';
import LoginScreen from '../Login/LoginScreen';

export const LoginStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
  },
});

export const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Add: {
      screen: AddScreen,
    },
    Edit: {
      screen: EditScreen,
    },
    Detail: {
      screen: DetailScreen,
    },
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#1e88e5',
      },
      headerTintColor: '#6807f9',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);
