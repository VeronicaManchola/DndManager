import React, { createContext } from 'react';
import auth from '@react-native-firebase/auth';

interface dispatchAction {
  type: string;
  isLoading?: boolean;
}

interface AuthContext {
  signIn: (data: any) => Promise<string>;
  signOut: () => void;
  signUp: (data: any) => Promise<string>;
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
        isSignout: false,
        isLoading: false,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        isSignout: true,
        isLoading: false,
      };
  }
};

const initialState = {
  isLoading: true,
  isSignout: false,
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
        const loginResponse = await auth()
          .signInWithEmailAndPassword(data.email, data.password)
          .then(res => {
            console.log('User signed in ', res);
          })
          .catch(error => {
            return error.code;
          })
          .finally(() => dispatch({ type: 'LOADING_STATUS', isLoading: false }));

        return loginResponse;
      },
      signOut: () => {
        dispatch({ type: 'LOADING_STATUS', isLoading: false });
        auth()
          .signOut()
          .then(() => console.log('User signed out!'));
        dispatch({ type: 'SIGN_OUT' });
      },
      signUp: async (data: any) => {
        dispatch({ type: 'LOADING_STATUS', isLoading: true });
        const signinResponse = auth()
          .createUserWithEmailAndPassword(data.email, data.password)
          .then(res => {
            console.log('User account created & signed in! ', res);
            dispatch({ type: 'SIGN_IN' });
          })
          .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              console.log('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
              console.log('That email address is invalid!');
            }

            return error.code;
          })
          .finally(() => dispatch({ type: 'LOADING_STATUS', isLoading: false }));

        return signinResponse;
      },
    }),
    [],
  );
};

export const AuthContext = createContext({} as AuthContext);
