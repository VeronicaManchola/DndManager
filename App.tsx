import 'react-native-gesture-handler';

import React from 'react';
import { AuthContext, authReducer } from './src/contexts/user.context';
import LoginPage from './src/pages/LoginPage';
import SummaryPage from './src/pages/SummaryPage';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as SecureStore from 'expo-secure-store';
import LoadingPage from './src/pages/LoadingPage';
import LogoutPage from './src/pages/LogoutPage';

const Drawer = createDrawerNavigator();

const App = () => {
  const { state, dispatch } = authReducer();

  const authContext = React.useMemo(
    () => ({
      signIn: async (data: any) => {
        console.log('signIn', data);
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => {
        dispatch({ type: 'SIGN_OUT' });
      },
      signUp: async (data: any) => {
        console.log('signUp', data);
        // await SecureStore.setItemAsync(key, value);
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    [],
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        console.log('err', e);
        // Restoring token failed
      }

      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Login">
          {state.isLoading ? (
            <Drawer.Screen name="Loading" component={LoadingPage} />
          ) : state.userToken == null ? (
            <Drawer.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
          ) : (
            <>
              <Drawer.Screen name="Summary" component={SummaryPage} />
              <Drawer.Screen name="Logout" component={LogoutPage} options={{ headerShown: false }} />
            </>
          )}
        </Drawer.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
