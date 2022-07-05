import React, { useContext } from 'react';
import { Text, View } from 'native-base';
import { NativeBaseProvider } from 'native-base';
import { Button } from 'react-native-elements';
import { AuthContext } from '../contexts/user.context';

const LogoutPage = ({ navigation }: any) => {
  const { signOut } = useContext(AuthContext);
  signOut();

  return (
    <NativeBaseProvider>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Logged Out</Text>
      </View>
    </NativeBaseProvider>
  );
};

export default LogoutPage;
