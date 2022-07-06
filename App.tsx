import 'react-native-gesture-handler';

import React from 'react';
import { AuthContext, authContextMemo, authReducer } from './src/contexts/user.context';
import LoginPage from './src/pages/LoginPage';
import SummaryPage from './src/pages/SummaryPage';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth';
import LoadingPage from './src/pages/LoadingPage';
import SignUpPage from './src/pages/SignUpPage';

const Drawer = createDrawerNavigator();

const App = () => {
  const { state, dispatch } = authReducer();

  const onAuthStateChanged = (user: any) => {
    console.log('App user', user);
    dispatch({ type: 'LOADING_STATUS', isLoading: false });
  };

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
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
