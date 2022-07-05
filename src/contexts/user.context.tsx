import React, { createContext } from 'react';

interface AuthContext {
  signIn: (data: any) => Promise<void>;
  signOut: () => void;
  signUp: (data: any) => Promise<void>;
}

const reducer = (prevState: any, action: { type: string; token?: string | null }) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        isSignout: false,
        userToken: action.token,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        isSignout: true,
        userToken: null,
      };
  }
};

const initialState = {
  isLoading: true,
  isSignout: false,
  userToken: null,
};

export const authReducer = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return { state, dispatch };
};

export const AuthContext = createContext({} as AuthContext);
