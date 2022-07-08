import React, { useContext } from 'react';
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { AuthContext } from '../contexts/user.context';
import PageForm from '../components/PageForm';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';

interface LoginPageProps {
  navigation: DrawerNavigationHelpers;
}

enum LoginErrorTypes {
  NOT_FOUND = 'auth/user-not-found',
  INVALID_EMAIL = 'auth/invalid-email',
  DISABLED = 'auth/user-disabled',
  WRONG_PASSWORD = 'auth/wrong-password',
  TOO_MANY = 'auth/too-many-requests',
}

const loginErrorMessages = {
  [LoginErrorTypes.NOT_FOUND]: 'Email or password is invalid.',
  [LoginErrorTypes.INVALID_EMAIL]: 'Email address is invalid.',
  [LoginErrorTypes.DISABLED]: 'This account has been disabled. Please contact support for help.',
  [LoginErrorTypes.WRONG_PASSWORD]: 'Password is invalid.',
  [LoginErrorTypes.TOO_MANY]: 'Something went wrong, please try again later.',
};

const LoginPage = ({ navigation }: LoginPageProps) => {
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
      <PageForm onSubmit={signIn} errorMessages={loginErrorMessages} partialWidth={partialWidth} />
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}>
        <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
        <View>
          <Text style={{ width: 50, textAlign: 'center' }}>Or</Text>
        </View>
        <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
      </View>
      <View style={styles.container}>
        <Pressable onPress={() => navigation.navigate('SignUp')} style={styles.wrapperCustom}>
          <Text style={styles.text}>Create an account here</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperCustom: {
    padding: 6,
  },
});

export default LoginPage;
