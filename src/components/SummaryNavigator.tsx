import React from 'react';
import SummaryPage from '../pages/SummaryPage';
import { createStackNavigator } from '@react-navigation/stack';
import CharacterPage from '../pages/CharacterPage';
import { CharactersProvider } from '../contexts/characters.context';

const Stack = createStackNavigator();

const SummaryNavigator = () => {
  return (
    <CharactersProvider>
      <Stack.Navigator initialRouteName="Summary">
        <Stack.Screen name="Summary" component={SummaryPage} options={{ headerShown: false }} />
        <Stack.Screen name="Character" component={CharacterPage} initialParams={{ action: 'create', values: {} }} />
      </Stack.Navigator>
    </CharactersProvider>
  );
};

export default SummaryNavigator;
