import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isEmptyArray } from 'formik';
import uuid from 'react-native-uuid';

interface ICharactersContext {
  storeData: (value: Record<string, any>, id: string) => Promise<void>;
  getData: () => Promise<JSON>;
  characters: Record<string, any>;
}

export const CharactersProvider = ({ children }: any) => {
  const [characters, setCharacters] = useState({} as Record<string, any>);

  const storeData = async (value: Record<string, any>, id?: string) => {
    try {
      const currentData = await getData();
      const uniqueId = id || uuid.v4().toString();
      let jsonValue;

      if (isEmptyArray(currentData)) {
        jsonValue = JSON.stringify({ [uniqueId]: value });
      } else {
        const newData = currentData;
        newData[uniqueId] = value;
        jsonValue = JSON.stringify(newData);
      }
      await AsyncStorage.setItem('@storage_Key', jsonValue);
      setCharacters(JSON.parse(jsonValue));
    } catch (e) {
      console.log('saving error', e);
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key');
      const charactersList = jsonValue != null ? JSON.parse(jsonValue) : {};
      setCharacters(charactersList);
      return charactersList;
    } catch (e) {
      console.log('error reading value', e);
    }
  };

  return <CharactersContext.Provider value={{ storeData, getData, characters }}>{children}</CharactersContext.Provider>;
};

export const CharactersContext = React.createContext<ICharactersContext>({} as ICharactersContext);
