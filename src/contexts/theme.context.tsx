import React from 'react';

interface IThemeContext {
  darkTheme: boolean;
  setTheme?: React.Dispatch<React.SetStateAction<string>>;
}

const defaultState = {
  darkTheme: false,
};

export const ThemeContext = React.createContext<IThemeContext>(defaultState);
