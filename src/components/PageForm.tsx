import React, { FunctionComponent, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

interface PageFormProps {
  onSubmit: (values: Record<string, string>) => Promise<string>;
  partialWidth: number;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Email is required').label('Email'),
  password: Yup.string().required('Password is required').label('Password'),
});

const PageForm: FunctionComponent<PageFormProps> = ({ onSubmit, partialWidth }) => {
  const [showLoginError, setShowLoginError] = useState(false);

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values)
          .then(res => {
            if (res === 'auth/user-not-found') setShowLoginError(true);
          })
          .catch(err => {
            setShowLoginError(true);
            console.log('err', err);
          })
          .finally(() => setSubmitting(false));
      }}>
      {({ setFieldValue, handleBlur, handleSubmit, values, errors, touched, setFieldTouched, isSubmitting }) => (
        <View style={styles.container}>
          <TextInput
            style={[styles.input, { width: partialWidth }]}
            placeholder="Email"
            onChangeText={val => {
              setShowLoginError(false);
              setFieldValue('email', val);
            }}
            onBlur={() => {
              setShowLoginError(false);
              setFieldTouched('email');
              handleBlur('email');
            }}
            value={values.email}
            autoCompleteType="email"
            textContentType="emailAddress"
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <Text style={{ color: 'red' }}>{errors.email && touched.email && errors.email}</Text>
          <TextInput
            style={[styles.input, { width: partialWidth }]}
            placeholder="Password"
            onChangeText={val => {
              setShowLoginError(false);
              setFieldValue('password', val);
            }}
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
          <Text style={{ color: 'red' }}>{showLoginError && 'Email or password is invalid.'}</Text>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
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

export default PageForm;
