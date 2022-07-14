import React from 'react';
import SummaryPage from '../pages/SummaryPage';
import { createStackNavigator } from '@react-navigation/stack';
import AddCharacterPage from '../pages/AddCharacterPage';
import { CharactersProvider } from '../contexts/characters.context';

const Stack = createStackNavigator();

const SummaryNavigator = () => {
  return (
    <CharactersProvider>
      <Stack.Navigator initialRouteName="Summary">
        <Stack.Screen name="Summary" component={SummaryPage} options={{ headerShown: false }} />
        <Stack.Screen name="Add New Character" component={AddCharacterPage} />
      </Stack.Navigator>
    </CharactersProvider>
  );
};

export default SummaryNavigator;
