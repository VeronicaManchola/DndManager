import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Input, Text } from '@rneui/themed';
import { useTheme } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useContext } from 'react';
import { CharactersContext } from '../contexts/characters.context';

const characterValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3)
    .trim()
    .matches(/^[a-zA-Z\s]*$/, 'Please use only letters and spaces')
    .required('Name is required')
    .label('Name'),
  race: Yup.string()
    .min(3)
    .trim()
    .matches(/^[a-zA-Z\s]*$/, 'Please use only letters and spaces')
    .required('Race is required')
    .label('Race'),
  class: Yup.string()
    .min(3)
    .trim()
    .matches(/^[a-zA-Z\s]*$/, 'Please use only letters and spaces')
    .required('Class is required')
    .label('Class'),
  level: Yup.string().min(1).max(2).required('Level is required').label('Level'),
});

const CharacterPage = ({ navigation, route }: any) => {
  const { colors } = useTheme();
  const { storeData, deleteData } = useContext(CharactersContext);
  const { action, values, id = '', uid } = route.params;

  const getInitialValues = () => {
    return values || { name: '', race: '', class: '', level: undefined };
  };

  useEffect(() => {
    switch (action) {
      case 'edit':
        navigation.setOptions({ title: 'Edit Character' });
        break;
      default:
        navigation.setOptions({ title: 'Add New Character' });
        break;
    }
  }, []);

  const handleDelete = () => {
    deleteData(uid, id).then(() => {
      navigation.navigate('Home', {
        screen: 'Summary',
      });
    });
  };

  return (
    <ScrollView>
      <Card containerStyle={styles.cardContainer}>
        <Formik
          initialValues={getInitialValues()}
          validationSchema={characterValidationSchema}
          onSubmit={(values, { setSubmitting }) => {
            storeData(uid, values, id).then(() => {
              setSubmitting(false);
              navigation.navigate('Home', {
                screen: 'Summary',
              });
            });
          }}>
          {({ setFieldValue, handleChange, handleBlur, handleSubmit, touched, values, errors, isSubmitting }) => (
            <View>
              <Card.Title>
                <Input
                  placeholder="Character Name"
                  leftIcon={{ type: 'feather', name: 'user' }}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  errorMessage={errors.name && touched.name ? errors.name : ''}
                />
              </Card.Title>
              <Card.Divider />
              <Input
                inputContainerStyle={styles.input}
                placeholder="Race"
                leftIcon={{ type: 'feather', name: 'tag' }}
                onChangeText={handleChange('race')}
                onBlur={handleBlur('race')}
                value={values.race}
                errorMessage={errors.race && touched.race ? errors.race : ''}
              />
              <Input
                inputContainerStyle={styles.input}
                placeholder="Class"
                leftIcon={{ type: 'feather', name: 'star' }}
                onChangeText={handleChange('class')}
                onBlur={handleBlur('class')}
                value={values.class}
                errorMessage={errors.class && touched.class ? errors.class : ''}
              />
              <Input
                inputContainerStyle={styles.input}
                placeholder="Level"
                leftIcon={{ type: 'feather', name: 'chevrons-up' }}
                keyboardType="number-pad"
                maxLength={2}
                onChangeText={text => setFieldValue('level', text.replace(/[^0-9]/g, ''))}
                value={values.level}
                errorMessage={errors.level && touched.level ? errors.level : ''}
              />
              <Button
                buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 20 }}
                onPress={handleSubmit}
                title="Save"
                disabled={isSubmitting}
              />
              {action === 'edit' ? (
                <Button
                  buttonStyle={{
                    backgroundColor: '#EC2127',
                    borderRadius: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 0,
                    marginTop: 40,
                  }}
                  onPress={handleDelete}
                  title="Delete"
                />
              ) : (
                <></>
              )}
            </View>
          )}
        </Formik>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cardContainer: { width: '90%' },
  input: {
    height: 40,
    fontSize: 16,
  },
});

export default CharacterPage;
