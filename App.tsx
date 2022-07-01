import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native';
import { UserContext, withUserProvider } from './src/contexts/user.context';
import { LoginPage } from './src/pages/LoginPage';
import SummaryPage from './src/pages/SummaryPage';

const App = () => {
  const { currentUser } = useContext(UserContext);

  return <SafeAreaView>{currentUser?.loggedIn ? <SummaryPage /> : <LoginPage />}</SafeAreaView>;
};

export default withUserProvider(App);
