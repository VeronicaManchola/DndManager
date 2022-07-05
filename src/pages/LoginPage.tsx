import React, { useContext, useState } from 'react';
import { Button, Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Formik } from 'formik';
import { UserContext } from '../contexts/user.context';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  userName: Yup.string()
    .min(2, 'User Name is too short!')
    .max(30, 'User Name is too long!')
    .required('User Name is required')
    .label('User Name'),
  password: Yup.string().required('Password is required').label('Password'),
});

export const LoginPage = () => {
  const [showLoginError, setShowLoginError] = useState(false);
  const { logInUser } = useContext(UserContext);
  const dimensions = Dimensions.get('window');
  const partialWidth = dimensions.width * 0.8;
  const imageHeight = Math.round((partialWidth * 9) / 16);
  const imageWidth = partialWidth;

  const customChange = (field: string, val: string, setFieldValue: any) => {
    setShowLoginError(false);
    setFieldValue(field, val);
  };

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
      <Formik
        initialValues={{ userName: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting }) => {
          const [loginResponse] = logInUser(values.userName, values.password);
          setSubmitting(false);
          if (!loginResponse) {
            setShowLoginError(true);
          }
        }}>
        {({ handleBlur, handleSubmit, values, errors, touched, setFieldTouched, isSubmitting, setFieldValue }) => (
          <View style={styles.container}>
            <TextInput
              style={[styles.input, { width: partialWidth }]}
              placeholder="User Name"
              onChangeText={val => customChange('userName', val, setFieldValue)}
              onBlur={() => {
                setShowLoginError(false);
                setFieldTouched('userName');
                handleBlur('userName');
              }}
              value={values.userName}
              autoCompleteType="username"
              textContentType="username"
              autoCorrect={false}
              autoCapitalize="none"
            />
            <Text style={{ color: 'red' }}>{errors.userName && touched.userName && errors.userName}</Text>
            <TextInput
              style={[styles.input, { width: partialWidth }]}
              placeholder="Password"
              onChangeText={val => customChange('password', val, setFieldValue)}
              onBlur={() => {
                setShowLoginError(false);
                setFieldTouched('password');
                handleBlur('password');
              }}
              value={values.password}
              autoCompleteType="password"
              textContentType="password"
              autoCorrect={false}
              autoCapitalize="none"
              secureTextEntry
            />
            <Text style={{ color: 'red' }}>{errors.password && touched.password && errors.password}</Text>
            <Button onPress={handleSubmit} title="Submit" disabled={isSubmitting} />
            <Text style={{ color: 'red' }}>{showLoginError && 'User Name or password is invalid.'}</Text>
          </View>
        )}
      </Formik>
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 15,
  },
});
