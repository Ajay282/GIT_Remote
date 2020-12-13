import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { Login } from 'src/ui/screens/login-screen';
import { Home } from 'src/ui/screens/home-screen';
import { store } from 'src/store';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Customers } from 'src/ui/screens/customers-screen';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeMenu = () => {
  return <Tab.Navigator
    tabBarOptions={{
      activeTintColor: 'orange',
      inactiveTintColor: 'white',
      tabStyle: {
        justifyContent:"center"
      },
      labelStyle:{
        fontSize: 18,
        fontWeight:"600"
      },
      style: {
        backgroundColor: "rgba(0,0,0, 0.9)"
      }
    }}
  >
    <Tab.Screen name="Notes" component={Home} />
    <Tab.Screen name="Customers" component={Customers} />
  </Tab.Navigator>;
};


const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeMenu} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>

    </Provider>
  );
};

export default App;
