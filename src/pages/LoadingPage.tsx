import React from 'react';
import { Text, View } from 'native-base';
import { NativeBaseProvider } from 'native-base';
import Lottie from 'lottie-react-native';

const LoadingPage = () => {
  return (
    <NativeBaseProvider>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Lottie
          source={require('../assets/lottie-loading.json')}
          autoPlay
          loop
          colorFilters={[
            {
              keypath: 'Shape Layer 2',
              color: '#EC2127',
            },
            {
              keypath: 'Shape Layer 1',
              color: '#E9999B',
            },
          ]}
        />
      </View>
    </NativeBaseProvider>
  );
};

export default LoadingPage;
