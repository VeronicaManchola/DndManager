import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isEmptyArray } from 'formik';
import uuid from 'react-native-uuid';

interface ICharactersContext {
  storeData: (uid: string, value: Record<string, any>, id: string) => Promise<void>;
  getData: (uid: string) => Promise<JSON>;
  deleteData: (uid: string, id: string) => Promise<void>;
  characters: Record<string, any>;
}

export const CharactersProvider = ({ children }: any) => {
  const [characters, setCharacters] = useState({} as Record<string, any>);

  const storeData = async (uid: string, value: Record<string, any>, id?: string) => {
    try {
      const currentData = await getData(uid);
      const uniqueId = id || uuid.v4().toString();
      let jsonValue;

      if (isEmptyArray(currentData)) {
        jsonValue = JSON.stringify({ [uniqueId]: value });
      } else {
        const newData = currentData;
        newData[uniqueId] = value;
        jsonValue = JSON.stringify(newData);
      }
      await AsyncStorage.setItem(`@${uid}`, jsonValue);
      setCharacters(JSON.parse(jsonValue));
    } catch (e) {
      console.log('saving error', e);
    }
  };

  const getData = async (uid: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(`@${uid}`);
      const charactersList = jsonValue != null ? JSON.parse(jsonValue) : {};
      setCharacters(charactersList);
      return charactersList;
    } catch (e) {
      console.log('error reading value', e);
    }
  };

  const deleteData = async (uid: string, id: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(`@${uid}`);
      const charactersList = jsonValue != null ? JSON.parse(jsonValue) : {};
      delete charactersList[id];
      const newJsonValue = JSON.stringify(charactersList);
      await AsyncStorage.setItem(`@${uid}`, newJsonValue);
      setCharacters(charactersList);
    } catch (e) {
      console.log('error reading value', e);
    }
  };

  return (
    <CharactersContext.Provider value={{ storeData, getData, deleteData, characters }}>
      {children}
    </CharactersContext.Provider>
  );
};

export const CharactersContext = React.createContext<ICharactersContext>({} as ICharactersContext);
