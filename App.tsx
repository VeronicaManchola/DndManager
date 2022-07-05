import 'react-native-gesture-handler';

import React from 'react';
import { withUserProvider } from './src/contexts/user.context';
import { LoginPage } from './src/pages/LoginPage';
import SummaryPage from './src/pages/SummaryPage';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Login">
        <Drawer.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
        <Drawer.Screen name="Summary" component={SummaryPage} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default withUserProvider(App);
