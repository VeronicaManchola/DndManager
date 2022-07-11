import React from 'react';
import SummaryPage from '../pages/SummaryPage';
import { createStackNavigator } from '@react-navigation/stack';
import AddCharacterPage from '../pages/AddCharacterPage';

const Stack = createStackNavigator();

const SummaryNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Summary">
      <Stack.Screen name="Summary" component={SummaryPage} options={{ headerShown: false }} />
      <Stack.Screen name="Add New Character" component={AddCharacterPage} />
    </Stack.Navigator>
  );
};

export default SummaryNavigator;
