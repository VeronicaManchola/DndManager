import React from 'react';
import { Text, View } from 'native-base';
import { NativeBaseProvider } from 'native-base';

const LoadingPage = () => {
  return (
    <NativeBaseProvider>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Loading...</Text>
      </View>
    </NativeBaseProvider>
  );
};

export default LoadingPage;
