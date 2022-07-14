import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ICharactersContext {
  storeData: (value: Record<string, any>) => Promise<void>;
}

export const CharactersProvider = ({ children }: any) => {
  const storeData = async (value: Record<string, any>) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@storage_Key', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  return <CharactersContext.Provider value={{ storeData }}>{children}</CharactersContext.Provider>;
};

const CharactersContext = React.createContext<ICharactersContext>({} as ICharactersContext);
