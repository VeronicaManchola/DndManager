import React, { createContext } from 'react';
import auth from '@react-native-firebase/auth';

interface dispatchAction {
  type: string;
  isLoading?: boolean;
  uid?: string;
}

interface AuthContext {
  signIn: (data: any) => Promise<any>;
  signUp: (data: any) => Promise<any>;
}

const reducer = (prevState: any, action: dispatchAction) => {
  switch (action.type) {
    case 'LOADING_STATUS':
      return {
        ...prevState,
        isLoading: action.isLoading,
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        isLoading: false,
        uid: action.uid,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        isLoading: false,
        uid: '',
      };
  }
};

const initialState = {
  isLoading: true,
  uid: '',
};

export const authReducer = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return { state, dispatch };
};

export const authContextMemo = (dispatch: React.Dispatch<dispatchAction>) => {
  return React.useMemo(
    () => ({
      signIn: async (data: any) => {
        dispatch({ type: 'LOADING_STATUS', isLoading: true });
        try {
          return await auth().signInWithEmailAndPassword(data.email, data.password);
        } catch (err) {
          dispatch({ type: 'LOADING_STATUS', isLoading: false });
          throw err.code;
        }
      },
      signUp: async (data: any) => {
        dispatch({ type: 'LOADING_STATUS', isLoading: true });
        try {
          return await auth().createUserWithEmailAndPassword(data.email, data.password);
        } catch (err) {
          dispatch({ type: 'LOADING_STATUS', isLoading: false });
          throw err.code;
        }
      },
    }),
    [],
  );
};

export const AuthContext = createContext({} as AuthContext);
