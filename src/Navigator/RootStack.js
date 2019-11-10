import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import HomeScreen from '../Home/HomeScreen.js';
import AddScreen from '../Add/AddScreen.js';
import EditScreen from '../Edit/EditScreen.js';
import ListItems from '../Home/component/ListItems.js';
const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Add: AddScreen,
    Edit: EditScreen,
    List: ListItems,
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#1e88e5',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);
export default createAppContainer(RootStack);
