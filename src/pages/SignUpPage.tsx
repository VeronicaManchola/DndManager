import React, { useContext } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../contexts/user.context';
import PageForm from '../components/PageForm';

const SignUpPage = () => {
  const { signUp } = useContext(AuthContext);
  const dimensions = Dimensions.get('window');
  const partialWidth = dimensions.width * 0.8;
  const imageHeight = Math.round((partialWidth * 9) / 16);
  const imageWidth = partialWidth;

  const submitHandler = (values: Record<string, string>) => {
    return signUp({ email: values.email, password: values.password });
  };

  return (
    <ScrollView maximumZoomScale={1} minimumZoomScale={1}>
      <View style={styles.container}>
        <Image
          source={{
            uri: 'https://i.pinimg.com/originals/c7/c3/a0/c7c3a029d172b33287003d26a0c693f9.png',
          }}
          style={{ width: imageWidth, height: imageHeight }}
        />
        <Text style={styles.title}>Sign Up to D&D Character Manager</Text>
      </View>
      <PageForm onSubmit={submitHandler} partialWidth={partialWidth} />
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

export default SignUpPage;
