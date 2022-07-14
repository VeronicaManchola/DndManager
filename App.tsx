import 'react-native-gesture-handler';

import React, { useEffect, useState } from 'react';
import { AuthContext, authContextMemo, authReducer } from './src/contexts/user.context';
import LoginPage from './src/pages/LoginPage';
import {
  DarkTheme,
  DefaultTheme,
  getFocusedRouteNameFromRoute,
  NavigationContainer,
  Route,
} from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth';
import LoadingPage from './src/pages/LoadingPage';
import SignUpPage from './src/pages/SignUpPage';
import { Alert, View } from 'react-native';
import { ThemeContext } from './src/contexts/theme.context';
import { Switch, Text } from '@rneui/themed';
import SummaryNavigator from './src/components/SummaryNavigator';

const Drawer = createDrawerNavigator();

const getHeaderTitle = (route: Partial<Route<string, object | undefined>>) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Summary';
  return routeName === 'Summary';
};

const App = () => {
  const [darkTheme, setDarkTheme] = useState(false);
  const themeData = { darkTheme, setDarkTheme };
  const { state, dispatch } = authReducer();

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setDarkTheme(previousState => !previousState);
    setIsEnabled(previousState => !previousState);
  };

  const onAuthStateChanged = (user: any) => {
    if (user) {
      dispatch({ type: 'SIGN_IN', uid: user.uid });
    }
  };

  useEffect(() => {
    dispatch({ type: 'LOADING_STATUS', isLoading: false });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <ThemeContext.Provider value={themeData}>
      <AuthContext.Provider value={authContextMemo(dispatch)}>
        <NavigationContainer theme={darkTheme ? appDarkTheme : appDefaultTheme}>
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
                    labelStyle={{ fontFamily: 'sans-serif' }}
                    label="Logout"
                    onPress={async () => {
                      dispatch({ type: 'LOADING_STATUS', isLoading: true });
                      await auth()
                        .signOut()
                        .then(() => {
                          props.navigation.closeDrawer();
                          dispatch({ type: 'SIGN_OUT' });
                        })
                        .catch(() => Alert.alert('Something went wrong. Please try again.'));
                    }}
                  />
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      paddingLeft: 18,
                      paddingRight: 10,
                      borderRadius: 4,
                    }}>
                    <Text style={{ color: 'rgba(28, 28, 30, 0.68)', fontWeight: '600', fontFamily: 'inherit' }}>
                      Dark mode
                    </Text>
                    <Switch
                      trackColor={{ false: '#767577', true: '#81b0ff' }}
                      thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                    />
                  </View>
                </DrawerContentScrollView>
              );
            }}>
            {state.isLoading ? (
              <Drawer.Screen name="Login" component={LoadingPage} options={{ headerShown: false }} />
            ) : !state.uid ? (
              <>
                <Drawer.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
                <Drawer.Screen name="SignUp" component={SignUpPage} options={{ headerShown: false }} />
              </>
            ) : (
              <Drawer.Screen
                name="Home"
                component={SummaryNavigator}
                options={({ route }) => ({
                  headerShown: getHeaderTitle(route),
                })}
              />
            )}
          </Drawer.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
};

const appDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#EC2127',
  },
};

const appDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#B00926',
    background: '#1A1A1A',
    card: 'rgb(18, 18, 18)',
    text: 'rgb(229, 229, 231)',
    border: 'rgb(39, 39, 41)',
    notification: 'rgb(255, 69, 58)',
  },
};

export default App;
