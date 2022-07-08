import React, { useContext } from 'react';
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../contexts/user.context';
import PageForm from '../components/PageForm';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';

interface SignupPageProps {
  navigation: DrawerNavigationHelpers;
}

const SignUpPage = ({ navigation }: SignupPageProps) => {
  const { signUp } = useContext(AuthContext);
  const dimensions = Dimensions.get('window');
  const partialWidth = dimensions.width * 0.8;
  const imageHeight = Math.round((partialWidth * 9) / 16);
  const imageWidth = partialWidth;

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
      <PageForm onSubmit={signUp} partialWidth={partialWidth} />
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}>
        <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
        <View>
          <Text style={{ width: 50, textAlign: 'center' }}>Or</Text>
        </View>
        <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
      </View>
      <View style={styles.container}>
        <Pressable onPress={() => navigation.navigate('Login')} style={styles.wrapperCustom}>
          <Text style={styles.text}>Aldready have an account? Login!</Text>
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
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
  },
});

export default SignUpPage;
