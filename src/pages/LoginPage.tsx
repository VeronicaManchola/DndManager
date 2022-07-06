import React, { useContext, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { AuthContext } from '../contexts/user.context';
import PageForm from '../components/PageForm';
import auth from '@react-native-firebase/auth';

const LoginPage = () => {
  const { signIn } = useContext(AuthContext);
  const dimensions = Dimensions.get('window');
  const partialWidth = dimensions.width * 0.8;
  const imageHeight = Math.round((partialWidth * 9) / 16);
  const imageWidth = partialWidth;

  return (
    <ScrollView maximumZoomScale={1} minimumZoomScale={1}>
      <Text style={styles.title}>D&D Character Manager</Text>
      <View style={styles.container}>
        <Image
          source={{
            uri: 'https://i.pinimg.com/originals/c7/c3/a0/c7c3a029d172b33287003d26a0c693f9.png',
          }}
          style={{ width: imageWidth, height: imageHeight }}
        />
      </View>
      <PageForm onSubmit={signIn} partialWidth={partialWidth} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    textAlign: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginPage;
