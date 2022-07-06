import 'react-native-gesture-handler';

import React from 'react';
import { AuthContext, authContextMemo, authReducer } from './src/contexts/user.context';
import LoginPage from './src/pages/LoginPage';
import SummaryPage from './src/pages/SummaryPage';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import * as SecureStore from 'expo-secure-store';
import LoadingPage from './src/pages/LoadingPage';
import SignUpPage from './src/pages/SignUpPage';

const Drawer = createDrawerNavigator();

const App = () => {
  const { state, dispatch } = authReducer();

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        console.log('err', e);
        // Restoring token failed
      }

      dispatch({ type: 'LOADING_STATUS', isLoading: false });
    };

    bootstrapAsync();
  }, []);

  return (
    <AuthContext.Provider value={authContextMemo(dispatch)}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Login"
          screenOptions={{
            swipeEnabled: false,
          }}
          drawerContent={props => {
            return (
              <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem
                  label="Logout"
                  onPress={() => {
                    authContextMemo(dispatch).signOut();
                    props.navigation.closeDrawer();
                  }}
                />
              </DrawerContentScrollView>
            );
          }}>
          {state.isLoading ? (
            <Drawer.Screen name="Loading" component={LoadingPage} options={{ headerShown: false }} />
          ) : state.userToken == null ? (
            <>
              <Drawer.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
              <Drawer.Screen name="SignUp" component={SignUpPage} />
            </>
          ) : (
            <Drawer.Screen name="Summary" component={SummaryPage} />
          )}
        </Drawer.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
